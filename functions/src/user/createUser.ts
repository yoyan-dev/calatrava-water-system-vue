import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { log } from '../utils/logger';
import { requireAdmin } from '../utils/requireAdmin';
import { auth } from '../config/firebaseAdmin';

export const createUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		// Reusable admin + auth check
		requireAdmin(request);

		// Extract and validate input
		const { email, password, displayName, customClaims } = request.data;

		if (!email || !password) {
			throw new HttpsError(
				'invalid-argument',
				'Email and password are required to create a user.',
			);
		}

		if (password.length < 6) {
			throw new HttpsError(
				'invalid-argument',
				'Password must be at least 6 characters long.',
			);
		}

		try {
			// Create the user
			const userRecord = await auth.createUser({
				email,
				password,
				displayName: displayName || null,
			});

			// Optionally set custom claims (e.g., role: 'user')
			if (customClaims && typeof customClaims === 'object') {
				await auth.setCustomUserClaims(userRecord.uid, customClaims);
				log.info('Custom claims set', { uid: userRecord.uid, customClaims });
			}

			log.info('User created successfully', {
				uid: userRecord.uid,
			});

			return {
				uid: userRecord.uid,
				email: userRecord.email,
				displayName: userRecord.displayName,
				customClaims: customClaims || {},
			};
		} catch (error: any) {
			log.error('Error creating user', { error, email });

			// Handle specific known errors nicely
			if (error.code === 'auth/email-already-exists') {
				throw new HttpsError('already-exists', 'This email is already in use.');
			}

			throw new HttpsError(
				'internal',
				`Failed to create user: ${error.message}`,
			);
		}
	},
);
