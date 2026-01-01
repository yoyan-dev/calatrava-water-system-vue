import { HttpsError } from 'firebase-functions/v2/https';
import { CallableRequest } from 'firebase-functions/v2/https';

export function requireAdmin(request: CallableRequest<any>) {
	if (!request.auth) {
		throw new HttpsError('unauthenticated', 'You must be logged in.');
	}
	if (request.auth.token.role !== 'admin') {
		throw new HttpsError(
			'permission-denied',
			'Only admins can perform this action.',
		);
	}
}
