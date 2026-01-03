import { setGlobalOptions } from 'firebase-functions';
import { getApps, initializeApp } from 'firebase-admin/app';

if (!getApps().length) {
	initializeApp();
}

setGlobalOptions({ maxInstances: 10 });

export * from './user';
export * from './triggers';
