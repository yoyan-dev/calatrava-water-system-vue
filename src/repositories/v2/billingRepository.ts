import { auth, db } from '@/plugins/firebase';
import {
	collection,
	query,
	getDocs,
	doc,
	getDoc,
	orderBy,
	limit,
	startAfter,
	endBefore,
	type DocumentData,
	QueryDocumentSnapshot,
	CollectionReference,
	Query,
	getCountFromServer,
	setDoc,
	serverTimestamp,
	writeBatch,
} from 'firebase/firestore';

export interface PaginateOptions {
	limit: number;
	forward?: boolean;
	cursorDoc?: QueryDocumentSnapshot<DocumentData> | null;
	orderByField?: string;
	orderDirection?: 'asc' | 'desc';
}

interface ResidentData {
	book: string;
	fullname: string;
	accountno: string;
	waterusage: string;
	billamnt: number;
	[key: string]: any;
}

class BillingRepository {
	private collectionName = 'billings';

	private parseCsvBilling(csv: string): ResidentData[] {
		const lines = csv.trim().split('\n');
		const headers = lines[0].split(',').map((h) => h.trim());
		return lines.slice(1).map((line) => {
			const values = line.split(',').map((v) => v.trim());
			const obj: any = {};
			headers.forEach((h, i) => {
				obj[h] = values[i] || '';
			});
			return obj as ResidentData;
		});
	}

	/** Public, typed method */
	async addBillings(payload: FormData) {
		try {
			const file = payload.get('file') as File;
			if (!file) throw new Error('No file uploaded');

			const csvText = await file.text();
			const data: ResidentData[] = this.parseCsvBilling(csvText);
			if (!data.length) throw new Error('Empty CSV file');

			const BATCH_SIZE = 500;
			const batches: Promise<void>[] = [];

			for (let i = 0; i < data.length; i += BATCH_SIZE) {
				const batch = writeBatch(db);
				const chunk = data.slice(i, i + BATCH_SIZE);

				for (const item of chunk) {
					const {
						book,
						fullname,
						accountno,
						waterusage,
						arrearsenv,
						due_penalty,
						classtype,
						billamnt,
						...billingData
					} = item;

					if (!accountno || !fullname || !book) continue;

					const residentRef = doc(db, 'residents', accountno);
					const residentData = {
						book: book.toLowerCase(),
						fullname: fullname.toLowerCase(),
						createdAt: serverTimestamp(),
						classtype,
						notificationToken: null,
					};

					batch.set(residentRef, residentData, { merge: true });

					const billingId = doc(collection(db, 'temp')).id; // generate ID
					const subBillingRef = doc(residentRef, 'billings', billingId);
					const globalBillingRef = doc(db, 'billings', billingId);

					const environmentFee =
						Number(waterusage) > 10 ? Number(waterusage) * 0.25 : 0;

					const billingPayload = {
						...billingData,
						bill_no: Number(item.bill_no),
						accountno: Number(item.accountno),
						mr_sys_no: Number(item.mr_sys_no),
						custno: Number(item.custno),
						book: book.toLowerCase(),
						fullname: fullname.toLowerCase(),
						billamnt: Number(billamnt),
						due_penalty: '0',
						arrearsenv,
						environmentFee,
						totalBill: Number(billamnt) + environmentFee,
						waterusage,
						paymentReceipt: null,
						paymentStatus: null,
						paymentDate: null,
						classtype,
						createdAt: serverTimestamp(),
					};

					batch.set(subBillingRef, billingPayload);
					batch.set(globalBillingRef, {
						...billingPayload,
						residentId: accountno,
					});
				}

				batches.push(batch.commit());
			}

			await Promise.all(batches);
			return {
				success: true,
				statusCode: 200,
				message: 'Billings uploaded successfully',
			};
		} catch (error) {
			console.error('Error uploading billings:', error);
			return {
				success: false,
				statusCode: 500,
				message: 'Failed to upload billings',
			};
		}
	}

	async getCountBillings() {
		try {
			const colRef = collection(db, this.collectionName);
			const snapshot = await getCountFromServer(colRef);
			return snapshot.data().count;
		} catch (error) {
			console.error('Error getting billing count:', error);
			return 0;
		}
	}

	async paginateBillings(options: PaginateOptions) {
		const {
			limit: limitCount,
			forward = true,
			cursorDoc = null,
			orderByField = 'bill_no',
			orderDirection = 'desc',
		} = options;

		try {
			const colRef = collection(
				db,
				this.collectionName,
			) as CollectionReference<DocumentData>;
			let q: Query<DocumentData> = query(
				colRef,
				orderBy(orderByField, orderDirection),
				limit(limitCount),
			);

			// Pagination with direction
			if (forward && cursorDoc) {
				// Move forward
				q = query(q, startAfter(cursorDoc));
			} else if (!forward && cursorDoc) {
				q = query(q, endBefore(cursorDoc));
			}
			const querySnapshot = await getDocs(q);
			const billings: DocumentData[] = [];
			querySnapshot.forEach((doc) => {
				billings.push({ id: doc.id, ...doc.data() });
			});

			const newStartDoc = querySnapshot.docs[0] || null;
			const newLastDoc =
				querySnapshot.docs[querySnapshot.docs.length - 1] || null;

			return {
				data: billings,
				startDoc: newStartDoc,
				lastDoc: newLastDoc,
				totalBillings: await this.getCountBillings(),
			};
		} catch (error) {
			console.error('Error paginating billings:', error);
		}
	}

	async getBillingById(billingId: string) {
		const user = auth.currentUser;
		if (!user) throw new Error('User not authenticated');

		const docRef = doc(db, this.collectionName, billingId);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) throw new Error('Billing not found');
		const data = docSnap.data();

		// Security: double-check ownership
		if (data.userId !== user.uid) {
			throw new Error('Unauthorized');
		}

		return { id: docSnap.id, ...data };
	}
}

export const billingRepository = new BillingRepository();
