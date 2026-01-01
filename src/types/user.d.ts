export interface User {
	uid?: string;
	email?: string;
	password?: string;
	disabled?: boolean;
	displayName?: string;
	customClaims?: { [key: string]: any };
	createdAt?: string;
}

export interface UserFirestore {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	role: 'user' | 'admin' | 'staff'; // Adjust roles as needed
	createdAt: Timestamp;
	updatedAt?: Timestamp;
}

export interface InsertUser {
	email: string;
	password: string;
	displayName: string;
	customClaims: { [key: string]: any };
}
