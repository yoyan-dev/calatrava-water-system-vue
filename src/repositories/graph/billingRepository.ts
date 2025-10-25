import type { Billing } from '@/types/billing';
import {
	insertBook,
	insertResident,
	insertBilling,
} from '@/dataconnect-generated';

class BillingRepository {
	private parseCsvBilling(csv: string): Billing[] {
		const lines = csv.trim().split('\n');
		const headers = lines[0].split(',').map((h) => h.trim());
		return lines.slice(1).map((line) => {
			const values = line.split(',').map((v) => v.trim());
			const obj: any = {};
			headers.forEach((h, i) => {
				obj[h] = values[i] || '';
			});
			return obj;
		});
	}

	async addBillings(payload: FormData) {
		try {
			const file = payload.get('file') as File;
			if (!file) throw new Error('No file uploaded');

			const csvText = await file.text();
			const data: Billing[] = this.parseCsvBilling(csvText);
			if (!data.length) throw new Error('Empty CSV file');

			const BATCH_SIZE = 500;
			const allBatches: Promise<any>[] = [];

			for (let i = 0; i < data.length; i += BATCH_SIZE) {
				const chunk = data.slice(i, i + BATCH_SIZE);
				const batchPromises = chunk.map(async (item) => {
					const {
						book,
						fullname,
						accountno,
						waterusage,
						arrearsenv,
						due_penalty,
						classtype,
						billamnt,
						...billingData
					} = item;

					if (!accountno || !fullname || !book) {
						return; // Skip invalid rows
					}

					// Use sequential awaits for dependent mutations
					try {
						const bookResult = await insertBook({
							data: {
								code: book.toLowerCase(),
							},
						});

						const residentResult = await insertResident({
							data: {
								accountNo: Number(accountno),
								bookId: bookResult.data.book_insert.id,
								fullName: fullname,
								classType: classtype,
							},
						});

						const result = await insertBilling({
							data: {
								billNo: Number(item.billNo),
								billDate: item.billDate,
								dueDate: item.dueDate,
								bStatus: item.bStatus,
								mrSysNo: Number(item.mrSysNo),
								penalized: item.penalized,
								mPenalty: Number(item.mPenalty),
								discount: Number(item.discount),
								paid: item.paid,
								verified: item.verified,
								arrearsAmt: Number(item.arrearsamt),
								mrrfDue: Number(item.mrrfdue),
								curReading: Number(item.curreading),
								disconDate: item.disconDate,
								mtrNo: item.mtrNo,
								preReading: Number(item.prereading),
								purokCode: item.purokcode,
								billPurok: item.billpurok,
								billBrgy: item.billbrgy,
								prevUsed: Number(item.prevused),
								prevUsed2: Number(item.prevused2),
								prvBillDate: item.prvbilldate,
								prvDueDate: item.prvduedate,
								prvDiscon: item.prvdiscon,
								stubOut: item.stubout,
								amortAmt: Number(item.amortamnt),
								nrWater: Number(item.nrwater),
								residentId: residentResult.data.resident_insert.id,
								billAmt: item.billamnt,
								duePenalty: Number(item.due_penalty),
								arrearsEnv: Number(item.arrearsenv),
								environmentFee: item.environmentFee,
								totalBill: item.totalBill,
								waterUsage: Number(item.waterusage),
								paymentReceipt: item.paymentReceipt,
							},
						});
					} catch (error) {
						console.error(
							`Error processing row with account number ${accountno}:`,
							error,
						);
					}
				});
				allBatches.push(Promise.all(batchPromises));
			}

			await Promise.all(allBatches); // Wait for all batches to complete
			return {
				success: true,
				statusCode: 200,
				message: 'Billings uploaded successfully',
			};
		} catch (error) {
			console.error('Error uploading billings:', error);
			return {
				success: false,
				statusCode: 500,
				message: 'Failed to upload billings',
			};
		}
	}
}

export const billingRepository = new BillingRepository();
