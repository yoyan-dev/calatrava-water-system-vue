import type { InsertUser } from '@/types/user';
import { functions } from '@/plugins/firebase';
import { httpsCallable } from 'firebase/functions';

class UserRepository {
	async createUser(userData: InsertUser) {
		try {
			const createUser = httpsCallable(functions, 'createUser');
			const result = await createUser(userData);
			return result.data;
		} catch (error) {
			console.error('Error creating user:', error);
			throw error;
		}
	}

	async updateUser(uid: string, updateData: Partial<InsertUser>) {
		try {
			const updateUser = httpsCallable(functions, 'updateUser');
			const result = await updateUser({ uid, ...updateData });
			return result.data;
		} catch (error) {
			console.error('Error updating user:', error);
			throw error;
		}
	}

	async deleteUser(uid: string) {
		try {
			const deleteUser = httpsCallable(functions, 'deleteUser');
			const result = await deleteUser({ uid });
			return result.data;
		} catch (error) {
			console.error('Error deleting user:', error);
			throw error;
		}
	}

	async getUsersPage(pageSize: number, pageToken?: string | null) {
		const listUsers = httpsCallable(functions, 'listUsers');

		const result = await listUsers({ pageSize, pageToken });
		const data = result.data as {
			users: any[];
			nextPageToken: string | null;
			hasMore: boolean;
		};

		return {
			users: data.users,
			nextPageToken: data.nextPageToken,
			hasMore: data.hasMore,
		};
	}

	async getSystemUsers() {
		const getSystemUsers = httpsCallable(functions, 'getSystemUsers');
		try {
			const result = await getSystemUsers();
			const data = result.data as {
				users: any[];
			};

			return {
				data: data.users,
			};
		} catch (error) {
			console.error('Error listing system users:', error);
		}
	}

	async searchUser(payload: { uid: string } | { email: string }) {
		try {
			const searchUser = httpsCallable(functions, 'searchUser');
			const result = await searchUser(payload);
			return result.data;
		} catch (error) {
			console.error('Error searching user:', error);
			throw error;
		}
	}
}

export const userRepository = new UserRepository();
