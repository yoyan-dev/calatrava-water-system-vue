import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Coordinate } from '@/types/coordinate';
import type { StoreResponse } from '@/types/store-response';
import { coordinateRepository } from '@/repositories/coordinateRepository';

export const useCoordinateStore = defineStore('coordinate', () => {
	const coordinates = ref<Coordinate[]>([]);
	const totalCoordinates = ref(0);
	const isLoading = ref(false);

	async function fetchCoordinates() {
		isLoading.value = true;
		const response = await coordinateRepository.fetchCoordinates();
		coordinates.value = response?.data || [];
		totalCoordinates.value = response?.total || 0;
		isLoading.value = false;
	}

	async function addCoordinate(coordinate: Coordinate): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await coordinateRepository.addCoordinate(coordinate);
			return {
				status: 'success',
				message: response?.message,
				statusMessage: response?.statusMessage ?? '',
			};
		} catch (error) {
			console.error('Error adding coordinate:', error);
			return {
				status: 'error',
				message: 'Failed to add coordinate',
				statusMessage: 'error',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function updateCoordinate(
		uid: string,
		coordinate: Coordinate,
	): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await coordinateRepository.editCoordinate(
				uid,
				coordinate,
			);
			fetchCoordinates();
			return {
				status: 'success',
				message: response?.message,
				statusMessage: response?.statusMessage ?? '',
			};
		} catch (error) {
			console.error('Error updating coordinate:', error);
			return {
				status: 'error',
				message: 'Failed to update coordinate',
				statusMessage: 'error',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteCoordinate(uid: string): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await coordinateRepository.deleteCoordinate(uid);
			fetchCoordinates();
			return {
				status: 'success',
				message: response?.message,
				statusMessage: response?.statusMessage ?? '',
			};
		} catch (error) {
			console.error('Error deleting coordinate:', error);
			return {
				status: 'error',
				message: 'Failed to delete coordinate',
				statusMessage: 'error',
			};
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		coordinates,
		totalCoordinates,
		deleteCoordinate,
		updateCoordinate,
		fetchCoordinates,
		addCoordinate,
	};
});
