import { getSystemUsers } from './user/getSystemUsers';
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
	getSystemUsers,
	searchUser,
	setUserRole,
} from './user';

// Triggers
export { onUserCreate, onProfileUpdate, onUserDelete } from './triggers';
