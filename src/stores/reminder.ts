import { ref } from 'vue';
import { defineStore } from 'pinia';
import { reminderRepository } from '@/repositories/reminderRepository';
import type { StoreResponse } from '@/types/store-response';
import type { Reminder } from '@/types/reminder';

export const useReminderStore = defineStore('reminder', () => {
	const isLoading = ref(false);
	const reminders = ref<Reminder[]>([]);
	const reminder = ref<Reminder[]>([]);
	const searchQuery = ref<boolean>(true);

	async function fetchReminders() {
		isLoading.value = true;
		const response = await reminderRepository.fetchReminders();
		reminders.value = response?.data || [];
		isLoading.value = false;
	}

	async function fetchReminder(uid: any) {
		isLoading.value = true;
		const response = await reminderRepository.fetchReminder({
			uid: uid,
			params: { isAll: searchQuery.value },
		});
		reminder.value = response?.data || [];
		isLoading.value = false;
	}

	async function addReminder(payload: Reminder): Promise<StoreResponse> {
		isLoading.value = true;
		console.log(payload);
		const response = await reminderRepository.addReminder(payload);
		if (response?.statusCode == 200) {
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

	return {
		isLoading,
		reminders,
		reminder,
		fetchReminders,
		fetchReminder,
		addReminder,
	};
});
