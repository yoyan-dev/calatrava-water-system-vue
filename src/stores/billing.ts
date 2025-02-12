import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	Timestamp,
	getDoc,
	getDocs,
	writeBatch,
	updateDoc,
	query,
	where,
	orderBy,
	limit
} from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import type { Billing } from '@/types/billing';
import type { StoreResponse } from '@/types/store-response';

export const useBillingStore = defineStore('billing', () => {
	const db = useFirestore();

	// State
	const billings = ref<Billing[]>([]);
	const billing = ref<Billing>();
	const isLoading = ref(false);

	// Getters
	const fetchCurrentBillings = computed(() => {
		const now = new Date();
		const currentMonth = now.getMonth() + 1;
		const currentYear = now.getFullYear();

		return billings.value
			.filter((item) => {
				const billingDate = item.billingDate ? (item.billingDate as Timestamp).toDate() : null;
				return (
					billingDate &&
					billingDate.getMonth() + 1 === currentMonth &&
					billingDate.getFullYear() === currentYear
				);
			})
			.map((item) => ({ ...item }));
	});

	// Actions
	async function fetchBillings() {
		isLoading.value = true;
		try {
			const querySnapshot = await getDocs(collection(db, 'billings'));
			const billingSnapshot = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				uid: doc.id,
			}));

			billings.value = billingSnapshot;
		} catch (error) {
			console.error('Error fetching billings:', error);
			billings.value = [];
		} finally {
			isLoading.value = false;
		}
	}

	async function fetchBilling(uid: string) {
		isLoading.value = true;
		try {
			const docSnap = await getDoc(doc(db, 'billings', uid));
			console.log(docSnap.data());
			billing.value = { ...docSnap.data(), uid: docSnap.id };
		} catch (error) {
			console.error('Error fetching billing by ID:', error);
			throw error;
		} finally {
			isLoading.value = false;
		}
	}

	async function fetchBillingsByAccountNumber(accountNumber: number) {
		isLoading.value = true;
		console.log(accountNumber);
		
		try {
			const queryBillings = query(
				collection(db, "billings"),
				where("residentAccountNumber", "==", accountNumber)
			);

			const querySnapshot = await getDocs(queryBillings);
			if (querySnapshot.empty) {
				console.log('No billings records found for this account')
				return
			};
			
			billings.value = querySnapshot.docs.map((doc) => ({
				billingDate: doc.data().billingDate,
				...doc.data(),
				uid: doc.id,
			})).sort((a, b) => (b.billingDate as Timestamp).toDate().getTime() - (a.billingDate as Timestamp).toDate().getTime());

		} catch (error) {
			console.error('Error fetching billings by account number:', error);
			throw error;
		} finally {
			isLoading.value = false;
		}
	}
	

	async function addBilling(
		payload: Billing,
		selected: any,
	): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			if (!payload) {
				throw new Error('Current billing information is missing');
			}
			console.log(payload, selected);
			payload.id = (billings.value.length + 1).toString();
			payload.billNumber = Number(payload.id);
			const docRef = await addDoc(collection(db, 'billings'), {
				...payload,
				residentAccountNumber: selected.accountNumber,
				residentUid: selected.uid,
				createdAt: Timestamp.now(),
			});
			// const residentSnap = await updateDoc(doc(db, 'residents'), {
			// 	currentBilling: { ...payload },
			// });
			// const existingBilling = billings.value.find(
			// 	(billing) => billing.residentAccountNumber === accountNumber,
			// );
			// if (existingBilling) {
			// 	billings.value = billings.value.filter(
			// 		(b) => b.residentAccountNumber !== accountNumber,
			// 	);
			// 	billings.value.push({
			// 		...payload,
			// 		residentAccountNumber: accountNumber,
			// 		uid: docRef.id,
			// 	});
			// } else {
			// 	billings.value.push({
			// 		...payload,
			// 		residentAccountNumber: accountNumber,
			// 		uid: docRef.id,
			// 	});
			// }
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully added billing',
			};
		} catch (error: any) {
			console.log(error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteBilling(residentUid: string): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const q = query(
				collection(db, 'billings'),
				where('residentUid', '==', residentUid),
			);
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				return {
					status: 'error',
					statusMessage: 'Error message',
					message: 'No billing records found for this residentUid',
				};
			}

			await Promise.all(
				querySnapshot.docs.map((document) =>
					deleteDoc(doc(db, 'billings', document.id)),
				),
			);

			billings.value = billings.value.filter(
				(item) => item.residentUid !== residentUid,
			);
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully deleted billing',
			};
		} catch (error: any) {
			console.log(error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteBillings(payload: Billing[]): Promise<StoreResponse> {
		isLoading.value = true;
		const batch = writeBatch(db);

		payload.forEach((item) => {
			const docRef = doc(db, 'billings', item.uid ?? '');
			batch.delete(docRef);
		});

		try {
			await batch.commit();
			billings.value = billings.value.filter(
				(val) => !payload.some((item) => item.uid === val.uid),
			);
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully deleted billings',
			};
		} catch (error) {
			console.error('Error deleting billings:', error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	function updateBilling(billing: Billing, uid: string) {
		const result = billings.value.find((item) => item.uid === uid);
		Object.assign(result || {}, billing);
	}

	return {
		billings,
		billing,
		isLoading,
		fetchCurrentBillings,
		fetchBillings,
		fetchBillingsByAccountNumber,
		addBilling,
		fetchBilling,
		deleteBilling,
		deleteBillings,
		updateBilling,
	};
});
