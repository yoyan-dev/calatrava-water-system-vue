export interface Resident {
	id?: string;
	uid?: string;
	accountNumber?: string;
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
}
