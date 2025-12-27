import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { StoreResponse } from '@/types/store-response';
import { collectionRepository as collectionGraph } from '@/repositories/v2/collectionRepository';
import type { CollectionItemFromCsv } from '@/types/collection-from-csv';

interface PaginateOptions {
	limit?: number;
	offset?: number;
	orderByField?: string;
	orderDirection?: 'ASC' | 'DESC';
}

export const useCollectionStore = defineStore('collection', () => {
	// State
	const collections = ref<CollectionItemFromCsv[]>([]);
	const isLoading = ref(false);
	const totalCollections = ref<number>(0);
	const searchQuery = ref<string>('');

	// Actions

	async function fetchSearchCollections(query: string) {
		try {
			const data = await collectionGraph.searchCollections(query);
			collections.value = data as CollectionItemFromCsv[];
		} catch (error) {
			console.error('Error searching Collections:', error);
		}
	}

	async function fetchCountCollections() {
		const result = await collectionGraph.countCollections();
		totalCollections.value =
			Array.isArray(result) && result.length > 0 ? result[0]._count : 0;
	}

	async function fetchPaginateCollections({
		limit = 10,
		offset = 0,
		orderByField = 'sysNo',
		orderDirection = 'DESC',
	}: PaginateOptions) {
		isLoading.value = true;

		try {
			const data = await collectionGraph.paginateCollection(
				limit,
				offset,
				orderByField,
				orderDirection,
			);
			if (data) {
				collections.value = data;
			}
		} catch (error) {
			console.error('Error fetching Collections:', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function addCollectionsFromCsv(payload: File): Promise<StoreResponse> {
		try {
			isLoading.value = true;
			const formData = new FormData();
			formData.append('file', payload);
			const response = await collectionGraph.addCollectionFromCsv(formData);
			if (response?.statusCode == 200) {
				isLoading.value = false;
				collections.value = [...collections.value, ...response.data];

				await fetchCountCollections();

				return {
					status: 'success',
					message: response.message,
				};
			}
			return {
				status: 'error',
				message: response?.message,
			};
		} catch (error) {
			console.error('Error uploading CSV:', error);
			return {
				status: 'error',
				message: 'Failed to upload CSV',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteOneCollection(id: string) {
		try {
			const response = await collectionGraph.deleteCollectionFromCsv(id);
			if (response?.success) {
				collections.value = collections.value.filter((item) => item.id !== id);
				return {
					status: 'success',
					message: 'Collection deleted successfully',
				};
			}
		} catch (error) {
			console.error('Error deleting Collection:', error);
		}
	}

	async function deleteSelectedCollections(
		selected: Array<CollectionItemFromCsv>,
	): Promise<{
		status: 'success' | 'error' | 'partial';
		message: string;
		deleted: number;
		failed: number;
	}> {
		if (!selected || selected.length === 0) {
			return {
				status: 'success',
				message: 'No Collections selected to delete',
				deleted: 0,
				failed: 0,
			};
		}

		isLoading.value = true;
		const results = [];

		try {
			// Map each deletion to a promise
			const deletionPromises = selected.map(async (item) => {
				try {
					const response = await collectionGraph.deleteCollectionFromCsv(
						item.id,
					);
					return { ...response, id: item.id };
				} catch (err) {
					console.error(`Failed to delete Collection ID: ${item.id}`, err);
					return {
						success: false,
						message: 'Network or server error',
						id: item.id,
					};
				}
			});

			// Execute all deletions concurrently
			const responses = await Promise.all(deletionPromises);
			results.push(...responses);

			// Filter successful deletions
			const successful = responses.filter((r) => r.success);
			const failed = responses.filter((r) => !r.success);

			// Remove only successfully deleted items from local state
			const deletedIds = successful.map((r) => r.id);
			collections.value = collections.value.filter(
				(item) => !deletedIds.includes(item.id),
			);

			// Update total count (optional: only if you track it separately)
			if (typeof totalCollections.value === 'number') {
				totalCollections.value = Math.max(
					0,
					totalCollections.value - successful.length,
				);
			}

			// Determine overall status
			const status =
				failed.length === 0
					? 'success'
					: successful.length === 0
					? 'error'
					: 'partial';

			const message =
				status === 'success'
					? `Successfully deleted ${successful.length} Collection(s)`
					: status === 'partial'
					? `Deleted ${successful.length}, failed ${failed.length}`
					: `Failed to delete ${failed.length} Collection(s)`;

			return {
				status,
				message,
				deleted: successful.length,
				failed: failed.length,
			};
		} catch (error) {
			console.error('Unexpected error in deleteSelectedCollections:', error);
			return {
				status: 'error',
				message: 'An unexpected error occurred',
				deleted: 0,
				failed: selected.length,
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function updateCollectionFromCsv(
		id: string,
		payload: Partial<CollectionItemFromCsv>,
	) {
		isLoading.value = true;
		try {
			const response = await collectionGraph.updateCollectionFromCsv({
				id,
				...payload,
			});
			if (response?.success) {
				const timestamp = new Date().toISOString();
				const index = collections.value.findIndex((item) => item.id === id);
				if (index !== -1) {
					collections.value[index] = {
						...collections.value[index],
						updatedAt: timestamp,
						...payload,
					};
				}
				return {
					status: 'success',
					message: 'Collection updated successfully',
				};
			}
		} catch (error) {
			console.error('Error updating Collection:', error);
		} finally {
			isLoading.value = false;
		}
	}

	return {
		collections,
		isLoading,
		totalCollections,
		searchQuery,
		fetchSearchCollections,
		fetchCountCollections,
		fetchPaginateCollections,
		addCollectionsFromCsv,
		updateCollectionFromCsv,
		deleteOneCollection,
		deleteSelectedCollections,
	};
});
