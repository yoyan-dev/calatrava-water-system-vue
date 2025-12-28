export interface User {
	uid?: string;
	email?: string;
	password?: string;
	disabled?: boolean;
	displayName?: string;
	customClaims?: { [key: string]: any };
	createdAt?: string;
}

export interface InsertUser {
	email: string;
	password: string;
	displayName: string;
	customClaims: { [key: string]: any };
}
