import { auth, db } from '@/plugins/firebase';
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc,
	orderBy,
	limit,
	startAfter,
	startAt,
	endAt,
	type DocumentData,
	QueryDocumentSnapshot,
	CollectionReference,
	Query,
} from 'firebase/firestore';

export interface PaginateOptions {
	limit: number;
	lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
	orderByField?: string;
	orderDirection?: 'asc' | 'desc';
	searchQuery?: string;
	searchField?: string;
}

class BillingRepository {
	private collectionName = 'billings';

	/** Public, typed method */
	async paginateBillings(options: PaginateOptions) {
		const user = auth.currentUser;
		if (!user) throw new Error('User not authenticated');

		const {
			limit: limitCount,
			lastDoc,
			orderByField = 'bill_date',
			orderDirection = 'desc',
			searchQuery = '',
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

			if (searchQuery) {
				// If there's a search query, perform a search
				const start = searchQuery;
				const end = searchQuery + '\uf8ff';
				q = query(q, startAt(start), endAt(end));
			} else {
				// Normal pagination
				if (lastDoc) {
					q = query(q, startAfter(lastDoc));
				}
			}

			const querySnapshot = await getDocs(q);
			const billings: DocumentData[] = [];
			querySnapshot.forEach((doc) => {
				billings.push({ id: doc.id, ...doc.data() });
			});

			const newLastDoc =
				querySnapshot.docs[querySnapshot.docs.length - 1] || null;

			return {
				data: billings,
				lastDoc: newLastDoc,
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
