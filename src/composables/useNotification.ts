import { messaging } from '@/firebase/config';
import { getToken } from 'firebase/messaging';
import { ref } from 'vue';

export default function useNotification() {
	const userToken = ref<string | null>(null);

	async function requestPermission() {
		try {
			console.log('Requesting notification permission...');
			const permission = await Notification.requestPermission();

			if (permission === 'granted') {
				// ✅ Register the compiled service worker (JS)
				const registration = await navigator.serviceWorker.register(
					'/firebase-messaging-sw.js',
				);

				// ✅ Get FCM token using the registered service worker
				userToken.value = await getToken(messaging, {
					vapidKey:
						'BG9_5A9rSusMQuyCl0GGFNKDMc4qt7BA0vgDadYrhntzK0XN5jvHOwPez3uyBRqvDRK6fuVOAgVMM8F9qYUoWFY',
					serviceWorkerRegistration: registration,
				});

				console.log('FCM Token:', userToken.value);
			} else {
				console.warn('Notification permission denied');
			}
		} catch (error) {
			console.error('Error getting permission:', error);
		}
	}

	return { userToken, requestPermission };
}
