import { ref } from 'vue';
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
} from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import type { Billing } from '@/types/billing';
import type { StoreResponse } from '@/types/store-response';
import { is } from 'date-fns/locale';
import type { Resident } from '@/types/resident';

export const useBillingStore = defineStore('billing', () => {
	const db = useFirestore();
	const billings = ref<Resident[]>([]);
	const billing = ref<Billing>();
	const isLoading = ref(false);

	async function fetchBillings() {
		try {
			isLoading.value = true;
			const querySnapshot = await getDocs(collection(db, 'residents'));
			billings.value = querySnapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data().currentBilling,
			})) as Resident[];
		} catch (error) {
			console.error('Error fetching billings:', error);
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

	async function addBilling(payload: Resident): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			if (!payload.currentBilling) {
				throw new Error('Current billing information is missing');
			}

			payload.currentBilling.id = (billings.value.length + 1).toString();
			payload.currentBilling.billNumber = Number(payload.currentBilling.id);
			const docRef = await addDoc(collection(db, 'billings'), {
				...billing,
				createdAt: Timestamp.now(),
			});
			billings.value.push({ ...billing, uid: docRef.id });
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

	async function deleteBilling(uid: string): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			await deleteDoc(doc(db, 'billings', uid));
			billings.value = billings.value.filter((item) => item.uid !== uid);
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
		fetchBillings,
		addBilling,
		fetchBilling,
		deleteBilling,
		deleteBillings,
		updateBilling,
	};
});
