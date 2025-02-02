import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	Timestamp,
} from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export const useBillingStore = defineStore('billing', () => {
	const db = useFirestore();
	const billings = ref<Resident[]>([]);
	const isLoading = ref(false);

	function fetchBillings() {
		billings.value = [
			{ id: '1', billNumber: 1, billingDate: '01-01-2025', waterBill: 100 },
		];
	}

	async function addBilling(billing: Resident) {
		isLoading.value = true;
		billing.id = (billings.value.length + 1).toString();
		billing.billNumber = Number(billing.id);
		billing.billingDate = Timestamp.now();
		const docRef = await addDoc(collection(db, 'billings'), {
			...billing,
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

	function updateBilling(billing: Resident, uid: string) {
		const result = billings.value.find((item) => item.uid === billing.uid);
		Object.assign(result || {}, billing);
	}

	return {
		billings,
		isLoading,
		fetchBillings,
		addBilling,
		deleteBilling,
		updateBilling,
	};
});
