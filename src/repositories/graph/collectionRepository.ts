import {
	countCollectionFromCsv,
	createCollectionFromCsv,
	deleteCollectionFromCsv,
	paginatedCollections,
	searchCollectionFromCsv,
	updateCollectionFromCsv,
	type CreateCollectionFromCsvVariables,
} from '@/dataconnect-generated';

class CollectionRepository {
	async countCollections() {
		try {
			const response = await countCollectionFromCsv();
			return response.data.collectionFromCsvs;
		} catch (error) {
			console.error('Error counting collections:', error);
			return 0;
		}
	}

	async searchCollections(keyword: any) {
		if (!keyword || typeof keyword !== 'string') {
			console.error('Invalid keyword:', keyword);
			return [];
		}
		try {
			const response = await searchCollectionFromCsv({ query: keyword });
			return response.data.collectionFromCsvs_search || [];
		} catch (error) {
			console.error('Error searching collections:', error);
			return [];
		}
	}

	async deleteCollectionFromCsv(id: string) {
		try {
			const response = await deleteCollectionFromCsv({ id });
			if (response?.data?.collectionFromCsv_delete?.id)
				return { success: true };
		} catch (error) {
			console.error('Error deleting collection:', error);
		}
	}

	async updateCollectionFromCsv(payload: any) {
		try {
			const response = await updateCollectionFromCsv(payload);
			if (response?.data?.collectionFromCsv_update?.id)
				return { success: true };
		} catch (error) {
			console.error('Error updating collection:', error);
		}
	}

	async addCollectionFromCsv(payload: FormData) {
		try {
			const file = payload.get('file') as File;
			if (!file) throw new Error('No file uploaded');

			// Read the CSV file content
			const text = await file.text();
			const rows = text.trim().split('\n').slice(1); // Skip header row
			const header = text.trim().split('\n')[0].split(',');

			const collectionData: any[] = [];

			// Process each row
			for (const row of rows) {
				const values = row.split(',');

				// Initialize data object matching CreateCollectionFromCsvVariables
				const data: CreateCollectionFromCsvVariables = {
					accountNo: '',
					amortize: 0,
					arrearsAmt: 0,
					arrearsEnv: 0,
					bankGroup: 0,
					bankId: '',
					bankOnline: 0,
					batchNo: '',
					billNo: '',
					branch: '',
					cash: 0,
					check: 0,
					checkDate: '',
					checkNo: '',
					cmrrfAmnt: 0,
					custNo: 0,
					discAmnt: 0,
					envFee: 0,
					fullName: '',
					mrrfAmnt: 0,
					onlineref: '',
					othrApply: 0,
					othrIncome: 0,
					othrReconn: 0,
					pacyAmnt: 0,
					papYAmnt: 0,
					payArrears: false,
					penAmnt: 0,
					pymtDate: '',
					pymtMethod: 0,
					receiptNo: '',
					receiptStatus: '',
					receiptType: '',
					runBalance: 0,
					sysNo: 0,
					teller: '',
					trackDt: '',
					waterBill: 0,
				};

				// Map CSV headers (snake_case) to camelCase mutation variables
				header.forEach((key, index) => {
					const rawValue = values[index] || '';
					const value = rawValue.replace(/^"|"$/g, '').trim(); // Remove quotes

					switch (key) {
						case 'sysno':
							data.sysNo = parseInt(value) || 0;
							break;
						case 'receipttype':
							data.receiptType = value;
							break;
						case 'receiptno':
							data.receiptNo = value;
							break;
						case 'accountno':
							data.accountNo = value;
							break;
						case 'billno':
							data.billNo = value;
							break;
						case 'pymtdate':
							data.pymtDate = value;
							break;
						case 'pymtmethod':
							data.pymtMethod = parseInt(value) || 0;
							break;
						case 'cash':
							data.cash = parseFloat(value) || 0;
							break;
						case 'check':
							data.check = parseFloat(value) || 0;
							break;
						case 'checkno':
							data.checkNo = value;
							break;
						case 'bankid':
							data.bankId = value;
							break;
						case 'branch':
							data.branch = value;
							break;
						case 'receiptstatus':
							data.receiptStatus = value;
							break;
						case 'teller':
							data.teller = value;
							break;
						case 'payarrears':
							data.payArrears = value === 'T';
							break;
						case 'bankgroup':
							data.bankGroup = parseInt(value) || 0;
							break;
						case 'bankonline':
							data.bankOnline = parseFloat(value) || 0;
							break;
						case 'fullname':
							data.fullName = value;
							break;
						case 'onlineref':
							data.onlineref = value;
							break;
						case 'batchno':
							data.batchNo = value;
							break;
						case 'papyamnt':
							data.papYAmnt = parseFloat(value) || 0;
							break;
						case 'pacyamnt':
							data.pacyAmnt = parseFloat(value) || 0;
							break;
						case 'pmrrfamnt':
							data.mrrfAmnt = parseFloat(value) || 0;
							break;
						case 'cmrrfamnt':
							data.cmrrfAmnt = parseFloat(value) || 0;
							break;
						case 'pdiscamnt':
							data.discAmnt = parseFloat(value) || 0;
							break;
						case 'penamnt':
							data.penAmnt = parseFloat(value) || 0;
							break;
						case 'trackdt':
							data.trackDt = value;
							break;
						case 'runbalance':
							data.runBalance = parseFloat(value) || 0;
							break;
						case 'custno':
							data.custNo = parseInt(value) || 0;
							break;
						case 'othrincome':
							data.othrIncome = parseFloat(value) || 0;
							break;
						case 'arrearsenv':
							data.arrearsEnv = parseFloat(value) || 0;
							break;
						case 'arrearsamt':
							data.arrearsAmt = parseFloat(value) || 0;
							break;
						case 'envfee':
							data.envFee = parseFloat(value) || 0;
							break;
						case 'waterbill':
							data.waterBill = parseFloat(value) || 0;
							break;
						case 'amortize':
							data.amortize = parseFloat(value) || 0;
							break;
						case 'checkdate':
							data.checkDate = value;
							break;
						case 'othrapply':
							data.othrApply = parseFloat(value) || 0;
							break;
						case 'othrreconn':
							data.othrReconn = parseFloat(value) || 0;
							break;
					}
				});

				// Execute mutation
				const res = await createCollectionFromCsv(data);
				const timestamp = new Date().toISOString();
				const id = res.data.collectionFromCsv_insert.id;

				collectionData.push({
					id,
					createdAt: timestamp,
					...data,
				});
			}

			return {
				success: true,
				message: 'Collection records created successfully',
				statusCode: 200,
				data: collectionData,
			};
		} catch (error) {
			console.error(
				'Error processing CSV and creating collection records:',
				error,
			);
			throw new Error(
				`Failed to process CSV: ${
					error instanceof Error ? error.message : error
				}`,
			);
		}
	}

	async paginateCollection(
		limit = 10,
		offset = 0,
		orderByField = 'billNo',
		orderDirection = 'DESC',
	) {
		try {
			const response = await paginatedCollections({
				limit,
				offset,
				orderByField,
				orderDirection,
			});
			if (response.data.collectionFromCsvs.length > 0) {
				return response.data.collectionFromCsvs;
			} else {
				return [];
			}
		} catch (error) {
			console.error('Error fetching collections:', error);
			return [];
		}
	}
}

export const collectionRepository = new CollectionRepository();
