import { notificationRepository } from '@/repositories/notificationRepository';
import type { Notification } from '@/types/notification';
import type { StoreResponse } from '@/types/store-response';
import { format } from 'date-fns';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
	const notifications = ref<Notification[]>([]);
	const isLoading = ref(false);
	const totalNotification = ref(0);

	async function fetchNotifications() {
		isLoading.value = true;
		const response = await notificationRepository.fetchNotifications();
		notifications.value = response?.data || [];
		totalNotification.value =
			response?.total ||
			notifications.value.filter((n) => n.isRead == false).length;
		isLoading.value = false;
		console.log(notifications.value);
	}

	async function markAsAllRead() {
		isLoading.value = true;
		const response = await notificationRepository.markAsAllRead();
		isLoading.value = false;
		console.log(response?.data);
	}
	return {
		notifications,
		totalNotification,
		isLoading,
		fetchNotifications,
		markAsAllRead,
	};
});
