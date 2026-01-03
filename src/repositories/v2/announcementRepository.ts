import {
	collection,
	addDoc,
	updateDoc,
	doc,
	serverTimestamp,
	deleteDoc,
	getDoc,
	QueryConstraint,
	orderBy,
	where,
	query,
	getDocs,
	Timestamp,
} from 'firebase/firestore';
import { db } from '@/plugins/firebase';
import type { Announcement } from '@/types/announcement';

const ANNOUNCEMENTS_COLLECTION = 'announcements';

class AnnouncementRepository {
	private collection = collection(db, ANNOUNCEMENTS_COLLECTION);

	/** Create a new announcement (draft by default) */
	async create(data: Partial<Announcement>) {
		const docRef = await addDoc(this.collection, {
			...data,
			status: 'DRAFT' as const,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});

		return {
			...data,
			id: docRef.id,
			createdAt: Timestamp.now(),
		} as Announcement;
	}

	/** Update an existing announcement */
	async update(id: string, data: Partial<Announcement>): Promise<void> {
		const docRef = doc(this.collection, id);
		const previousSnapshot = await getDoc(docRef);
		const previousData = previousSnapshot.data() as Announcement | undefined;

		await updateDoc(docRef, {
			...data,
			updatedAt: serverTimestamp(),
		});

		// Detect if status changed to PUBLISHED → trigger push notification
		const wasDraft = previousData?.status === 'DRAFT';
		const nowPublished = data.status === 'PUBLISHED';

		if (wasDraft && nowPublished && data.title && data.content) {
			try {
				await sendAnnouncementPush({
					announcementId: id,
					title: data.title,
					body:
						data.content.slice(0, 100) +
						(data.content.length > 100 ? '...' : ''),
					imageUrl: data.imageUrl || null,
					targetZones: data.targetZones || null,
				});
			} catch (error) {
				console.error('Failed to send push notification:', error);
				// Don't throw — announcement save should not fail due to notification
			}
		}
	}

	/** Soft or hard delete */
	async delete(id: string): Promise<void> {
		const docRef = doc(this.collection, id);
		await deleteDoc(docRef);
	}

	/** Optional: Soft delete by archiving */
	async archive(id: string): Promise<void> {
		await this.update(id, { status: 'ARCHIVED' });
	}

	/** Get single announcement by ID */
	async getById(id: string): Promise<Announcement | null> {
		const docRef = doc(this.collection, id);
		const snapshot = await getDoc(docRef);

		if (!snapshot.exists()) return null;

		return {
			id: snapshot.id,
			...snapshot.data(),
		} as Announcement;
	}

	async getAll(filters?: {
		status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null;
	}): Promise<Announcement[]> {
		const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

		if (filters?.status) {
			constraints.unshift(where('status', '==', filters.status));
		}

		const q = query(this.collection, ...constraints);
		const snapshot = await getDocs(q);

		return snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as Announcement[];
	}
}

export const announcementRepository = new AnnouncementRepository();
