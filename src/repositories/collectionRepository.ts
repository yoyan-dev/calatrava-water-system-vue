import { useFetch } from '@vueuse/core';
import type { Collection } from '@/types/collection';
import type { H3Response } from '@/types/h3response';
import camelize from 'camelize';

const API_URL = import.meta.env.VITE_API_URL;

export const collectionRepository = {
	async fetchCollections(params: Record<string, any>) {
		const queryString = new URLSearchParams(params).toString();
		const url = `${API_URL}/api/collections${
			queryString ? '?' + queryString : ''
		}`;

		try {
			const { data: response } = await useFetch(url).json<
				H3Response<Collection[]>
			>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error fetching collections:', error);
			return { data: [], total: 0 };
		}
	},

	async addCollections(payload: any[]) {
		try {
			const { data, error } = await useFetch(`${API_URL}/api/collections`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}).json<H3Response<Collection[]>>();

			if (error.value) {
				throw new Error(error.value.message || 'Network error');
			}

			return data.value;
		} catch (error) {
			console.error('Error adding collections:', error);
			return {
				statusCode: 500,
				message:
					error instanceof Error ? error.message : 'Failed to add collections',
			};
		}
	},
};
