import { useFetch } from '@vueuse/core';
import type { H3Response } from '@/types/h3response';
import camelize from 'camelize';
import type { User } from '@/types/user';

const API_URL = import.meta.env.VITE_API_URL;

export const userRepository = {
	async fetchUser(uid: string) {
		try {
			const { data: response } = await useFetch(`${API_URL}/users/${uid}`).json<
				H3Response<User>
			>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error fetching user:', error);
			return { data: {} };
		}
	},

	async fetchUsers() {
		try {
			const { data: response } = await useFetch(`${API_URL}/users`, {
				refetch: true,
			})
				.get()
				.json<H3Response<User[]>>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error fetching users:', error);
			return { data: [], total: 0 };
		}
	},

	async createUser(userData: User) {
		try {
			const { data: response } = await useFetch(`${API_URL}/users`)
				.post(userData)
				.json<H3Response<User>>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error creating user:', error);
			return { data: {} };
		}
	},

	async updateUser(uid: string, userData: Partial<User>) {
		try {
			const { data: response } = await useFetch(`${API_URL}/users/${uid}`)
				.put(userData)
				.json<H3Response<User>>();
			return camelize(response.value);
		} catch (error) {
			console.error('Error updating user:', error);
			return { data: {} };
		}
	},
};
