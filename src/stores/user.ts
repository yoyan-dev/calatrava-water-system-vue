import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { InsertUser, User, UserFirestore } from '@/types/user';
import { userRepository } from '@/repositories/v2/userRepository';
import type { StoreResponse } from '@/types/store-response';

export const useUserStore = defineStore('user', () => {
	const users = ref<User[]>([]);
	const nextPageToken = ref<string | null>(null);
	const hasMore = ref(false);
	const isLoading = ref(false);
	const isLoadingMore = ref(false);

	const userSearch = ref<User | null>(null);
	const systemUsers = ref<UserFirestore[]>([]);

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

	async function loadInitialUsers(pageSize = 15) {
		if (isLoading.value) return;
		isLoading.value = true;

		try {
			const {
				users: newUsers,
				nextPageToken: token,
				hasMore: more,
			} = await userRepository.getUsersPage(pageSize);

			users.value = newUsers;
			nextPageToken.value = token;
			hasMore.value = more;
		} catch (err) {
			console.error(err);
		} finally {
			isLoading.value = false;
		}
	}

	async function loadMore(pageSize = 15) {
		if (!hasMore.value || isLoadingMore.value) return;
		isLoadingMore.value = true;

		try {
			const {
				users: newUsers,
				nextPageToken: token,
				hasMore: more,
			} = await userRepository.getUsersPage(pageSize, nextPageToken.value);

			users.value = [...users.value, ...newUsers];
			nextPageToken.value = token;
			hasMore.value = more;
		} catch (err) {
			console.error(err);
		} finally {
			isLoadingMore.value = false;
		}
	}

	async function fetchSystemUsers() {
		try {
			const response = await userRepository.getSystemUsers();
			if (response) {
				systemUsers.value = response.data;
			}
		} catch (error) {
			console.error('Error fetching paginated users:', error);
		}
	}

	async function searchUser(payload: { uid: string } | { email: string }) {
		try {
			const response = await userRepository.searchUser(payload);
			if (response) {
				userSearch.value = response;
				return true;
			}
		} catch (error) {
			console.error('Error finding users:', error);
		}
	}

	return {
		users,
		userSearch,
		systemUsers,
		hasMore,
		isLoading,
		isLoadingMore,

		loadInitialUsers,
		loadMore,

		addUser,
		updateUser,
		deleteUser,
		fetchSystemUsers,
		searchUser,
	};
});
