import type { PaginatedBillingsData } from '@/dataconnect-generated';

export type BillingItemFromCsv =
	PaginatedBillingsData['billingFromCsvs'][number];
