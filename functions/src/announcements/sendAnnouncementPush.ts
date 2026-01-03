import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { requireAdmin } from '../utils/requireAdmin';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

export const sendAnnouncementPush = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		requireAdmin(request);

		const { announcementId, title, body, imageUrl, targetZones } = request.data;

		if (!title || !body) {
			throw new HttpsError('invalid-argument', 'Title and body required');
		}

		let tokens: string[] = [];

		// Option 1: Send to ALL users (if no targetZones)
		if (!targetZones || targetZones.length === 0) {
			const tokensSnap = await db.collection('deviceTokens').get();
			tokens = tokensSnap.docs.map((doc) => doc.id);
		} else {
			// Option 2: Send only to users in targeted zones
			const consumersSnap = await db
				.collection('consumers')
				.where('zoneId', 'in', targetZones)
				.get();

			const userIds = consumersSnap.docs
				.map((doc) => doc.data().userId)
				.filter(Boolean);

			const tokenSnaps = await Promise.all(
				userIds.map((uid) => db.collection('deviceTokens').doc(uid).get()),
			);

			tokens = tokenSnaps.filter((snap) => snap.exists).map((snap) => snap.id);
		}

		if (tokens.length === 0) return { success: true, sent: 0 };

		const payload = {
			notification: {
				title,
				body,
				imageUrl: imageUrl || undefined,
			},
			data: {
				type: 'announcement',
				announcementId,
				click_action: 'FLUTTER_NOTIFICATION_CLICK',
			},
		};

		const chunks = chunkArray(tokens, 500); // FCM limit per request
		const promises = chunks.map((chunk) =>
			admin.messaging().sendToDevice(chunk, payload),
		);

		const results = await Promise.all(promises);
		const sentCount = results.reduce((sum, res) => sum + res.successCount, 0);

		return { success: true, sent: sentCount };
	},
);

// Helper
function chunkArray<T>(array: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
		array.slice(i * size, i * size + size),
	);
}
