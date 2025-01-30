import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';
import { useFirestore } from 'vuefire';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
} from 'firebase/firestore';

export const useResidentStore = defineStore('resident', () => {
	const db = useFirestore();
	const residents = ref<Resident[]>([]);
	const isLoading = ref(false);

	async function fetchResidents() {
		isLoading.value = true;
		const querySnapshot = await getDocs(collection(db, 'residents'));
		const residentsDocs: Resident[] = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			uid: doc.id,
		}));
		residents.value = residentsDocs;
		isLoading.value = false;
	}

	function fetchResident(uid: string) {}

	async function addResident(resident: Resident) {
		isLoading.value = true;
		resident.id = (residents.value.length + 1).toString();
		const docRef = await addDoc(collection(db, 'residents'), {
			...resident,
		});
		residents.value.push({ waterBill: 10, ...resident, uid: docRef.id });
		isLoading.value = false;
		console.log(docRef);
	}

	async function deleteResident(uid: string) {
		isLoading.value = true;
		await deleteDoc(doc(db, 'residents', uid));
		residents.value = residents.value.filter((val) => val.uid !== uid);
		isLoading.value = false;
	}

	function updateResident(resident: Resident) {
		const result = residents.value.find((item) => item.id === resident.id);
		Object.assign(result || {}, resident);
	}

	return {
		residents,
		isLoading,
		fetchResident,
		fetchResidents,
		addResident,
		deleteResident,
		updateResident,
	};
});
