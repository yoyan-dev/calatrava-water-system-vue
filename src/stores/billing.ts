import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Billing } from '@/types/billing';
import type { StoreResponse } from '@/types/store-response';
import { billingRepository } from '@/repositories/billingRepository';
import { billingRepository as billRepo } from '@/repositories/v2/billingRepository';
import { billingRepository as billGraph } from '@/repositories/graph/billingRepository';
import type {
	CountBillingFromCsvData,
	PaginatedBillingsData,
} from '@/dataconnect-generated';

type BillingItem = PaginatedBillingsData['billingFromCsvs'][number];

interface PaginateOptions {
	limit?: number;
	offset?: number;
	orderByField?: string;
	orderDirection?: 'ASC' | 'DESC';
}

export const useBillingStore = defineStore('billing', () => {
	// State
	const billings = ref<BillingItem[]>([]);
	const billing = ref<Billing>();
	const isLoading = ref(false);
	const totalBillings = ref<number>(0);
	const searchQuery = ref<string>('');

	// Actions

	async function fetchSearchBillings(query: string) {
		try {
			const data = await billGraph.searchBillings(query);
			billings.value = data as BillingItem[];
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

	async function addBillings(payload: File): Promise<StoreResponse> {
		try {
			isLoading.value = true;
			const formData = new FormData();
			formData.append('file', payload);
			const response = await billGraph.addBillingFromCsv(formData);
			if (response?.statusCode == 200) {
				isLoading.value = false;
				await fetchPaginateBillings({
					limit: 10,
					offset: 0,
				});

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

	async function deleteBilling({
		accountno,
		uid,
	}: {
		accountno: string;
		uid: string;
	}): Promise<StoreResponse> {
		const response = await billingRepository.deleteBilling({ uid, accountno });
		if (response?.statusCode == 200) {
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

	async function deleteBillings(payload: Billing[]): Promise<StoreResponse> {
		isLoading.value = true;
		const response = await billingRepository.deleteBillings(payload);
		if (response?.statusCode == 200) {
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

	async function updateBilling(
		billing: Billing,
		uid: string,
	): Promise<StoreResponse> {
		isLoading.value = true;
		const response = await billingRepository.updateBilling({ uid, billing });
		if (response?.statusCode == 200) {
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
		billings,
		billing,
		isLoading,
		totalBillings,
		searchQuery,
		fetchSearchBillings,
		fetchCountBillings,
		fetchPaginateBillings,
		addBillings,
		updateBilling,
		deleteBilling,
		deleteBillings,
	};
});
