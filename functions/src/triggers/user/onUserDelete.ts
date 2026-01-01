import * as functions from 'firebase-functions/v1';
import { getFirestore } from 'firebase-admin/firestore';
import { log } from '../../utils/logger';

export const onUserDelete = functions.auth.user().onDelete(async (user) => {
	const { uid } = user;

	const db = getFirestore();
	const batch = db.batch();

	try {
		// Delete the main user profile
		const userRef = db.collection('users').doc(uid);
		batch.delete(userRef);

		// Optional: Delete related data (e.g., posts, comments, likes)
		// Example:
		// const postsQuery = await db.collection('posts').where('authorId', '==', uid).get();
		// postsQuery.docs.forEach(doc => batch.delete(doc.ref));

		await batch.commit();

		log.info('User data cleaned up successfully', { uid });
	} catch (error: any) {
		log.error('Failed to clean up user data', { uid, error: error.message });
		// Don't throw — Auth deletion should not be blocked by cleanup failure
	}

	return null;
});
