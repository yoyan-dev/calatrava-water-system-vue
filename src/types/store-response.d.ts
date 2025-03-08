export interface StoreResponse<T = any> {
	status?: severity;
	statusMessage?: string;
	message?: string;
	data?: T;
	success?: boolean;
}

type severity =
	| 'success'
	| 'error'
	| 'info'
	| 'warn'
	| 'secondary'
	| 'contrast'
	| undefined;
