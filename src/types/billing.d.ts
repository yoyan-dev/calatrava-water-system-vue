export interface Billing {
	id?: string;
	uid?: string;
	residentUid?: string;
	residentAccountNumber?: number;
	billNumber?: number;
	meterReader?: string;
	billingDate?: any;
	waterBill?: number;
	environmentFee?: number;
	billingAmount?: number;
	currentReading?: number;
	previousReading?: number;
	previousMeterUsage?: number;
	waterConsumption?: number;
	readingDate?: any;
	distributionDate?: any;
	dueDate?: any;
	disconnectionDate?: any;
	status?: BillingStatus;
	createdAt?: any;
	environmentFeeArrears?: number;
	amortization?: number;
	arrears?: number;
	area?: string;
}

type BillingStatus = 'pending' | 'paid' | undefined;
