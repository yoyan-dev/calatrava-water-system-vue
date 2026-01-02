import {
	collection,
	addDoc,
	updateDoc,
	doc,
	serverTimestamp,
	deleteDoc,
	getDoc,
	getDocs,
	query,
	where,
	orderBy,
	QueryConstraint,
	Timestamp,
} from 'firebase/firestore';
import { db } from '@/plugins/firebase';
import type { Area } from '@/types/area';

const AREAS_COLLECTION = 'areas';

class AreaRepository {
	private collectionRef = collection(db, AREAS_COLLECTION);

	/** Create a new area */
	async create(
		data: Omit<Area, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<Area> {
		const docRef = await addDoc(this.collectionRef, {
			...data,
			createdAt: serverTimestamp(),
		});

		return {
			...data,
			id: docRef.id,
			createdAt: Timestamp.now(),
		} as Area;
	}

	/** Update an existing area */
	async update(
		id: string,
		data: Partial<Pick<Area, 'name' | 'code' | 'description' | 'isActive'>>,
	): Promise<void> {
		const docRef = doc(this.collectionRef, id);

		await updateDoc(docRef, {
			...data,
			updatedAt: serverTimestamp(),
		});
	}

	/** Hard delete an area */
	async delete(id: string): Promise<void> {
		const docRef = doc(this.collectionRef, id);
		await deleteDoc(docRef);
	}

	/** Soft delete by deactivating */
	async deactivate(id: string): Promise<void> {
		await this.update(id, { isActive: false });
	}

	/** Reactivate a deactivated area */
	async activate(id: string): Promise<void> {
		await this.update(id, { isActive: true });
	}

	/** Get single area by ID */
	async getById(id: string): Promise<Area | null> {
		const docRef = doc(this.collectionRef, id);
		const snapshot = await getDoc(docRef);

		if (!snapshot.exists()) return null;

		return {
			id: snapshot.id,
			...snapshot.data(),
		} as Area;
	}

	/** Get all areas with optional filters */
	async getAll(filters?: {
		isActive?: boolean;
		parentId?: string | null;
	}): Promise<Area[]> {
		const constraints: QueryConstraint[] = [orderBy('name', 'asc')];

		if (filters?.isActive !== undefined) {
			constraints.unshift(where('isActive', '==', filters.isActive));
		}

		if (filters?.parentId !== undefined) {
			if (filters.parentId === null) {
				constraints.unshift(where('parentId', '==', null));
			} else {
				constraints.unshift(where('parentId', '==', filters.parentId));
			}
		}

		const q = query(this.collectionRef, ...constraints);
		const snapshot = await getDocs(q);

		return snapshot.docs.map((docSnap) => ({
			id: docSnap.id,
			...docSnap.data(),
		})) as Area[];
	}

	/** Get only active areas (commonly used) */
	async getActiveAreas(): Promise<Area[]> {
		return this.getAll({ isActive: true });
	}

	/** Get root areas (no parent) - useful for top-level zones */
	async getRootAreas(): Promise<Area[]> {
		return this.getAll({ parentId: null, isActive: true });
	}

	/** Get child areas of a parent */
	async getChildren(parentId: string): Promise<Area[]> {
		return this.getAll({ parentId, isActive: true });
	}
}

export const areaRepository = new AreaRepository();
