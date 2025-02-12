import type { Reader } from '@/types/reader';
import type { StoreResponse } from '@/types/store-response';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
} from 'firebase/firestore';
import { ref } from 'vue';
import { useFirestore } from 'vuefire';

export const useReaderStore = () => {
	const db = useFirestore();
	const readers = ref<Reader[]>([]);
	const isLoading = ref(false);

	async function fetchReaders() {
		isLoading.value = true;
		try {
			const readersSnapshot = await getDocs(collection(db, 'readers'));

			readers.value = readersSnapshot.docs.map((doc) => ({
				...doc.data(),
				uid: doc.id,
			}));
		} catch (error: any) {
			console.log('fetchReaders', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function addReader(name: string): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const res = await addDoc(collection(db, 'readers'), { name });
			readers.value.push({ name, uid: res.id });
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully added resident',
			};
		} catch (error: any) {
			console.log('addReader', error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteReaders(uid: string): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			await deleteDoc(doc(db, 'readers', uid));
			readers.value = readers.value.filter((val) => val.uid !== uid);
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
	return {
		readers,
		isLoading,
		fetchReaders,
		addReader,
		deleteReaders,
	};
};
