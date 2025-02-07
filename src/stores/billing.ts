import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';
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

export const useBillingStore = defineStore('billing', () => {
	const db = useFirestore();
	const billings = ref<Billing[]>([]);
	const billing = ref<Billing>();
	const isLoading = ref(false);

	async function fetchBillings() {
		try {
			isLoading.value = true;
			const querySnapshot = await getDocs(collection(db, 'billings'));
			billings.value = querySnapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
			})) as Billing[];
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

	async function addBilling(billing: Billing) {
		isLoading.value = true;
		try {
			billing.id = (billings.value.length + 1).toString();
			billing.billNumber = Number(billing.id);
			const docRef = await addDoc(collection(db, 'billings'), {
				...billing,
				createdAt: Timestamp.now(),
			});
			billings.value.push({ ...billing, uid: docRef.id });
		} catch (error: any) {
			console.log(error);
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteBilling(uid: string) {
		isLoading.value = true;
		await deleteDoc(doc(db, 'billings', uid));
		billings.value = billings.value.filter((item) => item.uid !== uid);
		isLoading.value = false;
	}

	async function deleteBillings(uids: string[]) {
		isLoading.value = true;
		const batch = writeBatch(db);

		uids.forEach((uid) => {
			const docRef = doc(db, 'billings', uid);
			batch.delete(docRef);
		});

		try {
			await batch.commit();
			billings.value = billings.value.filter(
				(val) => !uids.includes(val.uid ?? ''),
			);
			console.log('Billings deleted successfully');
		} catch (error) {
			console.error('Error deleting billings:', error);
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
