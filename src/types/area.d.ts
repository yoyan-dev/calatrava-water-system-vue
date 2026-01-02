export interface Area {
	id: string;
	name: string;
	code?: string; // optional unique code, e.g., "ZONE-001"
	description?: string;
	// parentId?: string | null; // for hierarchical areas (e.g., barangay → municipality)
	// consumerCount?: number; // optional cached count
	isActive: boolean;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}
