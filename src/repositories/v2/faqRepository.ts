import { db } from '@/plugins/firebase';
import type { Faq } from '@/types/faq';
import {
	addDoc,
	collection,
	doc,
	updateDoc,
	deleteDoc,
	getDocs,
	getDoc,
	query,
	orderBy,
	serverTimestamp,
} from 'firebase/firestore';

const COLLECTION = 'faqs';

class FAQRepository {
	private collectionRef = collection(db, COLLECTION);

	// Create
	async create(data: Partial<Faq>): Promise<Faq> {
		const docRef = await addDoc(this.collectionRef, {
			...data,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});

		return {
			...data,
			id: docRef.id,
			createdAt: new Date(), // client-side approximation
			updatedAt: new Date(),
		} as Faq;
	}

	// Update
	async update(id: string, data: Partial<Faq>): Promise<void> {
		const docRef = doc(db, COLLECTION, id);

		await updateDoc(docRef, {
			...data,
			updatedAt: serverTimestamp(),
		});
	}

	// Delete
	async delete(id: string): Promise<void> {
		const docRef = doc(db, COLLECTION, id);
		await deleteDoc(docRef);
	}

	// Get one by ID
	async getById(id: string): Promise<Faq | null> {
		const docRef = doc(db, COLLECTION, id);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			return null;
		}

		return {
			id: docSnap.id,
			...docSnap.data(),
		} as Faq;
	}

	// Get all (most common version - ordered by createdAt descending)
	async getAll(): Promise<Faq[]> {
		const q = query(this.collectionRef, orderBy('createdAt', 'desc'));

		const querySnapshot = await getDocs(q);

		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as Faq[];
	}
}

export const faqRepository = new FAQRepository();
