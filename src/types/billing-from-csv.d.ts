export interface CreateBillingFromCsvVariables {
	accountNo: number; // Always present in CSV, non-nullable in mutation
	amortAmnt: number; // Present in CSV (e.g., 0), non-nullable
	arrearsAmnt: number; // Present in CSV (e.g., 678, 0), non-nullable
	arrearsEnv: number; // Present in CSV (e.g., 15.25, 0), non-nullable
	bStatus: string; // Always present in CSV (e.g., "2"), non-nullable
	billAmnt: number; // Always present in CSV (e.g., 276, 135), non-nullable
	billBrgy?: string; // Empty in CSV (""), should be optional
	billDate: string; // Always present in CSV (e.g., "10/06/2025"), non-nullable
	billNo: number; // Always present in CSV (e.g., 1, 2, 3), non-nullable
	billPurok?: string; // Empty in CSV (""), should be optional
	book: string; // Always present in CSV (e.g., "CALAMPISAWAN"), non-nullable
	classType: string; // Always present in CSV (e.g., "RESIDENTIAL"), non-nullable
	curReading: number; // Always present in CSV (e.g., 876, 2747), non-nullable
	discount: number; // Present in CSV (e.g., 0), non-nullable
	disconDate: string; // Always present in CSV (e.g., "10/17/2025"), non-nullable
	dueDate: string; // Always present in CSV (e.g., "10/14/2025"), non-nullable
	duePenalty: number; // Present in CSV (e.g., 27.6, 13.5), non-nullable
	environmentFee: number; // Not in CSV but non-nullable in mutation, default to 0
	fullName: string; // Always present in CSV (e.g., "JESSICA  ABELLON"), non-nullable
	mPenalty: number; // Present in CSV (e.g., 0), non-nullable
	mrSysNo: number; // Always present in CSV (e.g., 54476), non-nullable
	mtrNo: string; // Always present in CSV (e.g., "180405339"), non-nullable
	nrWater: number; // Present in CSV (e.g., 0), non-nullable
	paid: string; // Always present in CSV (e.g., "F"), non-nullable
	paymentDate?: string | null; // Not in CSV, nullable in mutation
	paymentReceipt?: string | null; // Not in CSV, nullable in mutation
	paymentStatus?: string | null; // Not in CSV, nullable in mutation
	preReading: number; // Always present in CSV (e.g., 850, 2732), non-nullable
	prevUsed: number; // Present in CSV (e.g., 0), non-nullable
	prevUsed2: number; // Present in CSV (e.g., 0), non-nullable
	prvBillDate?: string; // "/  /" in CSV, should be optional
	prvDiscon?: string; // "/  /" in CSV, should be optional
	prvDueDate?: string; // "/  /" in CSV, should be optional
	purokCode?: string; // Empty in CSV (""), should be optional
	residentId: string; // Derived from custno, always present, non-nullable
	stubOut?: string; // Empty in CSV (""), should be optional
	totalBill: number; // Always present in CSV (e.g., 276, 135), non-nullable
	verified: string; // Always present in CSV (e.g., "T"), non-nullable
	waterUsage: number; // Always present in CSV (e.g., 26, 15), non-nullable
}
