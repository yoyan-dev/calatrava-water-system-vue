export interface Billing {
	id?: string;
	uid?: string;
	accountno?: string;
	address?: string;
	arrears?: string;
	averageuse?: string;
	billDate?: any;
	billNo?: string;
	cRouteNo?: string;
	cStatdesc?: string;
	cType?: string;
	createdAt?: any;
	disconDat?: string;
	dueDate?: any;
	fullname?: string;
	installfee?: string;
	metercode?: string;
	mrrf?: string;
	mtrNo?: string;
	prereading?: string;
	prorated?: string;
	prvmrDate?: any;
	reminders?: string;
	res2?: number;
	status?: BillingStatus;
	waterCharge?: number;
	environmentalFee?: number;
	totalBill?: number;
}

type BillingStatus = 'pending' | 'paid' | undefined;
