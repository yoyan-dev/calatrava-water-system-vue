export interface Consumer {
	id: string; // UUID v4
	userId?: string; // @unique in schema → probably the primary key
	accountNo: string; // required + unique + searchable
	email?: string; // optional
	fullName: string; // required + searchable
	book: string; // required + searchable
	classType: string; // required
	createdAt: string | Date; // Timestamp → usually ISO string or Date
	updatedAt?: string | Date; // optional
}
