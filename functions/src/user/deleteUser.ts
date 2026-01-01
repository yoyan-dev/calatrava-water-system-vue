import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { getAuth } from 'firebase-admin/auth';
import { log } from '../utils/logger';
import { requireAdmin } from '../utils/requireAdmin';

const auth = getAuth();

export const deleteUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		// Validate admin privileges
		requireAdmin(request);

		// Extract and validate data from client
		const { uid } = request.data;
		if (!uid) {
			throw new HttpsError(
				'invalid-argument',
				'User ID (uid) is required to delete a user.',
			);
		}

		// Delete the user using Admin SDK
		try {
			await auth.deleteUser(uid);

			log.info(`User ${uid} deleted successfully.`);

			// Return success response
			return { uid };
		} catch (error: any) {
			log.error('Error deleting user:', error);
			throw new HttpsError('internal', 'Error deleting user: ' + error.message);
		}
	},
);
