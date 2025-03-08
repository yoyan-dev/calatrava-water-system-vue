import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';
import { useFirestore } from 'vuefire';
import {
	collection,
	deleteDoc,
	doc,
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
import { residentRepository } from '@/repositories/residentRepository';

export const useResidentStore = defineStore('resident', () => {
	const db = useFirestore();
	const residents = ref<Resident[]>([]);
	const resident = ref<Resident>();
	const isLoading = ref(false);
	const totalResidents = ref(0);
	const searchQuery = ref('');
	const filterAddress = ref('');
	const page = ref(0);
	const limit = ref(10);

	// getters
	const offset = computed(() => (page.value - 1) * limit.value);

	async function fetchResidents() {
		isLoading.value = true;
		const response = await residentRepository.fetchResidents({
			q: searchQuery.value,
			offset: offset.value,
		});

		residents.value = response?.data || [];
		totalResidents.value = response?.total || 0;
		isLoading.value = false;
	}

	async function fetchResident(uid: string) {
		isLoading.value = true;
		const response = await residentRepository.fetchResident(uid);
		resident.value = response?.data;
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
			fetchResidents();
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
