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
	getCountFromServer,
	Timestamp,
} from 'firebase/firestore';
import useSearchKeywords from '@/composables/useSearchKeywords';
import type { StoreResponse } from '@/types/store-response';

export const useResidentStore = defineStore('resident', () => {
	const db = useFirestore();
	const { generateKeywords } = useSearchKeywords();
	const residents = ref<Resident[]>([]);
	const resident = ref<Resident>({});
	const isLoading = ref(false);
	const totalResidents = ref(0);

	async function fetchTotalResidents() {
		const snapshot = await getCountFromServer(collection(db, 'residents'));
		totalResidents.value = snapshot.data().count;
	}

	async function fetchResidents(event?: any) {
		isLoading.value = true;

		const residentQuery = query(
			collection(db, 'residents'),
			orderBy('firstName'),
		);

		try {
			const snapshot = await getDocs(residentQuery);

			residents.value = snapshot.docs.map((doc) => {
				const { searchKeyword, createdAt, createtedAt, ...rest } = doc.data();
				return {
					uid: doc.id,
					...rest,
				};
			});
		} catch (error) {
			console.error('Error fetching students:', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function fetchResident(uid: string) {
		isLoading.value = true;
		const docSnap = await getDoc(doc(db, 'residents', uid));
		resident.value = { ...docSnap.data(), uid: docSnap.id };
		isLoading.value = false;
	}

	async function addResident(resident: Resident): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			// const fullName =
			// 	resident.firstName +
			// 	' ' +
			// 	resident.middleName +
			// 	' ' +
			// 	resident.lastName;
			// resident.searchKeyword = generateKeywords(fullName);
			const docRef = await addDoc(collection(db, 'residents'), {
				...resident,
				createdAt: Timestamp.now(),
				classification: 'resedential',
			});
			residents.value.push({ waterBill: 10, ...resident, uid: docRef.id });
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully added resident',
			};
		} catch (error: any) {
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
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
		totalResidents,
		fetchTotalResidents,
		fetchResident,
		fetchResidents,
		addResident,
		deleteResident,
		updateResident,
	};
});
