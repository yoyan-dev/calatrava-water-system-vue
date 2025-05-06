import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Faq } from '@/types/faq';
import type { StoreResponse } from '@/types/store-response';
import { faqRepository } from '@/repositories/faqRepository';

export const useFaqStore = defineStore('faq', () => {
	const faqs = ref<Faq[]>([]);
	const totalFaqs = ref(0);
	const isLoading = ref(false);

	async function fetchFaqs() {
		isLoading.value = true;
		const response = await faqRepository.fetchFaqs();
		faqs.value = response?.data || [];
		totalFaqs.value = response?.total || 0;
		isLoading.value = false;
	}

	async function addFaq(faq: Faq): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await faqRepository.addFaq(faq);
			return {
				status: 'success',
				message: response?.message,
				statusMessage: response?.statusMessage ?? '',
			};
		} catch (error) {
			console.error('Error adding faq:', error);
			return {
				status: 'error',
				message: 'Failed to add faq',
				statusMessage: 'error',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function updateFaq(faq: Faq): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await faqRepository.editFaq(faq);
			fetchFaqs();
			return {
				status: 'success',
				message: response?.message,
				statusMessage: response?.statusMessage ?? '',
			};
		} catch (error) {
			console.error('Error updating faq:', error);
			return {
				status: 'error',
				message: 'Failed to update faq',
				statusMessage: 'error',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteFaq(uid: string): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await faqRepository.deleteFaq(uid);
			fetchFaqs();
			return {
				status: 'success',
				message: response?.message,
				statusMessage: response?.statusMessage ?? '',
			};
		} catch (error) {
			console.error('Error deleting faq:', error);
			return {
				status: 'error',
				message: 'Failed to delete faq',
				statusMessage: 'error',
			};
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		faqs,
		totalFaqs,
		deleteFaq,
		updateFaq,
		fetchFaqs,
		addFaq,
	};
});
