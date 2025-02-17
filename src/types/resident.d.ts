import type { Timestamp } from 'firebase/firestore';
import type { Billing } from './billing';

export interface Resident {
	id?: string;
	uid?: string;
	fullname?: string;
	accountNumber?: number;
	firstName?: string;
	lastName?: string;
	middleName?: string;
	address?: string;
	classification?: string;
	searchKeyword?: string[];
	createdAt?: any;
	updatedAt?: any;
	currentBilling?: Billing;
	billings?: Billing[];
}
