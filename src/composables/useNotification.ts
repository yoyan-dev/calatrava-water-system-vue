import { messaging } from '@/firebase/config';
import { getToken } from 'firebase/messaging';
import { ref } from 'vue';

export default function useNotification() {
	const userToken = ref<string | null>(null);

	async function requestPermission() {
		try {
			userToken.value = await getToken(messaging, {
				vapidKey: import.meta.env.VITE_VAPID_KEY,
			});
		} catch (error) {
			console.error('Error getting permission:', error);
		}
	}

	return { userToken, requestPermission };
}
