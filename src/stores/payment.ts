import { defineStore } from 'pinia';
import { useFirebaseStorage, useFirestore, useStorageFile } from 'vuefire';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { ref } from 'vue';
import { doc, setDoc } from 'firebase/firestore';
import type { StoreResponse } from '@/types/store-response';

export const usePaymentStore = defineStore('payment', () => {
	const storage = useFirebaseStorage();
	const db = useFirestore();
	const isLoading = ref(false);

	async function addPayment({
		uid,
		billUid,
		event,
	}: {
		uid: string;
		billUid: string;
		event: any;
	}): Promise<StoreResponse> {
		try {
			isLoading.value = true;

			const file = event.files[0];
			const fileRef = storageRef(storage, `payments/${file.name}`);
			const { upload, url } = useStorageFile(fileRef);

			await upload(file);

			let downloadUrl = url.value;
			if (!downloadUrl) {
				downloadUrl = await getDownloadURL(fileRef);
			}

			if (!downloadUrl) {
				throw new Error('Failed to retrieve uploaded file URL.');
			}

			const billDocRef = doc(db, `residents/${uid}/billings/${billUid}`);

			await setDoc(
				billDocRef,
				{
					paymentReceipt: downloadUrl,
					status: 'inprogress',
				},
				{ merge: true },
			);

			return {
				status: 'success',
				statusMessage: 'Success',
				message: 'Successfully uploaded receipt.',
			};
		} catch (error: any) {
			console.error('Upload Error:', error);
			return {
				status: 'error',
				statusMessage: 'Error',
				message: error.message || 'Failed to upload receipt.',
			};
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		addPayment,
	};
});
