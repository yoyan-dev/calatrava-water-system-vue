import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { StoreResponse } from '@/types/store-response';
import { billingRepository as billGraph } from '@/repositories/graph/billingRepository';
import type { BillingItemFromCsv } from '@/types/billing-from-csv';

interface PaginateOptions {
	limit?: number;
	offset?: number;
	orderByField?: string;
	orderDirection?: 'ASC' | 'DESC';
}

export const useBillingStore = defineStore('billing', () => {
	// State
	const billings = ref<BillingItemFromCsv[]>([]);
	const isLoading = ref(false);
	const totalBillings = ref<number>(0);
	const searchQuery = ref<string>('');

	// Actions

	async function fetchSearchBillings(query: string) {
		try {
			const data = await billGraph.searchBillings(query);
			billings.value = data as BillingItemFromCsv[];
		} catch (error) {
			console.error('Error searching billings:', error);
		}
	}

	async function fetchCountBillings() {
		const result = await billGraph.countBillings();
		totalBillings.value =
			Array.isArray(result) && result.length > 0 ? result[0]._count : 0;
	}

	async function fetchPaginateBillings({
		limit = 10,
		offset = 0,
		orderByField = 'bill_no',
		orderDirection = 'DESC',
	}: PaginateOptions) {
		isLoading.value = true;

		try {
			const data = await billGraph.paginateBilling(
				limit,
				offset,
				orderByField,
				orderDirection,
			);
			if (data) {
				billings.value = data;
			}
		} catch (error) {
			console.error('Error fetching billings:', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function addBillingsFromCsv(payload: File): Promise<StoreResponse> {
		try {
			isLoading.value = true;
			const formData = new FormData();
			formData.append('file', payload);
			const response = await billGraph.addBillingFromCsv(formData);
			if (response?.statusCode == 200) {
				isLoading.value = false;
				billings.value = [...billings.value, ...response.data];

				await fetchCountBillings();

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

	async function deleteOneBilling(id: string) {
		try {
			const response = await billGraph.deleteBillingFromCsv(id);
			if (response?.success) {
				billings.value = billings.value.filter((item) => item.id !== id);
				return {
					status: 'success',
					message: 'Billing deleted successfully',
				};
			}
		} catch (error) {
			console.error('Error deleting billing:', error);
		}
	}

	async function deleteSelectedBillings(
		selected: Array<BillingItemFromCsv>,
	): Promise<{
		status: 'success' | 'error' | 'partial';
		message: string;
		deleted: number;
		failed: number;
	}> {
		if (!selected || selected.length === 0) {
			return {
				status: 'success',
				message: 'No billings selected to delete',
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
					const response = await billGraph.deleteBillingFromCsv(item.id);
					return { ...response, id: item.id };
				} catch (err) {
					console.error(`Failed to delete billing ID: ${item.id}`, err);
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
			billings.value = billings.value.filter(
				(bill) => !deletedIds.includes(bill.id),
			);

			// Update total count (optional: only if you track it separately)
			if (typeof totalBillings.value === 'number') {
				totalBillings.value = Math.max(
					0,
					totalBillings.value - successful.length,
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
					? `Successfully deleted ${successful.length} billing(s)`
					: status === 'partial'
					? `Deleted ${successful.length}, failed ${failed.length}`
					: `Failed to delete ${failed.length} billing(s)`;

			return {
				status,
				message,
				deleted: successful.length,
				failed: failed.length,
			};
		} catch (error) {
			console.error('Unexpected error in deleteSelectedBillings:', error);
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

	async function updateBillingFromCsv(
		id: string,
		payload: Partial<BillingItemFromCsv>,
	) {
		isLoading.value = true;
		try {
			const response = await billGraph.updateBillingFromCsv({ id, ...payload });
			if (response?.success) {
				const timestamp = new Date().toISOString();
				const index = billings.value.findIndex((item) => item.id === id);
				if (index !== -1) {
					billings.value[index] = {
						...billings.value[index],
						updatedAt: timestamp,
						...payload,
					};
				}
				return {
					status: 'success',
					message: 'Billing updated successfully',
				};
			}
		} catch (error) {
			console.error('Error updating billing:', error);
		} finally {
			isLoading.value = false;
		}
	}

	return {
		billings,
		isLoading,
		totalBillings,
		searchQuery,
		fetchSearchBillings,
		fetchCountBillings,
		fetchPaginateBillings,
		addBillingsFromCsv,
		updateBillingFromCsv,
		deleteOneBilling,
		deleteSelectedBillings,
	};
});
