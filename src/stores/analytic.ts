import type { H3Response } from '@/types/h3response';
import type { Total } from '@/types/total';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAnalyticStore = defineStore('analytic', () => {
	const isLoading = ref(false);
	const totals = ref<Total>();

	async function fetchTotals() {
		isLoading.value = true;

		try {
			const { data: response } = await useFetch(
				`${import.meta.env.VITE_API_URL}/api/analytics/total`,
				{
					method: 'GET',
				},
			).json<H3Response>();

			totals.value = response.value?.data;
			console.log(totals.value);
		} catch (error) {
			console.log(error);
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		totals,
		fetchTotals,
	};
});
