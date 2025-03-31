import type { Admin } from '@/types/admin';
import type { H3Response } from '@/types/h3response';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAdminStore = defineStore('admin', () => {
	const isLoading = ref(false);

	async function updateAdmin({ uid, body }: { uid: string; body: Admin }) {
		isLoading.value = true;

		const { data: response } = await useFetch(
			`${import.meta.env.VITE_API_URL}/api/admin/${uid}`,
		)
			.put(body)
			.json<H3Response>();

		if (response.value?.statusCode == 200) {
			return {
				status: 'success',
				message: response.value?.message,
				statusMessage: response.value?.statusMessage ?? '',
			};
		}
		isLoading.value = false;
		return {
			status: 'error',
			message: response.value?.message,
			statusMessage: response.value?.statusMessage ?? '',
		};
	}

	return {
		isLoading,
		updateAdmin,
	};
});
