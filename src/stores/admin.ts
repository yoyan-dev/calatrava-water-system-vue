import type { Admin } from '@/types/admin';
import type { H3Response } from '@/types/h3response';
import type { StoreResponse } from '@/types/store-response';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { reactive, ref, watchEffect } from 'vue';
import { useCurrentUser } from 'vuefire';

export const useAdminStore = defineStore('admin', () => {
	const isLoading = ref(false);
	const user = useCurrentUser();

	const admin = reactive<Admin>({
		uid: '',
		displayName: '',
		email: '',
		photoURL: '/default.jpg',
	});

	async function updateAdmin({
		uid,
		body,
	}: {
		uid: string;
		body: Admin;
	}): Promise<StoreResponse> {
		isLoading.value = true;
		const { data: response } = await useFetch(
			`${import.meta.env.VITE_API_URL}/api/admin/${uid}`,
		)
			.put(body)
			.json<H3Response>();
		isLoading.value = false;
		if (response.value?.statusCode == 200) {
			return {
				status: 'success',
				message: response.value?.message,
				statusMessage: response.value?.statusMessage ?? '',
			};
		}
		return {
			status: 'error',
			message: response.value?.message,
			statusMessage: response.value?.statusMessage ?? '',
		};
	}

	watchEffect(async () => {
		if (user.value) {
			admin.uid = user.value.uid;
			admin.displayName = user.value.displayName || '';
			admin.email = user.value.email || '';
			admin.photoURL = user.value.photoURL || '/default.jpg';
		}
	});

	return {
		isLoading,
		admin,
		updateAdmin,
	};
});
