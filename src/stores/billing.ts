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
	getDocs
} from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export const useBillingStore = defineStore('billing', () => {
	const db = useFirestore();
	const billings = ref<Resident[]>([]);
	const isLoading = ref(false);

	async function fetchBillings() {
		isLoading.value = true;
		const querySnapshot = await getDocs(collection(db, 'billings'));
		billings.value = querySnapshot.docs.map((doc: any) => ({
			uid: doc.id,
			...doc.data(),
		})) as Resident[];
		isLoading.value = false;
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

	async function fetchBillingById(uid: string) {
		isLoading.value = true;
		const docRef = doc(db, 'billings', uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			isLoading.value = false;
			return { uid: docSnap.id, ...docSnap.data() } as Resident;
		} else {
			isLoading.value = false;
			throw new Error('No such document!');
		}
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
		fetchBillingById,
		updateBilling,
	};
});
