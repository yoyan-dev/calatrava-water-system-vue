export interface RepositoryResponse<T = any> {
	status?: severity;
	message: string;
	data?: T;
}

type severity =
	| 'success'
	| 'error'
	| 'info'
	| 'warn'
	| 'secondary'
	| 'contrast'
	| undefined;
