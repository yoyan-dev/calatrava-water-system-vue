import { collectionRepository } from '@/repositories/collectionRepository';
import type { Collection } from '@/types/collection';
import type { StoreResponse } from '@/types/store-response';
import { format } from 'date-fns';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// Define the type for the grouped result
interface GroupedCollection {
	accountno: string;
	fullname: string;
	records: Collection[];
}

export const useCollectionStore = defineStore('collection', () => {
	// State
	const collections = ref<Collection[]>([]);
	const isLoading = ref(false);
	const month = ref(new Date());
	const searchQuery = ref('');
	const totalCollections = ref(0);
	const page = ref(0);

	// Getters
	const offset = computed(() => page.value * 10);
	const formattedDate = computed(() => format(month.value, 'yyyy-MM'));
	const groupCollectionByAccount = computed(() => {
		// Group records by accountno
		const grouped = collections.value.reduce(
			(acc: GroupedCollection[], collection) => {
				// Find if an object with the same accountno already exists in the accumulator
				let group = acc.find((item) => item.accountno === collection.accountno);

				if (group) {
					// If exists, push the collection to its records array
					group.records.push(collection);
				} else {
					// If not, create a new group with the accountno and an array containing the collection
					acc.push({
						accountno: collection.accountno as string,
						fullname: collection.fullname as string,
						records: [collection],
					});
				}

				return acc;
			},
			[],
		);

		// Sort records in each group by pymtdate descending (latest first)
		const parseDate = (dateStr: string) => {
			const parts = dateStr.split('/');
			return new Date(
				`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`,
			);
		};

		return grouped.map((group) => ({
			...group,
			records: group.records.sort((a, b) => {
				const dateA = a.pymtdate ? parseDate(a.pymtdate).getTime() : 0;
				const dateB = b.pymtdate ? parseDate(b.pymtdate).getTime() : 0;
				return dateB - dateA;
			}),
		}));
	});

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

	return {
		// State
		isLoading,
		totalCollections,
		collections,
		searchQuery,
		month,
		page,

		// Getters
		groupCollectionByAccount,

		// Actions
		fetchCollections,
		addCollections,
		deleteCollections,
	};
});
