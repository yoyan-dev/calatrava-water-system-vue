import { messaging } from '@/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { getToken } from 'firebase/messaging';
import { ref } from 'vue';
import { useFirestore } from 'vuefire';

export default function useNotification() {
	const db = useFirestore();
	const userToken = ref<string | null>(null);

	async function requestPermission(uid: string) {
		try {
			userToken.value = await getToken(messaging, {
				vapidKey: import.meta.env.VITE_VAPID_KEY,
			});
			await updateDoc(doc(db, 'residents', uid), {
				notificationToken: userToken.value,
			});
		} catch (error) {
			console.error('Error getting permission:', error);
		}
	}

	return { userToken, requestPermission };
}
