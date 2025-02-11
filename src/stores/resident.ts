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
	writeBatch,
	where,
} from 'firebase/firestore';
import type { StoreResponse } from '@/types/store-response';

export const useResidentStore = defineStore('resident', () => {
	const db = useFirestore();
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
			console.log(residents.value);
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

			const docRef = await addDoc(collection(db, 'residents'), {
				...resident,
				createdAt: Timestamp.now(),
				classification: 'resedential',
			});
			residents.value.push({
				...resident,
				uid: docRef.id,
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

	async function deleteResidents(uids: string[]) {
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
		deleteResidents,
		updateResident,
	};
});
