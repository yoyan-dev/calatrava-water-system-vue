export interface Billing {
	id?: string;
	uid?: string;
	accountno?: string;
	address?: string;
	arrears?: string;
	averageuse?: string;
	bill_date?: any;
	bill_no?: string;
	c_route_no?: string;
	c_statdesc?: string;
	c_type?: string;
	createdAt?: any;
	discon_dat?: string;
	due_date?: any;
	fullname?: string;
	installfee?: string;
	metercode?: string;
	mrrf?: string;
	mtr_no?: string;
	prereading?: string;
	prorated?: string;
	prvmr_date?: string;
	reminders?: string;
	res2?: number;
	status?: BillingStatus;
}

type BillingStatus = 'pending' | 'paid' | undefined;
