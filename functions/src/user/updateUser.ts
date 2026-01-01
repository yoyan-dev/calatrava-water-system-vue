import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { getAuth } from 'firebase-admin/auth';
import { log } from '../utils/logger';
import { requireAdmin } from '../utils/requireAdmin';

const auth = getAuth();

export const updateUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		// Validate admin privileges
		requireAdmin(request);

		// Extract and validate data from client
		const { uid, email, displayName, customClaims } = request.data;
		if (!uid) {
			throw new HttpsError(
				'invalid-argument',
				'User ID (uid) is required to update a user.',
			);
		}

		// Update the user using Admin SDK
		try {
			const updateParams: any = {};
			if (email) updateParams.email = email;
			if (displayName) updateParams.displayName = displayName;

			const userRecord = await auth.updateUser(uid, updateParams);

			// Update custom claims if provided
			if (customClaims && typeof customClaims === 'object') {
				await auth.setCustomUserClaims(userRecord.uid, customClaims);
			}

			log.info(`User ${userRecord.uid} updated successfully.`);

			// Return success response
			return {
				uid: userRecord.uid,
				email: userRecord.email,
				displayName: userRecord.displayName,
				customClaims: customClaims || {},
			};
		} catch (error: any) {
			log.error('Error updating user:', error);
			throw new HttpsError('internal', 'Error updating user: ' + error.message);
		}
	},
);
