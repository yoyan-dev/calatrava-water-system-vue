import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { InsertUser, User } from '@/types/user';
import { userRepository } from '@/repositories/v2/userRepository';
import type { StoreResponse } from '@/types/store-response';

export const useUserStore = defineStore('user', () => {
	const users = ref<User[]>([]);

	// actions
	async function addUser(userData: InsertUser): Promise<StoreResponse> {
		try {
			const response = await userRepository.createUser(userData);
			if (response) {
				users.value.unshift({
					...(response as User),
					customClaims: userData.customClaims,
				});
			}

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
		}
	}

	async function updateUser(
		uid: string,
		updateData: Partial<InsertUser>,
	): Promise<StoreResponse> {
		try {
			const response = await userRepository.updateUser(uid, updateData);
			if (response) {
				const index = users.value.findIndex((user) => user.uid === uid);
				if (index !== -1) {
					users.value[index] = {
						...users.value[index],
						...(response as User),
						customClaims:
							updateData.customClaims || users.value[index].customClaims,
					};
				}
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
		}
	}

	async function deleteUser(uid: string): Promise<StoreResponse> {
		try {
			await userRepository.deleteUser(uid);
			users.value = users.value.filter((user) => user.uid !== uid);

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
		}
	}

	async function fetchPaginatedUsers() {
		try {
			const response = await userRepository.getPaginatedUsers(10);
			if (response && response.data) {
				users.value = response.data;
			}
		} catch (error) {
			console.error('Error fetching paginated users:', error);
		}
	}

	return {
		users,

		addUser,
		updateUser,
		deleteUser,
		fetchPaginatedUsers,
	};
});
