export interface User {
	uid?: string;
	email?: string;
	password?: string;
	displayName?: string;
	customClaims?: { [key: string]: any };
}

export interface InsertUser {
	email: string;
	password: string;
	displayName: string;
	customClaims: { [key: string]: any };
}
