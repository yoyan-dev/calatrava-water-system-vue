import { useFetch } from '@vueuse/core';
import type { Faq } from '@/types/faq';
import type { H3Response } from '@/types/h3response';
import camelize from 'camelize';

const API_URL = import.meta.env.VITE_API_URL;

export const faqRepository = {
	async fetchFaqs() {
		const url = `${API_URL}/api/v1/faqs`;

		try {
			const { data: response } = await useFetch(url).json<H3Response<Faq[]>>();
			return response.value;
		} catch (error) {
			console.error('Error fetching faqs:', error);
			return { data: [], total: 0 };
		}
	},

	async addFaq(payload: any) {
		try {
			const { data } = await useFetch(`${API_URL}/api/v1/faqs`, {
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
				message: error instanceof Error ? error.message : 'Failed to add faq',
			};
		}
	},

	async editFaq(uid: string, payload: any) {
		try {
			const { data } = await useFetch(`${API_URL}/api/v1/faqs/${uid}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}).json<H3Response>();

			return data.value;
		} catch (error) {
			console.error('Error updating faq:', error);
			return {
				statusCode: 500,
				message:
					error instanceof Error ? error.message : 'Failed to update faq',
			};
		}
	},

	async deleteFaq(uid: string) {
		try {
			const { data, error } = await useFetch(`${API_URL}/api/v1/faqs/${uid}`, {
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
					error instanceof Error ? error.message : 'Failed to delete faq',
			};
		}
	},
};
