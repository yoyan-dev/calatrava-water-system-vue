import type { Timestamp } from 'firebase/firestore';

export interface Transaction {
	id?: string;
	uid?: string;
	billNumber?: number;
	billingDate?: Timestamp;
	waterBill?: string;
	area?: string;
	status?: string;
}
