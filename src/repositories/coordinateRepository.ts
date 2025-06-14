import { useFetch } from '@vueuse/core';
import type { Coordinate } from '@/types/coordinate';
import type { H3Response } from '@/types/h3response';
import camelize from 'camelize';

const API_URL = import.meta.env.VITE_API_URL;

export const coordinateRepository = {
	async fetchCoordinates() {
		const url = `${API_URL}/coordinates`;

		try {
			const { data: response } = await useFetch(url).json<
				H3Response<Coordinate[]>
			>();
			return response.value;
		} catch (error) {
			console.error('Error fetching coordinates:', error);
			return { data: [], total: 0 };
		}
	},

	async addCoordinate(payload: any) {
		try {
			const { data } = await useFetch(`${API_URL}/coordinates`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}).json<H3Response>();

			return data.value;
		} catch (error) {
			console.error('Error adding faq:', error);
			return {
				statusCode: 500,
				message:
					error instanceof Error ? error.message : 'Failed to add coordinate',
			};
		}
	},

	async editCoordinate(uid: string, payload: any) {
		try {
			const { data } = await useFetch(`${API_URL}/coordinates/${uid}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}).json<H3Response>();

			return data.value;
		} catch (error) {
			console.error('Error updating coordinate:', error);
			return {
				statusCode: 500,
				message:
					error instanceof Error
						? error.message
						: 'Failed to update coordinate',
			};
		}
	},

	async deleteCoordinate(uid: string) {
		try {
			const { data, error } = await useFetch(`${API_URL}/coordinates/${uid}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(uid),
			}).json<H3Response>();

			if (error.value) {
				throw new Error(error.value.message || 'Network error');
			}

			return data.value;
		} catch (error) {
			return {
				statusCode: 500,
				message:
					error instanceof Error
						? error.message
						: 'Failed to delete coordinate',
			};
		}
	},
};
