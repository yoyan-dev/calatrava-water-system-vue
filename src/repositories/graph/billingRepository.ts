import {
	countBillingFromCsv,
	createBillingFromCsv,
	paginatedBillings,
	searchBillingFromCsv,
	type CreateBillingFromCsvVariables,
} from '@/dataconnect-generated';

class BillingRepository {
	async countBillings() {
		try {
			const response = await countBillingFromCsv();
			return response.data.billingFromCsvs;
		} catch (error) {
			console.error('Error counting billings:', error);
			return 0;
		}
	}

	async searchBillings(keyword: any) {
		if (!keyword || typeof keyword !== 'string') {
			console.error('Invalid keyword:', keyword);
			return [];
		}
		try {
			const response = await searchBillingFromCsv({ query: keyword });
			return response.data.billingFromCsvs_search || [];
		} catch (error) {
			console.error('Error searching billings:', error);
			return [];
		}
	}

	async addBillingFromCsv(payload: FormData) {
		try {
			const file = payload.get('file') as File;
			if (!file) throw new Error('No file uploaded');

			// Read the CSV file content
			const text = await file.text();
			const rows = text.trim().split('\n').slice(1); // Skip header row
			const header = text.trim().split('\n')[0].split(',');

			// Process each row
			for (const row of rows) {
				const values = row.split(',');

				// Map CSV headers to mutation variables (snake_case to camelCase)
				const data: CreateBillingFromCsvVariables = {
					accountNo: '',
					amortAmnt: 0,
					arrearsAmnt: 0,
					arrearsEnv: 0,
					bStatus: '',
					billAmnt: 0,
					billBrgy: '',
					billDate: '',
					billNo: '',
					billPurok: '',
					book: '',
					classType: '',
					curReading: 0,
					custNo: 0,
					discount: 0,
					disconDate: '',
					dueDate: '',
					duePenalty: 0,
					environmentFee: 0,
					fullName: '',
					mPenalty: 0,
					mrrfDue: 0,
					mrSysNo: 0,
					mtrNo: '',
					nrWater: 0,
					paid: '',
					paymentDate: null,
					paymentReceipt: null,
					paymentStatus: null,
					penalized: 0,
					preReading: 0,
					prevUsed: 0,
					prevUsed2: 0,
					prvBillDate: '',
					prvDiscon: '',
					prvDueDate: '',
					purokCode: '',
					stubOut: '',
					totalBill: 0,
					verified: '',
					waterUsage: 0,
				};

				header.forEach((key, index) => {
					const value = values[index]?.trim() || '';

					switch (key) {
						case 'bill_no':
							data.billNo = value || '';
							break;
						case 'accountno':
							data.accountNo = value || '';
							break;
						case 'bill_date':
							data.billDate = value;
							break;
						case 'due_date':
							data.dueDate = value;
							break;
						case 'b_status':
							data.bStatus = value;
							break;
						case 'mr_sys_no':
							data.mrSysNo = parseInt(value) || 0;
							break;
						case 'due_penalty':
							data.duePenalty = parseFloat(value) || 0;
							break;
						case 'penalized':
							data.penalized = parseInt(value) || 0;
							break;
						case 'm_penalty':
							data.mPenalty = parseFloat(value) || 0;
							break;
						case 'discount':
							data.discount = parseFloat(value) || 0;
							break;
						case 'paid':
							data.paid = value;
							break;
						case 'verified':
							data.verified = value;
							break;
						case 'billamnt':
							data.billAmnt = parseFloat(value) || 0;
							break;
						case 'arrearsamt':
							data.arrearsAmnt = parseFloat(value) || 0;
							break;
						case 'mrrfdue':
							data.mrrfDue = parseFloat(value) || 0;
							break;
						case 'waterusage':
							data.waterUsage = parseFloat(value) || 0;
							break;
						case 'curreading':
							data.curReading = parseInt(value) || 0;
							break;
						case 'discon_date':
							data.disconDate = value;
							break;
						case 'mtr_no':
							data.mtrNo = value;
							break;
						case 'book':
							data.book = value;
							break;
						case 'classtype':
							data.classType = value;
							break;
						case 'fullname':
							data.fullName = value;
							break;
						case 'prereading':
							data.preReading = parseInt(value) || 0;
							break;
						case 'purokcode':
							data.purokCode = value || '';
							break;
						case 'billpurok':
							data.billPurok = value || '';
							break;
						case 'billbrgy':
							data.billBrgy = value || '';
							break;
						case 'custno':
							data.custNo = parseInt(value) || 0;
							break;
						case 'prevused':
							data.prevUsed = parseFloat(value) || 0;
							break;
						case 'prevused2':
							data.prevUsed2 = parseFloat(value) || 0;
							break;
						case 'prvbilldate':
							data.prvBillDate = value;
							break;
						case 'prvduedate':
							data.prvDueDate = value;
							break;
						case 'prvdiscon':
							data.prvDiscon = value;
							break;
						case 'stubout':
							data.stubOut = value || '';
							break;
						case 'amortamnt':
							data.amortAmnt = parseFloat(value) || 0;
							break;
						case 'nrwater':
							data.nrWater = parseFloat(value) || 0;
							break;
						case 'arrearsenv':
							data.arrearsEnv = parseFloat(value) || 0;
							break;
					}
				});

				const res = await createBillingFromCsv(data);
			}

			return {
				success: true,
				message: 'Billing records created successfully',
				statusCode: 200,
			};
		} catch (error) {
			console.error(
				'Error processing CSV and creating billing records:',
				error,
			);
			throw new Error(`Failed to process CSV: ${error}`);
		}
	}

	async paginateBilling(
		limit = 10,
		offset = 0,
		orderByField = 'billNo',
		orderDirection = 'DESC',
	) {
		try {
			const response = await paginatedBillings({
				limit,
				offset,
				orderByField,
				orderDirection,
			});
			if (response.data.billingFromCsvs.length > 0) {
				return response.data.billingFromCsvs;
			} else {
				return [];
			}
		} catch (error) {
			console.error('Error fetching billings:', error);
			return [];
		}
	}
}

export const billingRepository = new BillingRepository();
