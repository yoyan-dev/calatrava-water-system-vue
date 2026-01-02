import { defineStore } from 'pinia';
import { areaRepository } from '@/repositories/v2/areaRepository';
import { ref } from 'vue';
import type { Area } from '@/types/area';
import { auth } from '@/plugins/firebase';

export const useAreaStore = defineStore('area', () => {
	const areas = ref<Area[]>([]);

	/** Fetch all areas with optional filters */
	const fetchAreas = async (filters?: {
		isActive?: boolean;
		parentId?: string | null;
	}) => {
		const data = await areaRepository.getAll(filters);
		areas.value = data;
	};

	/** Create a new area */
	const createArea = async (
		data: Omit<Area, 'id' | 'createdAt' | 'updatedAt'>,
	) => {
		if (auth.currentUser) {
			// Optional: track who created it (add createdBy field to your Area type if needed)
			// data.createdBy = auth.currentUser.uid;
		}

		const result = await areaRepository.create(data);
		areas.value.unshift(result); // Add to top of list
	};

	/** Update an existing area */
	const updateArea = async (
		id: string,
		data: Partial<Pick<Area, 'name' | 'code' | 'description' | 'isActive'>>,
	) => {
		await areaRepository.update(id, data);

		const index = areas.value.findIndex((item) => item.id === id);
		if (index > -1) {
			Object.assign(areas.value[index], data);
		}
	};

	/** Delete (hard delete) an area */
	const deleteArea = async (id: string) => {
		await areaRepository.delete(id);

		// Instantly remove from local state
		areas.value = areas.value.filter((area) => area.id !== id);
	};

	/** Deactivate an area (soft delete) */
	const deactivateArea = async (id: string) => {
		await areaRepository.deactivate(id);

		const index = areas.value.findIndex((area) => area.id === id);
		if (index !== -1) {
			areas.value[index].isActive = false;
			// Ensure reactivity
			areas.value = [...areas.value];
		}
	};

	/** Reactivate a deactivated area */
	const activateArea = async (id: string) => {
		await areaRepository.activate(id);

		const index = areas.value.findIndex((area) => area.id === id);
		if (index !== -1) {
			areas.value[index].isActive = true;
			areas.value = [...areas.value];
		}
	};

	/** Get a single area by ID (fetches from Firestore if not in local state) */
	const getAreaById = async (id: string): Promise<Area | null> => {
		// Optional: check local cache first
		const cached = areas.value.find((a) => a.id === id);
		if (cached) return cached;

		return await areaRepository.getById(id);
	};

	/** Convenience: Fetch only active areas */
	const fetchActiveAreas = async () => {
		await fetchAreas({ isActive: true });
	};

	/** Fetch root areas (no parent) */
	const fetchRootAreas = async () => {
		await fetchAreas({ parentId: null, isActive: true });
	};

	/** Fetch children of a specific parent */
	const fetchChildren = async (parentId: string) => {
		await fetchAreas({ parentId, isActive: true });
	};

	return {
		areas,

		fetchAreas,
		fetchActiveAreas,
		fetchRootAreas,
		fetchChildren,

		createArea,
		updateArea,
		deleteArea,
		deactivateArea,
		activateArea,
		getAreaById,
	};
});
