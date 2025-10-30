import {
	countLedgerFromCsv,
	createLedgerFromCsv,
	deleteLedgerFromCsv,
	paginatedLedgers,
	searchLedgerFromCsv,
	updateLedgerFromCsv,
	type CreateLedgerFromCsvVariables,
} from '@/dataconnect-generated';
import Papa from 'papaparse';

class LedgerRepository {
	async countLedgers() {
		try {
			const response = await countLedgerFromCsv();
			return response.data.ledgerFromCsvs;
		} catch (error) {
			console.error('Error counting ledgers:', error);
			return 0;
		}
	}

	async searchLedgers(keyword: any) {
		if (!keyword || typeof keyword !== 'string') {
			console.error('Invalid keyword:', keyword);
			return [];
		}
		try {
			const response = await searchLedgerFromCsv({ query: keyword });
			return response.data.ledgerFromCsvs_search || [];
		} catch (error) {
			console.error('Error searching ledgers:', error);
			return [];
		}
	}

	async deleteLedgerFromCsv(id: string) {
		try {
			const response = await deleteLedgerFromCsv({ id });
			if (response?.data?.ledgerFromCsv_delete?.id) return { success: true };
		} catch (error) {
			console.error('Error deleting ledger:', error);
		}
	}

	async updateLedgerFromCsv(payload: any) {
		try {
			const response = await updateLedgerFromCsv(payload);
			if (response?.data?.ledgerFromCsv_update?.id) return { success: true };
		} catch (error) {
			console.error('Error updating ledger:', error);
		}
	}

	async addLedgerFromCsv(payload: FormData) {
		try {
			const file = payload.get('file') as File;
			if (!file) throw new Error('No file uploaded');

			const text = await file.text();

			const parseResult = Papa.parse(text, {
				header: false,
				skipEmptyLines: true,
				dynamicTyping: false,
				transform: (value) => value.trim(), // clean whitespace
			});

			if (parseResult.errors.length > 0) {
				console.warn('CSV parse warnings:', parseResult.errors);
			}

			const rawRows = parseResult.data as string[][];
			if (rawRows.length < 1) throw new Error('CSV is empty');

			const header = rawRows[0].map((h) => h.toLowerCase().trim());
			const rows = rawRows.slice(1);

			const ledgerData: any[] = [];

			for (const rawValues of rows) {
				const data: CreateLedgerFromCsvVariables = {
					accountNo: '',
					transDate: '',
					refCode: '',
					refNo: '',
					amount: 0,
					timestamp: null,
					tag: '',
					reading: 0,
					consumption: 0,
					sequence: 0,
					custNo: '',
				};

				header.forEach((key, idx) => {
					const value = rawValues[idx] ?? '';

					switch (key) {
						case 'accountno':
							data.accountNo = value.replace(/^"|"$/g, '').trim();
							break;
						case 'trans_date':
							data.transDate = value;
							break;
						case 'ref_code':
							data.refCode = value;
							break;
						case 'ref_no':
							data.refNo = value;
							break;
						case 'amount':
							const num = parseFloat(value);
							data.amount = isNaN(num) ? 0 : num;
							break;
						case 'timestamp':
							data.timestamp = value === '/  /' || !value ? null : value;
							break;
						case 'tag':
							data.tag = value || 'UNKNOWN';
							break;
						case 'reading':
							data.reading = parseInt(value, 10) || 0;
							break;
						case 'consumption':
							data.consumption = parseInt(value, 10) || 0;
							break;
						case 'sequence':
							data.sequence = parseInt(value, 10) || 0;
							break;
						case 'custno':
							data.custNo = value;
							break;
					}
				});

				// Validate required fields
				if (
					!data.accountNo ||
					!data.transDate ||
					!data.refNo ||
					!data.sequence
				) {
					console.warn('Skipping invalid row:', rawValues);
					continue;
				}

				const res = await createLedgerFromCsv(data);
				const id = res.data.ledgerFromCsv_insert.id;
				const createdAt = new Date().toISOString();

				ledgerData.push({ id, createdAt, ...data });
			}

			return {
				success: true,
				message: `${ledgerData.length} ledger records created successfully`,
				statusCode: 200,
				data: ledgerData,
			};
		} catch (error) {
			console.error('Error processing CSV:', error);
			throw new Error(
				`Failed to process CSV: ${
					error instanceof Error ? error.message : String(error)
				}`,
			);
		}
	}
	async paginateLedger(
		limit = 10,
		offset = 0,
		orderByField = 'billNo',
		orderDirection = 'DESC',
	) {
		try {
			const response = await paginatedLedgers({
				limit,
				offset,
				orderByField,
				orderDirection,
			});
			if (response.data.ledgerFromCsvs.length > 0) {
				return response.data.ledgerFromCsvs;
			} else {
				return [];
			}
		} catch (error) {
			console.error('Error fetching ledgers:', error);
			return [];
		}
	}
}

export const ledgerRepository = new LedgerRepository();
