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
	orderBy,
	query,
	updateDoc,
	limit,
	startAfter,
	getCountFromServer,
} from 'firebase/firestore';

export const useResidentStore = defineStore('resident', () => {
	const db = useFirestore();
	const residents = ref<Resident[]>([]);
	const resident = ref<Resident>({});
	const isLoading = ref(false);
	const totalResidents = ref(0);
	const rowsPerPage = ref(10);
	const lastVisible = ref<any>(null);
	const firstVisible = ref<any>(null);
	const currentPage = ref(0);

	async function fetchTotalResidents() {
		const snapshot = await getCountFromServer(collection(db, 'residents'));
		totalResidents.value = snapshot.data().count;
	}

	async function fetchResidents(event: any = { first: 0, rows: 10, page: 0 }) {
		isLoading.value = true;

		const { first, rows, page } = event;
		rowsPerPage.value = rows;
		currentPage.value = page;

		let residentsQuery;
		if (page === 0 || !lastVisible.value) {
			residentsQuery = query(
				collection(db, 'residents'),
				orderBy('firstName', 'asc'),
				limit(rows),
			);
		} else {
			residentsQuery = query(
				collection(db, 'residents'),
				orderBy('firstName', 'asc'),
				startAfter(lastVisible.value),
				limit(rows),
			);
		}

		const querySnapshot = await getDocs(residentsQuery);

		firstVisible.value = querySnapshot.docs[0] || null;
		lastVisible.value =
			querySnapshot.docs[querySnapshot.docs.length - 1] || null;

		residents.value = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			uid: doc.id,
		}));

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
		rowsPerPage,
		totalResidents,
		lastVisible,
		firstVisible,
		currentPage,
		fetchTotalResidents,
		fetchResident,
		fetchResidents,
		addResident,
		deleteResident,
		updateResident,
	};
});
