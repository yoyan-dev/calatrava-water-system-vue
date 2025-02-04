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

	function formatTimestampToDate(timestamp: Timestamp): string {
		const date = timestamp.toDate();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const year = date.getFullYear();
		return `${month}-${day}-${year}`;
	}

	async function fetchBillings() {
		try {
			isLoading.value = true;
			const querySnapshot = await getDocs(collection(db, 'billings'));
			billings.value = querySnapshot.docs.map((doc: any) => {
				const data = doc.data();
				data.billingDate = formatTimestampToDate(data.billingDate);
				return { uid: doc.id, ...data };
			}) as Resident[];
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
		try {
			isLoading.value = true;
			const docRef = doc(db, 'billings', uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				data.billingDate = formatTimestampToDate(data.billingDate);
				return { uid: docSnap.id, ...data } as Resident;
			} else {
				throw new Error('No such document!');
			}
		} catch (error) {
			console.error('Error fetching billing by ID:', error);
			throw error;
		} finally {
			isLoading.value = false;
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
		formatTimestampToDate,
	};
});
