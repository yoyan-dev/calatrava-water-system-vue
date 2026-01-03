import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { log } from '../utils/logger';
import { requireAdmin } from '../utils/requireAdmin';
import { auth } from '../config/firebaseAdmin';

export const listUsers = onCall({ enforceAppCheck: false }, async (request) => {
	// Validate admin privileges
	requireAdmin(request);

	// Extract pagination parameters
	const pageSize = Math.min(request.data.pageSize || 10, 100); // Max 100
	const pageToken = request.data.pageToken || undefined;

	// List users using Admin SDK
	try {
		const listUsersResult = await auth.listUsers(pageSize, pageToken);

		const users = listUsersResult.users.map((userRecord) => ({
			uid: userRecord.uid,
			email: userRecord.email,
			emailVerified: userRecord.emailVerified,
			displayName: userRecord.displayName,
			photoURL: userRecord.photoURL,
			disabled: userRecord.disabled,
			metadata: {
				creationTime: userRecord.metadata.creationTime,
				lastSignInTime: userRecord.metadata.lastSignInTime,
				lastRefreshTime: userRecord.metadata.lastRefreshTime,
			},
			providerData: userRecord.providerData.map((provider) => ({
				providerId: provider.providerId,
				email: provider.email,
				displayName: provider.displayName,
				photoURL: provider.photoURL,
			})),
			customClaims: userRecord.customClaims || {},
		}));

		log.info(`Fetched ${users.length} users (pageSize: ${pageSize})`);

		// Return users and next page token
		return {
			users,
			nextPageToken: listUsersResult.pageToken || null,
			pageSize: users.length,
			hasMore: !!listUsersResult.pageToken,
		};
	} catch (error: any) {
		log.error('Error listing users:', error);
		throw new HttpsError('internal', 'Error listing users: ' + error.message);
	}
});
