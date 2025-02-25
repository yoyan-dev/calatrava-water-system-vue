import { defineStore } from 'pinia';
import { useFirebaseStorage, useFirestore } from 'vuefire';
import { useStorageFile } from 'vuefire';
import { getStorage, ref as storageRef } from 'firebase/storage';
import { ref } from 'vue';
import { collection, doc, updateDoc } from 'firebase/firestore';
import type { StoreResponse } from '@/types/store-response';

export const usePaymentStore = defineStore('payment', () => {
	const storage = useFirebaseStorage();
	const isLoading = ref(false);
	const db = useFirestore();

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
			console.log(url);

			const billDocRef = doc(
				collection(db, `residents/${uid}/billings`),
				billUid,
			);

			await updateDoc(billDocRef, {
				paymentReceipt: url,
				status: 'inprogress',
			});
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully uploaded.',
			};
		} catch (error: any) {
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Error failed to upload image.',
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
