// utils/dataConnectError.ts
type DataConnectError = {
	message: string;
	extensions?: {
		code?: string;
		debugDetails?: string;
	};
};

export function formatDataConnectError(errors?: DataConnectError[]) {
	if (!errors?.length) {
		return {
			status: 'error' as const,
			message: 'Error Data-connect SQL query.',
		};
	}

	const err = errors[0];

	// ---- 1. Duplicate account_no -------------------------------------------------
	if (err.extensions?.code === 'ALREADY_EXISTS') {
		// Try to pull the duplicate value from the debug string (optional)
		const match = err.extensions.debugDetails?.match(
			/\(account_no\)=\(([^)]+)\)/,
		);
		const duplicate = match?.[1] ?? 'this account number';

		return {
			status: 'error' as const,
			message: `ALREADY_EXISTS! Check details for duplicates entry.`,
		};
	}

	// ---- 2. Other known codes ----------------------------------------------------
	if (err.extensions?.code === 'INVALID_ARGUMENT') {
		return {
			status: 'error' as const,
			message: 'Invalid data please check the fields and try again.',
		};
	}

	// ---- 3. Fallback -------------------------------------------------------------
	return {
		status: 'error' as const,
		message: err.message || 'Error Data-connect SQL query.',
	};
}
