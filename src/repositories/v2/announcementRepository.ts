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
import { db, storage } from '@/plugins/firebase';
import type { Announcement } from '@/types/announcement';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/plugins/firebase';
import {
	getDownloadURL,
	ref as storageRef,
	uploadBytes,
} from 'firebase/storage';

const ANNOUNCEMENTS_COLLECTION = 'announcements';

class AnnouncementRepository {
	private collection = collection(db, ANNOUNCEMENTS_COLLECTION);

	// Move callable outside the method (better performance + cleaner)
	private sendAnnouncementPush = httpsCallable(
		functions,
		'sendAnnouncementPush',
	);

	/** Helper: Upload image if a File is provided, return URL string */
	private async uploadImageIfNeeded(
		image: File | string | null | undefined,
		basePath: string = 'announcements/images',
	): Promise<string | null> {
		if (!image) return null;

		// If it's already a URL string (edit mode), skip upload
		if (typeof image === 'string') {
			return image;
		}

		// It's a File → upload it
		if (image instanceof File) {
			if (!image.type.startsWith('image/')) {
				throw new Error('Selected file must be an image');
			}

			if (image.size > 10 * 1024 * 1024) {
				throw new Error('Image must be less than 10MB');
			}

			try {
				const timestamp = Date.now();
				const random = Math.random().toString(36).substring(2, 8);
				const ext = image.name.split('.').pop()?.toLowerCase() || 'jpg';
				const fileName = `${timestamp}_${random}.${ext}`;

				// Organized path: announcements/images/2026/01/filename.jpg
				const year = new Date().getFullYear();
				const month = String(new Date().getMonth() + 1).padStart(2, '0');
				const filePath = `${basePath}/${year}/${month}/${fileName}`;

				const imageRef = storageRef(storage, filePath);
				const snapshot = await uploadBytes(imageRef, image, {
					contentType: image.type,
					// Optional: add metadata
					// customMetadata: { uploadedBy: auth.currentUser?.uid || 'unknown' },
				});

				return await getDownloadURL(snapshot.ref);
			} catch (error) {
				console.log(error);
			}
		}

		return null;
	}

	/** Create a new announcement (draft by default) */
	async create(
		data: Partial<Announcement> & {
			imageFile?: File | null; // Temporary field for upload
		},
	): Promise<Announcement> {
		let imageUrl: string | null = null;

		// Handle image upload if a File was provided
		if (data.imageFile) {
			imageUrl = await this.uploadImageIfNeeded(data.imageFile);
		} else if (data.imageUrl && typeof data.imageUrl === 'string') {
			imageUrl = data.imageUrl; // Keep existing URL (shouldn't happen on create)
		}

		// Clean up temporary field
		const { imageFile, ...cleanData } = data;

		const docRef = await addDoc(this.collection, {
			...cleanData,
			imageUrl,
			status: 'DRAFT' as const,
			createdAt: serverTimestamp(),
		});

		return {
			...cleanData,
			id: docRef.id,
			imageUrl,
			createdAt: Timestamp.now(),
		} as Announcement;
	}

	/** Update an existing announcement */
	async update(
		id: string,
		data: Partial<Announcement> & {
			imageFile?: File | null; // Optional: for new image upload
		},
	): Promise<void> {
		const docRef = doc(this.collection, id);

		// Fetch previous state to detect status transition
		const previousSnapshot = await getDoc(docRef);
		if (!previousSnapshot.exists()) {
			throw new Error('Announcement not found');
		}

		const previousData = previousSnapshot.data() as Announcement;

		let finalImageUrl: string | null | undefined = data.imageUrl;

		// Handle new image upload (if File provided)
		if (data.imageFile) {
			finalImageUrl = await this.uploadImageIfNeeded(data.imageFile);
		}

		// Prepare clean update payload
		const { imageFile, ...cleanData } = data;

		const updatePayload: any = {
			...cleanData,
			...(finalImageUrl !== undefined && { imageUrl: finalImageUrl }),
			updatedAt: serverTimestamp(),
		};

		// Perform the update
		await updateDoc(docRef, updatePayload);

		// === Push Notification Logic (only on DRAFT → PUBLISHED transition) ===
		const wasDraft = previousData.status === 'DRAFT';
		const nowPublished = cleanData.status === 'PUBLISHED';

		if (wasDraft && nowPublished) {
			// Use the latest values (prefer updated ones, fallback to previous)
			const title = cleanData.title ?? previousData.title;
			const content = cleanData.content ?? previousData.content;

			if (!title || !content) {
				console.warn(
					'Cannot send push: missing title or content after publish',
				);
				return;
			}

			try {
				await this.sendAnnouncementPush({
					announcementId: id,
					title,
					body: content.slice(0, 100) + (content.length > 100 ? '...' : ''),
					imageUrl: finalImageUrl ?? previousData.imageUrl ?? null,
					targetZones:
						cleanData.targetZones ?? previousData.targetZones ?? null,
				});
			} catch (error) {
				console.error('Failed to send push notification:', error);
				// Non-critical: don't fail the update
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
