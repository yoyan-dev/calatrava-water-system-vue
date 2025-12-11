import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { StoreResponse } from '@/types/store-response';
import { consumerRepository as consumerGraph } from '@/repositories/graph/consumerRepository';
import type { Consumer } from '@/types/consumer';
import type { CreateConsumerVariables } from '@/dataconnect-generated';

interface PaginateOptions {
	limit?: number;
	offset?: number;
	orderByField?: string;
	orderDirection?: 'ASC' | 'DESC';
}

export const useConsumerStore = defineStore('consumer', () => {
	// State
	const consumers = ref<Consumer[]>([]);
	const isLoading = ref(false);
	const totalConsumers = ref<number>(0);
	const searchQuery = ref<string>('');

	// Actions

	async function fetchSearchConsumers(query: string) {
		try {
			const data = await consumerGraph.searchConsumers(query);
			consumers.value = data;
		} catch (error) {
			console.error('Error searching Consumers:', error);
		}
	}

	async function fetchCountConsumers() {
		const result = await consumerGraph.countConsumers();
		totalConsumers.value =
			Array.isArray(result) && result.length > 0 ? result[0]._count : 0;
	}

	async function fetchPaginateConsumers({
		limit = 10,
		offset = 0,
		orderByField = 'sysNo',
		orderDirection = 'DESC',
	}: PaginateOptions) {
		isLoading.value = true;

		try {
			const data = await consumerGraph.paginateConsumers(
				limit,
				offset,
				orderByField,
				orderDirection,
			);
			if (data) {
				consumers.value = data;
			}
		} catch (error) {
			console.error('Error fetching Consumers:', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function addConsumer(
		payload: CreateConsumerVariables,
	): Promise<StoreResponse> {
		try {
			const response = await consumerGraph.addConsumer(payload);

			if (response?.status == 'success' && response?.data) {
				consumers.value.unshift({ ...payload, ...response.data });

				return {
					status: 'success',
					message: 'Consumer added successfully',
				};
			} else {
				return {
					status: 'error',
					message: response?.message,
				};
			}
		} catch (error) {
			return {
				status: 'error',
				message: `Error adding consumer: ${error}`,
			};
		}
	}

	async function addConsumerFromCsv(payload: File): Promise<StoreResponse> {
		try {
			isLoading.value = true;
			const formData = new FormData();
			formData.append('file', payload);
			const response = await consumerGraph.addConsumerFromCsv(formData);
			if (response?.status == 'success' && response.data?.length) {
				isLoading.value = false;
				consumers.value = [...consumers.value, ...response.data];

				await fetchCountConsumers();

				return {
					status: 'success',
					message: response.message,
				};
			} else {
				return {
					status: 'error',
					message: 'Failed to upload CSV',
				};
			}
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

	async function deleteOneConsumer(id: string) {
		try {
			const response = await consumerGraph.deleteConsumer(id);
			if (response?.success) {
				consumers.value = consumers.value.filter((item) => item.id !== id);
				return {
					status: 'success',
					message: 'Consumer deleted successfully',
				};
			}
		} catch (error) {
			console.error('Error deleting Consumer:', error);
		}
	}

	async function deleteSelectedConsumers(selected: Array<Consumer>): Promise<{
		status: 'success' | 'error' | 'partial';
		message: string;
		deleted: number;
		failed: number;
	}> {
		if (!selected || selected.length === 0) {
			return {
				status: 'success',
				message: 'No Consumers selected to delete',
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
					const response = await consumerGraph.deleteConsumer(item.id);
					return { ...response, id: item.id };
				} catch (err) {
					console.error(`Failed to delete Consumer ID: ${item.id}`, err);
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
			consumers.value = consumers.value.filter(
				(item) => !deletedIds.includes(item.id),
			);

			// Update total count (optional: only if you track it separately)
			if (typeof totalConsumers.value === 'number') {
				totalConsumers.value = Math.max(
					0,
					totalConsumers.value - successful.length,
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
					? `Successfully deleted ${successful.length} Consumer(s)`
					: status === 'partial'
					? `Deleted ${successful.length}, failed ${failed.length}`
					: `Failed to delete ${failed.length} Consumer(s)`;

			return {
				status,
				message,
				deleted: successful.length,
				failed: failed.length,
			};
		} catch (error) {
			console.error('Unexpected error in deleteSelectedConsumers:', error);
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

	async function updateConsumer(id: string, payload: Partial<Consumer>) {
		isLoading.value = true;
		try {
			const response = await consumerGraph.updateConsumer({
				id,
				...payload,
			});
			if (response?.success) {
				const timestamp = new Date().toISOString();
				const index = consumers.value.findIndex((item) => item.id === id);
				if (index !== -1) {
					consumers.value[index] = {
						...consumers.value[index],
						updatedAt: timestamp,
						...payload,
					};
				}
				return {
					status: 'success',
					message: 'Consumer updated successfully',
				};
			}
		} catch (error) {
			console.error('Error updating Consumer:', error);
		} finally {
			isLoading.value = false;
		}
	}

	return {
		consumers,
		isLoading,
		totalConsumers,
		searchQuery,
		fetchSearchConsumers,
		fetchCountConsumers,
		fetchPaginateConsumers,
		addConsumer,
		addConsumerFromCsv,
		updateConsumer,
		deleteOneConsumer,
		deleteSelectedConsumers,
	};
});
