import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Concern } from '@/types/concern';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
} from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export const useConcernStore = defineStore('concern', () => {
	const db = useFirestore();
	const concerns = ref<Concern[]>([]);
	const isLoading = ref(false);

	async function fetchConcerns() {
		isLoading.value = true;
		const concernSnapshot = await getDocs(collection(db, 'concerns'));
		const result = concernSnapshot.docs.map((doc) => ({
			...doc.data(),
			uid: doc.id,
		}));
		concerns.value = result;
		isLoading.value = false;
	}

	async function addConcern(concern: Concern) {
		isLoading.value = true;
		const concernRef = await addDoc(collection(db, 'concerns'), { concern });
		concerns.value.push({ ...concern, uid: concernRef.id });
		isLoading.value = false;
	}

	async function deleteConcer(uid: string) {
		isLoading.value = true;
		await deleteDoc(doc(db, 'concerns', uid));
		concerns.value = concerns.value.filter((val) => val.uid !== uid);
		isLoading.value = false;
	}

	return {
		concerns,
		deleteConcer,
		fetchConcerns,
		addConcern,
	};
});
