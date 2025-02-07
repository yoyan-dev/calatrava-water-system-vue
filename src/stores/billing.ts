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
} from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export const useBillingStore = defineStore('billing', () => {
	const db = useFirestore();
	const billings = ref<Resident[]>([]);
	const billing = ref<Resident>();
	const isLoading = ref(false);

	async function fetchBillings() {
		try {
			isLoading.value = true;
			const querySnapshot = await getDocs(collection(db, 'billings'));
			billings.value = querySnapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
			})) as Resident[];
		} catch (error) {
			console.error('Error fetching billings:', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function addBilling(billing: Resident) {
		isLoading.value = true;
		billing.id = (billings.value.length + 1).toString();
		billing.billNumber = Number(billing.id);
		const docRef = await addDoc(collection(db, 'billings'), {
			...billing,
			createdAt: Timestamp.now(),
		});
		billings.value.push({ ...billing, uid: docRef.id });
		isLoading.value = false;
	}

	async function deleteBilling(uid: string) {
		isLoading.value = true;
		await deleteDoc(doc(db, 'billings', uid));
		billings.value = billings.value.filter((item) => item.uid !== uid);
		isLoading.value = false;
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

	function updateBilling(billing: Resident, uid: string) {
		const result = billings.value.find((item) => item.uid === uid);
		Object.assign(result || {}, billing);
	}

	return {
		billings,
		billing,
		isLoading,
		fetchBillings,
		addBilling,
		deleteBilling,
		fetchBilling,
		updateBilling,
	};
});
