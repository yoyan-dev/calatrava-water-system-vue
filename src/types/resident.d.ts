export interface Resident {
	id?: string;
	uid?: string;
	accountNo?: string;
	firstName?: string;
	lastName?: string;
	middleName?: string;
	address?: string;
	classification?: string;
	billNo?: number;
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
}

export interface CurrentBilling {
	readingDate?: any;
	dueDate?: any;
	disconnectionDate?: any;
}
