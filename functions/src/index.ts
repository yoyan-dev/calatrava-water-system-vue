import { setGlobalOptions } from 'firebase-functions';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
	initializeApp();
}

const auth = getAuth();

setGlobalOptions({ maxInstances: 10 });

// User Management: Create User
export const createUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		// 1. Check if caller is authenticated
		if (!request.auth) {
			throw new HttpsError(
				'unauthenticated',
				'You must be logged in to create a user.',
			);
		}

		// 2. Check if caller has admin privileges (via custom claims)
		if (request.auth.token.role !== 'admin') {
			throw new HttpsError(
				'permission-denied',
				'Only admins can create users.',
			);
		}

		// 3. Extract and validate data from client
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

		// 4. Create the user using Admin SDK
		try {
			const userRecord = await auth.createUser({
				email,
				password,
				displayName,
			});

			// 5. Set custom claims if provided
			if (customClaims && typeof customClaims === 'object') {
				await auth.setCustomUserClaims(userRecord.uid, customClaims);
			}

			logger.info(`User ${userRecord.uid} created successfully.`);

			// 6. Return success response
			return {
				uid: userRecord.uid,
				email: userRecord.email,
				displayName: userRecord.displayName,
				customClaims: customClaims || {},
			};
		} catch (error: any) {
			logger.error('Error creating user:', error);
			throw new HttpsError('internal', 'Error creating user: ' + error.message);
		}
	},
);

export const deleteUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		// 1. Check if caller is authenticated
		if (!request.auth) {
			throw new HttpsError(
				'unauthenticated',
				'You must be logged in to delete a user.',
			);
		}

		// 2. Check if caller has admin privileges (via custom claims)
		if (request.auth.token.role !== 'admin') {
			throw new HttpsError(
				'permission-denied',
				'Only admins can delete users.',
			);
		}

		// 3. Extract and validate data from client
		const { uid } = request.data;
		if (!uid) {
			throw new HttpsError(
				'invalid-argument',
				'User ID (uid) is required to delete a user.',
			);
		}

		// 4. Delete the user using Admin SDK
		try {
			await auth.deleteUser(uid);

			logger.info(`User ${uid} deleted successfully.`);

			// 5. Return success response
			return { uid };
		} catch (error: any) {
			logger.error('Error deleting user:', error);
			throw new HttpsError('internal', 'Error deleting user: ' + error.message);
		}
	},
);

export const updateUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		// 1. Check if caller is authenticated
		if (!request.auth) {
			throw new HttpsError(
				'unauthenticated',
				'You must be logged in to update a user.',
			);
		}

		// 2. Check if caller has admin privileges (via custom claims)
		if (request.auth.token.role !== 'admin') {
			throw new HttpsError(
				'permission-denied',
				'Only admins can update users.',
			);
		}

		// 3. Extract and validate data from client
		const { uid, email, displayName, customClaims } = request.data;
		if (!uid) {
			throw new HttpsError(
				'invalid-argument',
				'User ID (uid) is required to update a user.',
			);
		}

		// 4. Update the user using Admin SDK
		try {
			const updateParams: any = {};
			if (email) updateParams.email = email;
			if (displayName) updateParams.displayName = displayName;

			const userRecord = await auth.updateUser(uid, updateParams);

			// 5. Update custom claims if provided
			if (customClaims && typeof customClaims === 'object') {
				await auth.setCustomUserClaims(userRecord.uid, customClaims);
			}

			logger.info(`User ${userRecord.uid} updated successfully.`);

			// 6. Return success response
			return {
				uid: userRecord.uid,
				email: userRecord.email,
				displayName: userRecord.displayName,
				customClaims: customClaims || {},
			};
		} catch (error: any) {
			logger.error('Error updating user:', error);
			throw new HttpsError('internal', 'Error updating user: ' + error.message);
		}
	},
);

// User Management: List Users
export const listUsers = onCall({ enforceAppCheck: false }, async (request) => {
	// 1. Check if caller is authenticated
	if (!request.auth) {
		throw new HttpsError(
			'unauthenticated',
			'You must be logged in to list users.',
		);
	}

	// 2. Check if caller has admin privileges (via custom claims)
	if (request.auth.token.role !== 'admin') {
		throw new HttpsError('permission-denied', 'Only admins can list users.');
	}

	// 3. Extract pagination parameters
	const pageSize = Math.min(request.data.pageSize || 10, 100); // Max 100
	const pageToken = request.data.pageToken || undefined;

	// 4. List users using Admin SDK
	try {
		const listUsersResult = await auth.listUsers(pageSize, pageToken);

		const users = listUsersResult.users.map((userRecord) => ({
			uid: userRecord.uid,
			email: userRecord.email,
			emailVerified: userRecord.emailVerified,
			displayName: userRecord.displayName,
			photoURL: userRecord.photoURL,
			disabled: userRecord.disabled,
			metadata: {
				creationTime: userRecord.metadata.creationTime,
				lastSignInTime: userRecord.metadata.lastSignInTime,
				lastRefreshTime: userRecord.metadata.lastRefreshTime,
			},
			providerData: userRecord.providerData.map((provider) => ({
				providerId: provider.providerId,
				email: provider.email,
				displayName: provider.displayName,
				photoURL: provider.photoURL,
			})),
			customClaims: userRecord.customClaims || {},
		}));

		logger.info(`Fetched ${users.length} users (pageSize: ${pageSize})`);

		// 5. Return users and next page token
		return {
			users,
			nextPageToken: listUsersResult.pageToken || null,
			pageSize: users.length,
			hasMore: !!listUsersResult.pageToken,
		};
	} catch (error: any) {
		logger.error('Error listing users:', error);
		throw new HttpsError('internal', 'Error listing users: ' + error.message);
	}
});
