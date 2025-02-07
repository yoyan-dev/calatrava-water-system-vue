import type { Timestamp } from 'firebase/firestore';

export interface Billing {
	id?: string;
	uid?: string;
	billNumber?: number;
	meterReader?: string;
	billingDate?: Timestamp;
	waterBill?: string;
	environmentFee?: string;
	billingAmount?: string;
	curentReading?: number;
	previousReading?: number;
	previousMeterUsage?: number;
	waterConsumption?: number;
	readingDate?: Timestamp;
	distributionDate?: Timestamp;
	dueDate?: Timestamp;
	disconnectionDate?: Timestamp;
	status?: BillingStatus;
	createdAt?: Timestamp;
	environmentFeeArrears?: number;
	amortization?: number;
}

type BillingStatus = 'pending' | 'paid' | undefined;
