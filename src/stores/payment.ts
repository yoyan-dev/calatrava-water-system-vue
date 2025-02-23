import { defineStore } from 'pinia';
import { useFirebaseStorage, useFirestore } from 'vuefire';
import { useStorageFile } from 'vuefire';
import { getStorage, ref as storageRef } from 'firebase/storage';
import { ref } from 'vue';
import { collection, doc, updateDoc } from 'firebase/firestore';

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
	}) {
		try {
			isLoading.value = true;
			const file = event.files[0];
			const fileRef = storageRef(storage, `payments/${file.name}`);
			const { upload, url } = useStorageFile(fileRef);
			await upload(file);

			const billDocRef = doc(
				collection(db, `residents/${uid}/billings`),
				billUid,
			);

			await updateDoc(billDocRef, {
				paymentReceipt: url,
			});
		} catch (error: any) {
			console.log(error);
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		addPayment,
	};
});
