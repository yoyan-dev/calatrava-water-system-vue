import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Concern } from '@/types/concern';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	serverTimestamp,
	Timestamp,
	orderBy,
} from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import type { StoreResponse } from '@/types/store-response';
import { concernRepository } from '@/repositories/v1/concernRepository';

export const useConcernStore = defineStore('concern', () => {
	const db = useFirestore();
	const concerns = ref<Concern[]>([]);
	const totalConcerns = ref(0);
	const isLoading = ref(false);

	async function fetchConcerns() {
		isLoading.value = true;
		const response = await concernRepository.fetchConcerns();
		concerns.value = response?.data || [];
		totalConcerns.value = response?.total || 0;
		isLoading.value = false;
	}

	async function addConcern(concern: Concern): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await concernRepository.addConcern(concern);
			return {
				status: 'success',
				message: response?.message,
				statusMessage: response?.statusMessage ?? '',
			};
		} catch (error) {
			console.error('Error adding concern:', error);
			return {
				status: 'error',
				message: 'Failed to send concern',
				statusMessage: 'error',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function updateConcern(
		uid: string,
		concern: Concern,
	): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await concernRepository.editConcern(uid, concern);
			fetchConcerns();
			return {
				status: 'success',
				message: response?.message,
				statusMessage: response?.statusMessage ?? '',
			};
		} catch (error) {
			console.error('Error updating concern:', error);
			return {
				status: 'error',
				message: 'Failed to update concern',
				statusMessage: 'error',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteConcern(uid: string): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			await deleteDoc(doc(db, 'concerns', uid));
			concerns.value = concerns.value.filter((val) => val.uid !== uid);
		} catch (error) {
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Error failed to delete concern.',
			};
		} finally {
			isLoading.value = false;
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Concern deleted successfully',
			};
		}
	}

	return {
		isLoading,
		concerns,
		deleteConcern,
		fetchConcerns,
		addConcern,
		updateConcern,
	};
});
