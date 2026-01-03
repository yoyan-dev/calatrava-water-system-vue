import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { log } from '../utils/logger';
import { requireAdmin } from '../utils/requireAdmin';
import { auth } from '../config/firebaseAdmin';

export const searchUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		// Validate admin privileges
		requireAdmin(request);

		// Extract and validate data from client
		const { uid, email } = request.data;
		console.log(request.data);
		if (!uid && !email) {
			throw new HttpsError(
				'invalid-argument',
				'Either User ID (uid) or email is required to search for a user.',
			);
		}

		// Search for the user using Admin SDK
		try {
			let userRecord;
			if (uid) {
				userRecord = await auth.getUser(uid);
			} else if (email) {
				userRecord = await auth.getUserByEmail(email);
			}

			if (!userRecord) {
				throw new HttpsError('not-found', 'User not found.');
			}

			log.info(`User ${userRecord.uid} found.`);

			// Return user details
			return {
				uid: userRecord.uid,
				email: userRecord.email,
				emailVerified: userRecord.emailVerified,
				displayName: userRecord.displayName,
				photoURL: userRecord.photoURL,
				disabled: userRecord.disabled,
				createdAt: userRecord.metadata.creationTime,
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
			};
		} catch (error: any) {
			log.error('Error searching for user:', error);
			throw new HttpsError(
				'internal',
				'Error searching for user: ' + error.message,
			);
		}
	},
);
