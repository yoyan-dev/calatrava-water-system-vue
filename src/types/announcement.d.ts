export interface Announcement {
	id: string;
	title: string;
	content: string;
	status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
	priority: 'NORMAL' | 'IMPORTANT' | 'CRITICAL';
	targetBooks?: string[] | null;
	targetZones?: string[] | null;

	imageUrl?: string | null;
	attachmentUrls?: string[] | null;

	publishedAt: string | null; // ISO string, e.g. "2025-12-12T10:00:00Z"
	expiresAt: string | null; // ISO string or null

	createdBy: string;
	createdAt: Timestamp;
	updatedAt?: Timestamp;
}
