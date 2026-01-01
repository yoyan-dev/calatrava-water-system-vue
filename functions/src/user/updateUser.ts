// functions/src/user/updateUser.ts

import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { log } from '../utils/logger';
import { requireAdmin } from '../utils/requireAdmin';

const auth = getAuth();
const db = getFirestore();

export const updateUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		requireAdmin(request);

		const { uid, email, displayName, customClaims } = request.data;

		if (!uid) {
			throw new HttpsError('invalid-argument', 'User ID (uid) is required.');
		}

		try {
			// Prepare Auth updates
			const authUpdates: any = {};
			if (email !== undefined) authUpdates.email = email || null;
			if (displayName !== undefined)
				authUpdates.displayName = displayName || null;

			// Update Firebase Auth
			const userRecord = await auth.updateUser(uid, authUpdates);

			// Update custom claims if provided
			if (customClaims && typeof customClaims === 'object') {
				await auth.setCustomUserClaims(uid, customClaims);
				log.info('Custom claims updated', { uid, customClaims });
			}

			// Sync relevant fields to Firestore profile
			const profileUpdates: any = {};
			if (email !== undefined) profileUpdates.email = email || null;
			if (displayName !== undefined)
				profileUpdates.displayName = displayName || null;

			if (customClaims.role) {
				profileUpdates.role = customClaims.role || null;
			}

			if (Object.keys(profileUpdates).length > 0) {
				await db.collection('users').doc(uid).update(profileUpdates);
				log.info('Firestore profile synced from admin update', {
					uid,
					profileUpdates,
				});
			}

			log.info('User updated successfully by admin', {
				uid,
				updatedBy: request?.auth?.uid,
			});

			return {
				uid: userRecord.uid,
				email: userRecord.email,
				displayName: userRecord.displayName,
				customClaims: customClaims || userRecord.customClaims || {},
			};
		} catch (error: any) {
			log.error('Error updating user', { uid, error: error.message });

			// Friendly error messages
			if (error.code === 'auth/user-not-found') {
				throw new HttpsError('not-found', 'User not found.');
			}
			if (error.code === 'auth/email-already-exists') {
				throw new HttpsError('already-exists', 'This email is already in use.');
			}

			throw new HttpsError(
				'internal',
				`Failed to update user: ${error.message}`,
			);
		}
	},
);
