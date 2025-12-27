import { ref } from 'vue';
import { defineStore } from 'pinia';
import { AnnouncementRepository } from '@/repositories/v1/announcementRepository';
import { watchDebounced } from '@vueuse/core';
import type { StoreResponse } from '@/types/store-response';
import type { Announcement } from '@/types/announcement';

export const useAnnouncementStore = defineStore('announcement', () => {
	const isLoading = ref(false);
	const announcement = ref();
	const searchQuery = ref<boolean>(true);

	async function fetchAnnouncements() {
		isLoading.value = true;
		const response = await AnnouncementRepository.fetchAnnouncements({
			isAll: searchQuery.value,
		});

		announcement.value = response?.data || [];
		isLoading.value = false;
	}

	async function addAnnouncement(
		payload: Announcement,
	): Promise<StoreResponse> {
		isLoading.value = true;
		const response = await AnnouncementRepository.addAnnouncement(payload);
		console.log(payload);
		if (response?.statusCode == 200) {
			await fetchAnnouncements();
			console.log(response);
			isLoading.value = false;
			return {
				status: 'success',
				message: response.message,
				statusMessage: response.statusMessage ?? '',
			};
		}
		isLoading.value = false;
		return {
			status: 'error',
			message: response?.message,
			statusMessage: response?.statusMessage ?? '',
		};
	}

	watchDebounced(
		[searchQuery],
		(newQuery) => {
			fetchAnnouncements();
		},
		{ debounce: 300 },
	);

	return {
		isLoading,
		announcement,
		fetchAnnouncements,
		addAnnouncement,
	};
});
