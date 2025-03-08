import { useFetch } from '@vueuse/core';
import type { Ledger } from '@/types/ledger';
import type { H3Response } from '@/types/h3response';
import camelize from 'camelize';

const API_URL = import.meta.env.VITE_API_URL;

export const ledgerRepository = {
	async fetchLedgers(params: Record<string, any>) {
		const queryString = new URLSearchParams(params).toString();
		const url = `${API_URL}/api/ledger${queryString ? '?' + queryString : ''}`;

		try {
			const { data: response } = await useFetch(url).json<
				H3Response<Ledger[]>
			>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error fetching billings:', error);
			return { data: [], total: 0 };
		}
	},

	async addLedgers(payload: any[]) {
		try {
			const { data, error } = await useFetch(`${API_URL}/api/ledger`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}).json<H3Response<Ledger[]>>();

			if (error.value) {
				throw new Error(error.value.message || 'Network error');
			}

			return data.value;
		} catch (error) {
			console.error('Error adding billing:', error);
			return {
				statusCode: 500,
				message:
					error instanceof Error ? error.message : 'Failed to add billing',
			};
		}
	},
};
