import type { Billing } from '@/types/billing';
import {
	createBook,
	createBilling,
	createResident,
	getBookByName,
	getResidentByAccountNo,
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

					// Require essential fields including classtype to satisfy CreateResidentVariables.type requirements
					if (!accountno || !fullname || !book || !classtype) {
						return; // Skip invalid rows
					}

					// Use sequential awaits for dependent mutations
					try {
						let bookId;
						let residentId;

						const bookResult = await createBook({
							name: book,
						});

						if (!bookResult.data.book_insert) {
							const bookResult = await getBookByName({
								name: book,
							});
							if (!bookResult) {
								return;
							}
							bookId = bookResult.data.books[0].id;
						}

						const residentResult = await createResident({
							accountNo: Number(accountno),
							bookId: bookResult.data.book_insert.id,
							fullName: fullname,
							classType: classtype as string,
						});

						if (!residentResult.data.resident_insert) {
							const residentResult = await getResidentByAccountNo({
								accountNo: Number(accountno),
							});
							if (!residentResult) {
								return;
							}
							residentId = residentResult.data.residents[0].id;
						}

						if (bookId && residentId) {
							const result = await createBilling({
								billNo: Number(item.billNo),
								billDate: item.billDate,
								dueDate: item.dueDate,
								bStatus: item.bStatus as string,
								mrSysNo: Number(item.mrSysNo),
								penalized: item.penalized as string,
								mPenalty: Number(item.mPenalty),
								discount: Number(item.discount),
								paid: item.paid as string,
								verified: item.verified as string,
								arrearsAmt: Number(item.arrearsamt),
								mrrfDue: Number(item.mrrfdue),
								curReading: Number(item.curreading),
								disconDate: item.disconDate,
								mtrNo: item.mtrNo as string,
								preReading: Number(item.prereading),
								purokCode: item.purokcode as string,
								billPurok: item.billpurok as string,
								billBrgy: item.billbrgy as string,
								prevUsed: Number(item.prevused),
								prevUsed2: Number(item.prevused2),
								prvBillDate: item.prvbilldate as string,
								prvDueDate: item.prvduedate as string,
								prvDiscon: item.prvdiscon as string,
								stubOut: item.stubout as string,
								amortAmt: Number(item.amortamnt),
								nrWater: Number(item.nrwater),
								residentId: residentId,
								bookId: bookId,
								billAmt: item.billamnt,
								duePenalty: Number(item.due_penalty),
								arrearsEnv: Number(item.arrearsenv),
								environmentFee: item.environmentFee,
								totalBill: Number(item.totalBill),
								waterUsage: Number(item.waterusage),
								paymentReceipt: item.paymentReceipt,
							});
						}
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
