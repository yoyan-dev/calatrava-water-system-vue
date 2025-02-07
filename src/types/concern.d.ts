import type { Timestamp } from 'firebase/firestore';

export interface Concern {
	id?: string;
	uid?: string;
	firstName?: string;
	middleName?: string;
	lastName?: string;
	accountNumber?: number;
	content?: string;
	createdAt?: Timestamp;
}
