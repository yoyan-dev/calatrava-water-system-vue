import { useFetch } from '@vueuse/core';
import type { Billing } from '@/types/billing';
import type { H3Response } from '@/types/h3response';
import camelize from 'camelize';

const API_URL = import.meta.env.VITE_API_URL;

export const billingRepository = {
	async fetchBilling(uid: string) {
		try {
			const { data: response } = await useFetch(
				`${API_URL}/billings/${uid}`,
			).json<H3Response<Billing>>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error fetching billings:', error);
			return { data: {} };
		}
	},

	async fetchBillings(params: Record<string, any>) {
		const queryString = new URLSearchParams(params).toString();
		const url = `${API_URL}/billings${queryString ? '?' + queryString : ''}`;

		try {
			const { data: response } = await useFetch(url).json<
				H3Response<Billing[]>
			>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error fetching billings:', error);
			return { data: [], total: 0 };
		}
	},

	async addBillings(payload: FormData) {
		try {
			const { data, error } = await useFetch(`${API_URL}/billings`, {
				method: 'POST',
				body: payload,
			}).json<H3Response>();

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

	async updateBilling({ uid, billing }: { uid: string; billing: Billing }) {
		try {
			const { data, error } = await useFetch(`${API_URL}/billings/${uid}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(billing),
			}).json<H3Response>();

			if (error.value) {
				throw new Error(error.value.message || 'Network error');
			}

			return data.value;
		} catch (error) {
			return {
				statusCode: 500,
				message:
					error instanceof Error ? error.message : 'Failed to delete billing',
			};
		}
	},

	async deleteBilling({ uid, accountno }: { uid: string; accountno: string }) {
		try {
			const { data, error } = await useFetch(`${API_URL}/billings/${uid}`, {
				method: 'DELETE',
				body: accountno,
			}).json<H3Response>();

			if (error.value) {
				throw new Error(error.value.message || 'Network error');
			}

			return data.value;
		} catch (error) {
			return {
				statusCode: 500,
				message:
					error instanceof Error ? error.message : 'Failed to delete billing',
			};
		}
	},

	async deleteBillings(payload: Billing[]) {
		try {
			const { data, error } = await useFetch(`${API_URL}/billings`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}).json<H3Response>();

			if (error.value) {
				throw new Error(error.value.message || 'Network error');
			}

			return data.value;
		} catch (error) {
			return {
				statusCode: 500,
				message:
					error instanceof Error ? error.message : 'Failed to delete billing',
			};
		}
	},
};
