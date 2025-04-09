import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { StoreResponse } from '@/types/store-response';
import { useFetch } from '@vueuse/core';
import type { H3Response } from '@/types/h3response';

export const usePaymentStore = defineStore('payment', () => {
	const isLoading = ref(false);

	async function addPayment({
		uid,
		billUid,
		event,
	}: {
		uid: string;
		billUid: string;
		event: any;
	}): Promise<StoreResponse> {
		try {
			isLoading.value = true;
			const file = event.files[0];
			const formData = new FormData();

			formData.append('file', file);
			formData.append('uid', uid);
			formData.append('billUid', billUid);

			const { data: response } = await useFetch(
				`${import.meta.env.VITE_API_URL}/api/payments`,
				{
					method: 'POST',
					body: formData,
				},
			).json<H3Response>();

			if (response.value?.statusCode !== 200) {
				throw new Error(response.value?.statusMessage || 'Network error');
			}

			return {
				status: 'success',
				statusMessage: 'Success',
				message: 'Successfully uploaded receipt.',
			};
		} catch (error: any) {
			console.error('Upload Error:', error);
			return {
				status: 'error',
				statusMessage: 'Error',
				message: error.message || 'Failed to upload receipt.',
			};
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		addPayment,
	};
});
