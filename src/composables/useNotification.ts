import { messaging } from '@/plugins/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getToken } from 'firebase/messaging';
import { ref } from 'vue';
import { useFirestore } from 'vuefire';

export default function useNotification() {
	const db = useFirestore();
	const userToken = ref<string | null>(null);

	async function requestPermission(uid: string) {
		try {
			const permission = await Notification.requestPermission();

			if (permission !== 'granted') {
				throw new Error('Permission not granted for Notification');
			}
			console.log('Notification permission granted.');
			userToken.value = await getToken(messaging, {
				vapidKey: import.meta.env.VITE_VAPID_KEY,
			});
			console.log('token', userToken.value);
			await setDoc(
				doc(db, 'residents', uid),
				{
					notificationToken: userToken.value,
				},
				{ merge: true },
			);
		} catch (error) {
			console.error('Error getting permission:', error);
		}
	}

	return { userToken, requestPermission };
}
