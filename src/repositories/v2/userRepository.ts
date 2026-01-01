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

	async getPaginatedUsers(pageSize: number, pageToken?: string) {
		const listUsers = httpsCallable(functions, 'listUsers');
		do {
			try {
				const result = await listUsers({ pageSize, pageToken });
				const data = result.data as {
					users: any[];
					pageToken?: string;
				};

				pageToken = data.pageToken;
				return {
					data: data.users,
					pageToken: data.pageToken,
				};
			} catch (error) {
				console.error('Error listing users:', error);
				break;
			}
		} while (pageToken);
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
