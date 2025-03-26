import { AnalyticRepository } from '@/repositories/analyticRepoository';
import type { H3Response } from '@/types/h3response';
import type { Line } from '@/types/line';
import type { Total } from '@/types/total';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAnalyticStore = defineStore('analytic', () => {
	const isLoading = ref(false);
	const totals = ref<Total>();
	const lineData = ref<Line[]>([]);

	async function fetchTotals() {
		isLoading.value = true;
		try {
			const response = await AnalyticRepository.fetchTotalAnalytics();
			totals.value = response?.data;
		} catch (error) {
			console.log(error);
		} finally {
			isLoading.value = false;
		}
	}

	async function fetchLineData() {
		isLoading.value = true;
		try {
			const response = await AnalyticRepository.fetchLineAnalytics();
			lineData.value = response?.data || [];
		} catch (error) {
			console.log(error);
		} finally {
			console.log(lineData.value);
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		totals,
		lineData,
		fetchTotals,
		fetchLineData,
	};
});
