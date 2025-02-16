import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';
import { useFirestore } from 'vuefire';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	Timestamp,
	writeBatch,
	where,
	setDoc,
} from 'firebase/firestore';
import type { StoreResponse } from '@/types/store-response';
import type { H3Response } from '@/types/h3response';
import { useFetch, watchDebounced } from '@vueuse/core';

export const useResidentStore = defineStore('resident', () => {
	const db = useFirestore();
	const residents = ref<Resident[]>([]);
	const resident = ref<Resident>({});
	const isLoading = ref(false);
	const totalResidents = ref(0);
	const searchQuery = ref('');
	const filterAddress = ref('');
	const page = ref(0);

	// getters
	const offset = computed(() => page.value * 10);

	async function fetchResidents(searchParams: Record<string, any> = {}) {
		isLoading.value = true;

		try {
			const queryString = new URLSearchParams(searchParams).toString();
			console.log(queryString);
			const url = `${import.meta.env.VITE_API_URL}/api/residents${
				queryString ? '?' + queryString : ''
			}`;
			const { data: response } = await useFetch(
				url,
				{
					method: 'GET',
				},
				{
					refetch: true,
				},
			).json<H3Response<Resident[]>>();

			residents.value = response.value?.data as Resident[];
			totalResidents.value = response.value?.total as number;
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
			const exists = residents.value.some(
				(item: Resident) => item.accountNumber === resident.accountNumber,
			);

			if (exists) {
				return {
					status: 'error',
					statusMessage: 'Duplicate account number',
					message: 'The account number already exists.',
				};
			}

			await setDoc(
				doc(db, 'residents', resident.accountNumber?.toString() ?? ''),
				{
					...resident,
					createdAt: Timestamp.now(),
					classification: 'resedential',
				},
			);
			residents.value.push({
				...resident,
				uid: resident.accountNumber?.toString(),
				classification: 'resedential',
			});

			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully added resident',
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

	async function deleteResident(uid: string): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const billingQuery = query(
				collection(db, 'billings'),
				where('residentUid', '==', uid),
			);
			const billingSnapshot = await getDocs(billingQuery);

			const batch = writeBatch(db);
			billingSnapshot.forEach((doc) => batch.delete(doc.ref));
			await batch.commit();

			await deleteDoc(doc(db, 'residents', uid));

			residents.value = residents.value.filter((val) => val.uid !== uid);

			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully deleted resident',
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

	async function deleteResidents(uids: string[]): Promise<StoreResponse> {
		isLoading.value = true;
		const batch = writeBatch(db);

		uids.forEach((uid) => {
			const docRef = doc(db, 'residents', uid);
			batch.delete(docRef);
		});

		try {
			await batch.commit();
			residents.value = residents.value.filter(
				(val) => !uids.includes(val.uid ?? ''),
			);
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully deleted residents',
			};
		} catch (error) {
			console.error('Error deleting residents:', error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function updateResident(
		resident: Resident,
		uid: string,
	): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			await updateDoc(doc(db, 'residents', uid), {
				...resident,
			});
			const result = residents.value.find((item) => item.uid === uid);
			Object.assign(result || {}, resident);
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully deleted resident',
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

	watchDebounced(
		[searchQuery, filterAddress, offset],
		(newQuery) => {
			fetchResidents({
				q: newQuery[0],
				address: newQuery[1],
				offset: newQuery[2],
			});
		},
		{ debounce: 300 },
	);

	return {
		residents,
		resident,
		isLoading,
		totalResidents,
		searchQuery,
		filterAddress,
		page,
		fetchResident,
		fetchResidents,
		addResident,
		deleteResident,
		deleteResidents,
		updateResident,
	};
});
