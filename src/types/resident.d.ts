import type { Timestamp } from 'firebase/firestore';
import type { Billing } from './billing';

export interface Resident {
	id?: string;
	uid?: string;
	accountNumber?: number;
	firstName?: string;
	lastName?: string;
	middleName?: string;
	address?: string;
	classification?: string;
	billNumber?: number;
	billingDate?: any;
	waterBill?: number;
	envFee?: number;
	arrears?: number;
	envFeeArrears?: number;
	amortization?: number;
	billingAmmount?: number;
	previousReading?: number;
	currentReading?: number;
	previousMeterUsage?: number;
	waterConsumption?: number;
	searchKeyword?: string[];
	createdAt?: any;
	updatedAt?: any;
	currentBilling?: Billing;
	billings?: Billing[];
}
