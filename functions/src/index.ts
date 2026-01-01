import { setGlobalOptions } from 'firebase-functions';
import { getApps, initializeApp } from 'firebase-admin/app';

if (!getApps().length) {
	initializeApp();
}

setGlobalOptions({ maxInstances: 10 });

export {
	createUser,
	updateUser,
	deleteUser,
	listUsers,
	searchUser,
} from './user';

// Triggers
export { onUserCreate, onProfileUpdate, onUserDelete } from './triggers';
