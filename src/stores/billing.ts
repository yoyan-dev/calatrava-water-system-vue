import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Billing } from '@/types/billing';
import type { StoreResponse } from '@/types/store-response';
import { billingRepository } from '@/repositories/billingRepository';
import { billingRepository as billRepo } from '@/repositories/v2/billingRepository';

export const useBillingStore = defineStore('billing', () => {
	// State
	const billings = ref<Billing[]>([]);
	const billing = ref<Billing>();
	const isLoading = ref(false);
	const month = ref(new Date());
	const searchQuery = ref('');
	const totalBillings = ref(0);
	const page = ref(0);
	const lastDoc = ref<any>(null);
	const orderByField = ref<string>('bill_no');
	const orderDirection = ref<string>('desc');

	// Actions
	async function fetchBillings(refresh = false) {
		if (refresh) {
			lastDoc.value = null;
			billings.value = [];
		}

		isLoading.value = true;
		const response = await billRepo.paginateBillings({
			limit: 10,
			lastDoc: lastDoc.value,
			searchQuery: searchQuery.value,
			orderByField: orderByField.value,
			orderDirection: orderDirection.value as 'asc' | 'desc',
		});
		if (response?.data) {
			if (refresh) {
				billings.value = response.data;
			} else {
				billings.value = [...billings.value, ...response.data];
			}
			lastDoc.value = response.lastDoc;
			totalBillings.value = billings.value.length + (lastDoc.value ? 1 : 0);
		}
		isLoading.value = false;
	}

	async function fetchBilling(uid: string) {
		isLoading.value = true;
		const response = await billingRepository.fetchBilling(uid);
		billing.value = response?.data;
		isLoading.value = false;
	}

	async function addBillings(payload: File): Promise<StoreResponse> {
		isLoading.value = true;
		const formData = new FormData();
		formData.append('file', payload);
		const response = await billingRepository.addBillings(formData);
		if (response?.statusCode == 200) {
			await fetchBillings();
			return {
				status: 'success',
				message: response.message,
				statusMessage: response.statusMessage ?? '',
			};
		}
		isLoading.value = false;
		return {
			status: 'error',
			message: response?.message,
			statusMessage: response?.statusMessage ?? '',
		};
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
			await fetchBillings();
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
			await fetchBillings();
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
			await fetchBillings();
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
		month,
		searchQuery,
		page,
		totalBillings,
		fetchBilling,
		fetchBillings,
		addBillings,
		updateBilling,
		deleteBilling,
		deleteBillings,
	};
});
