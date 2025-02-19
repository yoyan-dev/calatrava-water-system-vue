import type { Timestamp } from 'firebase/firestore';

export interface Concern {
	id?: string;
	uid?: string;
	name?: string;
	accountNumber?: number;
	content?: string;
	createdAt?: Timestamp;
}
