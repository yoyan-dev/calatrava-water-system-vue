import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types/user';
import type { StoreResponse } from '@/types/store-response';
import { watchDebounced } from '@vueuse/core';
import { userRepository } from '@/repositories/v1/userRepository';
import { useFetch } from '@vueuse/core';

const API_URL = import.meta.env.VITE_API_URL;

export const useUserStore = defineStore('user-old', () => {
	const users = ref<User[]>([]);
	const user = ref<User>();
	const isLoading = ref(false);
	const totalUsers = ref(0);
	const searchQuery = ref('');
	const page = ref(0);

	// getters
	const offset = computed(() => page.value * 10);

	async function fetchUsers() {
		isLoading.value = true;
		const response = await userRepository.fetchUsers();
		users.value = response?.data || [];
		totalUsers.value = response?.total || 0;
		isLoading.value = false;
	}

	async function fetchUser(uid: string) {
		isLoading.value = true;
		const response = await userRepository.fetchUser(uid);
		user.value = response?.data;
		isLoading.value = false;
	}

	async function addUser(userData: User): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const exists = users.value.some(
				(item: User) => item.email === userData.email,
			);

			if (exists) {
				return {
					status: 'error',
					statusMessage: 'Duplicate email',
					message: 'The email already exists.',
				};
			}

			const response = await userRepository.createUser(userData);
			users.value.push({
				...(response?.data as User),
				customClaims: userData.customClaims,
			});

			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully added user',
			};
		} catch (error: any) {
			console.log(error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteUser(uid: string): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			await useFetch(`${API_URL}/users/${uid}`).delete();

			users.value = users.value.filter((val) => val.uid !== uid);

			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully deleted user',
			};
		} catch (error: any) {
			console.log(error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteUsers(uids: string[]): Promise<StoreResponse> {
		isLoading.value = true;

		try {
			for (const uid of uids) {
				await useFetch(`${API_URL}/users/${uid}`).delete();
			}
			users.value = users.value.filter((val) => !uids.includes(val.uid ?? ''));
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully deleted users',
			};
		} catch (error) {
			console.error('Error deleting users:', error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function updateUser(
		uid: string,
		userData: User,
	): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const response = await userRepository.updateUser(uid, userData);
			const resultIndex = users.value.findIndex((item) => item.uid === uid);

			if (resultIndex !== -1) {
				// Full replacement with API data, then overlay custom claims
				users.value[resultIndex] = {
					...response?.data,
					customClaims: {
						...userData.customClaims,
					}, // Merge if API doesn't update claims
				};
			} else {
				console.warn('User not found in store for update:', uid);
			}

			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully updated user',
			};
		} catch (error: any) {
			console.log(error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	watchDebounced(
		[searchQuery, offset],
		() => {
			fetchUsers();
		},
		{ debounce: 300 },
	);

	return {
		users,
		user,
		isLoading,
		totalUsers,
		searchQuery,
		page,
		fetchUser,
		fetchUsers,
		addUser,
		deleteUser,
		deleteUsers,
		updateUser,
	};
});
