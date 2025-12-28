import { setGlobalOptions } from 'firebase-functions';
import {
	CallableRequest,
	HttpsError,
	onCall,
} from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
	initializeApp();
}

const auth = getAuth();

setGlobalOptions({ maxInstances: 10 });

// Validation helper functions, types could be added here if needed

type AdminRequest = CallableRequest<any> & {
	auth: { uid: string; token: { role: string } };
};

function requireAdmin(
	request: CallableRequest<any>,
): asserts request is AdminRequest {
	// Check authentication
	if (!request.auth) {
		throw new HttpsError('unauthenticated', 'You must be logged in.');
	}

	// Check admin role (adjust based on your custom claim structure)
	if (request.auth.token.role !== 'admin') {
		throw new HttpsError(
			'permission-denied',
			'Only admins can perform this action.',
		);
	}
}

// User Management
export const createUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		// Validate admin privileges
		requireAdmin(request);

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

			logger.info(`User ${uid} deleted successfully.`);

			// Return success response
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
		// Validate admin privileges
		requireAdmin(request);

		// Extract and validate data from client
		const { uid, email, displayName, customClaims } = request.data;
		if (!uid) {
			throw new HttpsError(
				'invalid-argument',
				'User ID (uid) is required to update a user.',
			);
		}

		// Update the user using Admin SDK
		try {
			const updateParams: any = {};
			if (email) updateParams.email = email;
			if (displayName) updateParams.displayName = displayName;

			const userRecord = await auth.updateUser(uid, updateParams);

			// Update custom claims if provided
			if (customClaims && typeof customClaims === 'object') {
				await auth.setCustomUserClaims(userRecord.uid, customClaims);
			}

			logger.info(`User ${userRecord.uid} updated successfully.`);

			// Return success response
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

export const listUsers = onCall({ enforceAppCheck: false }, async (request) => {
	// Validate admin privileges
	requireAdmin(request);

	// Extract pagination parameters
	const pageSize = Math.min(request.data.pageSize || 10, 100); // Max 100
	const pageToken = request.data.pageToken || undefined;

	// List users using Admin SDK
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

		// Return users and next page token
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

export const searchUser = onCall(
	{ enforceAppCheck: false },
	async (request) => {
		// Validate admin privileges
		requireAdmin(request);

		// Extract and validate data from client
		const { uid, email } = request.data;
		console.log(request.data);
		if (!uid && !email) {
			throw new HttpsError(
				'invalid-argument',
				'Either User ID (uid) or email is required to search for a user.',
			);
		}

		// Search for the user using Admin SDK
		try {
			let userRecord;
			if (uid) {
				userRecord = await auth.getUser(uid);
			} else if (email) {
				userRecord = await auth.getUserByEmail(email);
			}

			if (!userRecord) {
				throw new HttpsError('not-found', 'User not found.');
			}

			logger.info(`User ${userRecord.uid} found.`);

			// Return user details
			return {
				uid: userRecord.uid,
				email: userRecord.email,
				emailVerified: userRecord.emailVerified,
				displayName: userRecord.displayName,
				photoURL: userRecord.photoURL,
				disabled: userRecord.disabled,
				createdAt: userRecord.metadata.creationTime,
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
			};
		} catch (error: any) {
			logger.error('Error searching for user:', error);
			throw new HttpsError(
				'internal',
				'Error searching for user: ' + error.message,
			);
		}
	},
);
