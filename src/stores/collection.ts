import { collectionRepository } from '@/repositories/collectionRepository';
import type { Collection } from '@/types/collection';
import type { H3Response } from '@/types/h3response';
import type { StoreResponse } from '@/types/store-response';
import { watchDebounced } from '@vueuse/core';
import { format } from 'date-fns';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCollectionStore = defineStore('collection', () => {
	// State
	const collections = ref<Collection[]>([]);
	const isLoading = ref(false);
	const month = ref(new Date());
	const searchQuery = ref('');
	const totalCollections = ref(0);
	const page = ref(0);

	// getters
	const offset = computed(() => page.value * 10);
	const formattedDate = computed(() => format(month.value, 'yyyy-M'));

	// Actions
	async function fetchCollections() {
		isLoading.value = true;
		const response = await collectionRepository.fetchCollections({
			q: searchQuery.value,
			month: formattedDate.value,
			offset: offset.value,
			orderBy: 'sysno',
			order: 'desc',
		});

		collections.value = response?.data || [];
		totalCollections.value = response?.total || 0;
		isLoading.value = false;
	}

	async function addCollections(payload: File): Promise<StoreResponse> {
		try {
			isLoading.value = true;
			const formData = new FormData();
			formData.append('file', payload);

			const response = await collectionRepository.addCollections(formData);

			if (response?.statusCode == 200) {
				await fetchCollections();
			}
			return {
				status: 'success',
				message: response?.message,
				statusMessage: response?.statusMessage ?? '',
			};
		} catch (error) {
			console.error('Error uploading CSV:', error);
			return {
				status: 'error',
				message: 'Failed to upload CSV',
				statusMessage: 'error',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteCollections(
		payload: Collection[],
	): Promise<StoreResponse> {
		isLoading.value = true;
		const response = await collectionRepository.deleteCollections(payload);
		if (response?.statusCode == 200) {
			await fetchCollections();
			return {
				status: 'success',
				message: response.message,
				statusMessage: response.statusMessage ?? '',
			};
		}
		return {
			status: 'error',
			message: response?.message,
			statusMessage: response?.statusMessage ?? '',
		};
	}

	watchDebounced(
		[searchQuery, formattedDate, offset],
		(newQuery) => {
			fetchCollections();
		},
		{ debounce: 300 },
	);

	return {
		isLoading,
		totalCollections,
		collections,
		searchQuery,
		month,
		page,
		fetchCollections,
		addCollections,
		deleteCollections,
	};
});
