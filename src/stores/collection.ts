import { collectionRepository } from '@/repositories/collectionRepository';
import type { Collection } from '@/types/collection';
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
		});

		collections.value = response?.data || [];
		totalCollections.value = response?.total || 0;
		isLoading.value = false;
	}

	async function addCollections(payload: Collection[]): Promise<StoreResponse> {
		const response = await collectionRepository.addCollections(payload);
		console.log(response);
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
	};
});
