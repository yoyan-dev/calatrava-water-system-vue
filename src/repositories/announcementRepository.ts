import { useFetch } from '@vueuse/core';
import type { Announcement } from '@/types/announcement';
import type { H3Response } from '@/types/h3response';
import camelize from 'camelize';

const API_URL = import.meta.env.VITE_API_URL;

export const AnnouncementRepository = {
	async fetchAnnouncements(params: Record<string, any>) {
		const queryString = new URLSearchParams(params).toString();
		const url = `${API_URL}/announcements/${
			queryString ? '?' + queryString : ''
		}`;

		try {
			const { data: response } = await useFetch(url).json<H3Response>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error fetching announcements:', error);
			return { data: [], total: 0 };
		}
	},

	async addAnnouncement(payload: Announcement) {
		console.log(payload);
		try {
			const { data, error } = await useFetch(`${API_URL}/announcements`, {
				method: 'POST',
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
			console.error('Error adding announcement:', error);
			return {
				statusCode: 500,
				message:
					error instanceof Error ? error.message : 'Failed to add announcement',
			};
		}
	},
};
