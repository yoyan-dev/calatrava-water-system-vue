import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { log } from '../utils/logger';
import { requireAdmin } from '../utils/requireAdmin';

const auth = getAuth();
const db = getFirestore();

export const setUserRole = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		requireAdmin(request);

		const { uid, role } = request.data;

		if (!uid || !role) {
			throw new HttpsError(
				'invalid-argument',
				'Both uid and role are required.',
			);
		}

		if (!['user', 'admin', 'staff'].includes(role)) {
			throw new HttpsError(
				'invalid-argument',
				`Invalid role: ${role}. Allowed: user, admin, staff, moderator`,
			);
		}

		try {
			// Update custom claims
			await auth.setCustomUserClaims(uid, { role });

			// Sync role to Firestore for querying/filtering
			await db.collection('users').doc(uid).update({
				role,
			});

			log.info('User role updated', {
				uid,
				newRole: role,
				updatedBy: request?.auth?.uid,
			});

			return { success: true, uid, role };
		} catch (error: any) {
			log.error('Failed to set user role', { uid, role, error: error.message });

			if (error.code === 'auth/user-not-found') {
				throw new HttpsError('not-found', 'User not found.');
			}

			throw new HttpsError('internal', 'Failed to update role.');
		}
	},
);
