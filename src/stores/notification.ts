import { notificationRepository } from '@/repositories/notificationRepository';
import type { Notification } from '@/types/notification';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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
