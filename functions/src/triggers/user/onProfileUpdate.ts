import * as functions from 'firebase-functions/v1';
import { getAuth } from 'firebase-admin/auth';
import { log } from '../../utils/logger';

export const onProfileUpdate = functions.firestore
	.document('users/{uid}')
	.onUpdate(async (change, context) => {
		const { uid } = context.params;
		const before = change.before.data();
		const after = change.after.data();

		// Only sync specific fields back to Firebase Auth if they changed
		const fieldsToSync = ['displayName', 'photoURL'];
		const updates: any = {};

		for (const field of fieldsToSync) {
			if (before[field] !== after[field]) {
				updates[field] = after[field] || null;
			}
		}

		// If nothing to sync, exit early
		if (Object.keys(updates).length === 0) {
			log.info('No Auth fields changed', { uid });
			return null;
		}

		try {
			await getAuth().updateUser(uid, updates);
			log.info('Auth profile synced from Firestore', { uid, updates });
		} catch (error: any) {
			log.error('Failed to sync Auth profile', { uid, error: error.message });
			// Don't throw — we don't want to block the Firestore write
		}

		return null;
	});
