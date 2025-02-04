import type { Timestamp } from 'firebase/firestore';

export interface Billing {
	billNumber?: number;
	waterBill?: string;
	environmentFee?: string;
	billingAmount?: string;
	billingDate?: Timestamp;
	waterConsumption?: number;
	dueDate?: Timestamp;
	disconnectionDate?: Timestamp;
	meterReader?: string;
	reading?: number;
	createdAt?: Timestamp;
}
