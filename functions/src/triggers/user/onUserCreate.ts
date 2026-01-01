import * as functions from 'firebase-functions/v1'; // ← v1 import
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { log } from '../../utils/logger';

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
	const { uid, email, displayName, photoURL, customClaims } = user;

	try {
		await getFirestore()
			.collection('users')
			.doc(uid)
			.set({
				uid,
				email: email || null,
				displayName: displayName || null,
				photoURL: photoURL || null,
				createdAt: FieldValue.serverTimestamp(),
				role: customClaims?.role ?? 'user',
				// Add any defaults, e.g., role: 'user'
			});

		log.info('Firestore user profile created', { uid });
	} catch (error) {
		log.error('Failed to create Firestore user profile', { uid, error });
	}
});
