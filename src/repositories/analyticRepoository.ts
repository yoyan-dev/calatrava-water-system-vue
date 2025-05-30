import { useFetch } from '@vueuse/core';
import type { H3Response } from '@/types/h3response';
import camelize from 'camelize';
import type { Total } from '@/types/total';
import type { Line } from '@/types/line';

const API_URL = import.meta.env.VITE_API_URL;

export const AnalyticRepository = {
	async fetchLineAnalytics() {
		try {
			const { data: response } = await useFetch(
				`${API_URL}/api/v1/analytics/line`,
			)
				.get()
				.json<H3Response<Line[]>>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error fetching Analytics:', error);
			return { data: [], total: 0 };
		}
	},

	async fetchTotalAnalytics() {
		try {
			const { data: response } = await useFetch(
				`${API_URL}/api/v1/analytics/total`,
			)
				.get()
				.json<H3Response<Total>>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error fetching Analytics:', error);
			return {
				data: {
					residents: 0,
					totalIncome: 0,
					currentMonthIncome: 0,
				} as Total,
				total: 0,
			};
		}
	},
};
