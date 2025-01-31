import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';
import { useFirestore } from 'vuefire';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';

export const useResidentStore = defineStore('resident', () => {
	const db = useFirestore();
	const residents = ref<Resident[]>([]);
	const resident = ref<Resident>({});
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

	async function fetchResident(uid: string) {
		isLoading.value = true;
		const docSnap = await getDoc(doc(db, 'residents', uid));
		resident.value = { ...docSnap.data(), uid: docSnap.id };
		isLoading.value = false;
	}

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

	async function updateResident(resident: Resident, uid: string) {
		await updateDoc(doc(db, 'residents', uid), {
			...resident,
		});
		const result = residents.value.find((item) => item.uid === uid);
		Object.assign(result || {}, resident);
	}

	return {
		residents,
		resident,
		isLoading,
		fetchResident,
		fetchResidents,
		addResident,
		deleteResident,
		updateResident,
	};
});
