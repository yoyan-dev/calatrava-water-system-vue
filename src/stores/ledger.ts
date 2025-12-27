import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { StoreResponse } from '@/types/store-response';
import { ledgerRepository as ledgerGraph } from '@/repositories/v2/ledgerRepository';
import type { LedgerItemFromCsv } from '@/types/ledger-from-csv';

interface PaginateOptions {
	limit?: number;
	offset?: number;
	orderByField?: string;
	orderDirection?: 'ASC' | 'DESC';
}

export const useLedgerStore = defineStore('ledger', () => {
	// State
	const ledgers = ref<LedgerItemFromCsv[]>([]);
	const isLoading = ref(false);
	const totalLedgers = ref<number>(0);
	const searchQuery = ref<string>('');

	// Actions

	async function fetchSearchLedgers(query: string) {
		try {
			const data = await ledgerGraph.searchLedgers(query);
			ledgers.value = data as LedgerItemFromCsv[];
		} catch (error) {
			console.error('Error searching ledgers:', error);
		}
	}

	async function fetchCountLedgers() {
		const result = await ledgerGraph.countLedgers();
		totalLedgers.value =
			Array.isArray(result) && result.length > 0 ? result[0]._count : 0;
	}

	async function fetchPaginateLedgers({
		limit = 10,
		offset = 0,
		orderByField = 'sysNo',
		orderDirection = 'DESC',
	}: PaginateOptions) {
		isLoading.value = true;

		try {
			const data = await ledgerGraph.paginateLedger(
				limit,
				offset,
				orderByField,
				orderDirection,
			);
			if (data) {
				ledgers.value = data;
			}
		} catch (error) {
			console.error('Error fetching ledgers:', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function addLedgersFromCsv(payload: File): Promise<StoreResponse> {
		try {
			isLoading.value = true;
			const formData = new FormData();
			formData.append('file', payload);
			const response = await ledgerGraph.addLedgerFromCsv(formData);
			if (response?.statusCode == 200) {
				isLoading.value = false;
				ledgers.value = [...ledgers.value, ...response.data];

				await fetchCountLedgers();

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

	async function deleteOneLedger(id: string) {
		try {
			const response = await ledgerGraph.deleteLedgerFromCsv(id);
			if (response?.success) {
				ledgers.value = ledgers.value.filter((item) => item.id !== id);
				return {
					status: 'success',
					message: 'Ledger deleted successfully',
				};
			}
		} catch (error) {
			console.error('Error deleting ledger:', error);
		}
	}

	async function deleteSelectedLedgers(
		selected: Array<LedgerItemFromCsv>,
	): Promise<{
		status: 'success' | 'error' | 'partial';
		message: string;
		deleted: number;
		failed: number;
	}> {
		if (!selected || selected.length === 0) {
			return {
				status: 'success',
				message: 'No ledgers selected to delete',
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
					const response = await ledgerGraph.deleteLedgerFromCsv(item.id);
					return { ...response, id: item.id };
				} catch (err) {
					console.error(`Failed to delete ledger ID: ${item.id}`, err);
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
			ledgers.value = ledgers.value.filter(
				(item) => !deletedIds.includes(item.id),
			);

			// Update total count (optional: only if you track it separately)
			if (typeof totalLedgers.value === 'number') {
				totalLedgers.value = Math.max(
					0,
					totalLedgers.value - successful.length,
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
					? `Successfully deleted ${successful.length} ledger(s)`
					: status === 'partial'
					? `Deleted ${successful.length}, failed ${failed.length}`
					: `Failed to delete ${failed.length} ledger(s)`;

			return {
				status,
				message,
				deleted: successful.length,
				failed: failed.length,
			};
		} catch (error) {
			console.error('Unexpected error in deleteSelectedledgers:', error);
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

	async function updateLedgerFromCsv(
		id: string,
		payload: Partial<LedgerItemFromCsv>,
	) {
		isLoading.value = true;
		try {
			const response = await ledgerGraph.updateLedgerFromCsv({
				id,
				...payload,
			});
			if (response?.success) {
				const timestamp = new Date().toISOString();
				const index = ledgers.value.findIndex((item) => item.id === id);
				if (index !== -1) {
					ledgers.value[index] = {
						...ledgers.value[index],
						updatedAt: timestamp,
						...payload,
					};
				}
				return {
					status: 'success',
					message: 'ledger updated successfully',
				};
			}
		} catch (error) {
			console.error('Error updating ledger:', error);
		} finally {
			isLoading.value = false;
		}
	}

	return {
		ledgers,
		isLoading,
		totalLedgers,
		searchQuery,
		fetchSearchLedgers,
		fetchCountLedgers,
		fetchPaginateLedgers,
		addLedgersFromCsv,
		updateLedgerFromCsv,
		deleteOneLedger,
		deleteSelectedLedgers,
	};
});
