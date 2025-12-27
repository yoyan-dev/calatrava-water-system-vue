import { defineStore } from 'pinia';
import { auth } from '@/plugins/firebase';
import { ref } from 'vue';
import { signInWithEmailAndPassword, type User } from 'firebase/auth';
import { consumerRepository } from '@/repositories/v2/consumerRepository';

export const useAuthStore = defineStore('auth', () => {
	// state'
	const authUser = ref<User | null>(null);

	// actions
	async function login(userData: { email: string; password: string }) {
		try {
			const credential = await signInWithEmailAndPassword(
				auth,
				userData.email,
				userData.password,
			);
			authUser.value = credential.user;
			return credential.user;
		} catch (error) {
			console.error('Login error:', error);
		}
	}

	async function checkAccountNo(accountNo: string) {
		try {
			// Call on repository to check account number
			const response = await consumerRepository.checkAccountNo(accountNo);
			return response;
		} catch (error) {}
	}

	return { authUser, login };
});
