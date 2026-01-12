import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Faq } from '@/types/faq';
import type { StoreResponse } from '@/types/store-response';
import { faqRepository } from '@/repositories/v2/faqRepository';

export const useFaqStore = defineStore('faq', () => {
	const faqs = ref<Faq[]>([]);
	const totalFaqs = ref(0);
	const isLoading = ref(false);

	async function fetchFaqs() {
		isLoading.value = true;
		const result = await faqRepository.getAll();
		faqs.value = result || [];
		totalFaqs.value = result.length || 0;
		isLoading.value = false;
	}

	async function addFaq(faq: Faq): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await faqRepository.create(faq);
			return {
				status: 'success',
				message: 'Successfully added.',
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

	async function updateFaq(uid: string, faq: Faq): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await faqRepository.update(uid, faq);
			fetchFaqs();
			return {
				status: 'success',
				message: 'Successfully updated!',
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
			const response = await faqRepository.delete(uid);
			fetchFaqs();
			return {
				status: 'success',
				message: 'Successfully deleted!',
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
