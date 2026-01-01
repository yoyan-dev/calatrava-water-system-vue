import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { getFirestore } from 'firebase-admin/firestore';
import { log } from '../utils/logger';
import { requireAdmin } from '../utils/requireAdmin';

const db = getFirestore();

export const getSystemUsers = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		requireAdmin(request);

		try {
			const snapshot = await db
				.collection('users')
				.where('role', 'not-in', ['user']) // Excludes regular users
				// Optional: .orderBy('createdAt', 'desc')
				.get();

			if (snapshot.empty) {
				return { users: [] };
			}

			const users = snapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data(),
			}));

			log.info('Fetched system users', { count: users.length });

			return { users };
		} catch (error: any) {
			log.error('Error fetching system users', { error: error.message });
			throw new HttpsError('internal', 'Failed to fetch system users.');
		}
	},
);
