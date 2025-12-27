import { ledgerRepository } from '@/repositories/v1/ledgerRepository';
import type { Ledger } from '@/types/ledger';
import type { StoreResponse } from '@/types/store-response';
import { watchDebounced } from '@vueuse/core';
import { format } from 'date-fns';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLedgerStore = defineStore('ledger', () => {
	const ledgers = ref<Ledger[]>([]);
	const totalLedgers = ref(0);
	const isLoading = ref(false);
	const searchQuery = ref('');
	const month = ref(new Date());
	const page = ref(0);

	// Getters
	const offset = computed(() => page.value * 10);
	const formattedDate = computed(() => format(month.value, 'yyyy-M'));

	// Actions
	async function fetchLedgers() {
		isLoading.value = true;
		const response = await ledgerRepository.fetchLedgers({
			q: searchQuery.value,
			month: formattedDate.value,
			offset: offset.value,
		});
		ledgers.value = response?.data || [];
		totalLedgers.value = response?.total || 0;
		isLoading.value = false;
	}

	watchDebounced([searchQuery, formattedDate, offset], () => fetchLedgers(), {
		debounce: 300,
	});

	async function addLedgers(payload: File) {
		isLoading.value = true;
		try {
			const formData = new FormData();
			formData.append('file', payload);
			const response = await ledgerRepository.addLedgers(formData);

			if (response?.statusCode == 200) {
				await fetchLedgers();
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

	async function deleteLedgers(payload: Ledger[]): Promise<StoreResponse> {
		isLoading.value = true;
		const response = await ledgerRepository.deleteLedgers(payload);
		if (response?.statusCode == 200) {
			await fetchLedgers();
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
		isLoading,
		month,
		page,
		searchQuery,
		ledgers,
		totalLedgers,
		fetchLedgers,
		addLedgers,
		deleteLedgers,
	};
});
