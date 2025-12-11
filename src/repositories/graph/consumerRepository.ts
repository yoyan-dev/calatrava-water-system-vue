import type { RepositoryResponse } from '@/types/repository-response.d';
import { formatDataConnectError } from '@/composables/dataConnectError';
import {
	countConsumers,
	createConsumer,
	deleteConsumer,
	paginatedConsumers,
	searchConsumers,
	adminUpdateConsumer,
	getConsumerByAccountNo,
} from '@/dataconnect-generated';
import Papa from 'papaparse';
import type { Consumer } from '@/types/consumer';

class ConsumerRepository {
	async getConsumerByAccountNo(accountNo: string) {
		try {
			const response = await getConsumerByAccountNo({ accountNo });
			if (response.data.consumer) {
				return response.data.consumer;
			}
		} catch (error) {
			console.error('Error fetching consumer by account number:', error);
			return null;
		}
	}

	async countConsumers() {
		try {
			const response = await countConsumers();
			return response.data.consumers;
		} catch (error) {
			console.error('Error counting consumers:', error);
			return 0;
		}
	}

	async searchConsumers(keyword: any) {
		if (!keyword || typeof keyword !== 'string') {
			console.error('Invalid keyword:', keyword);
			return [];
		}
		try {
			const response = await searchConsumers({ query: keyword });
			if (response.data.consumers_search) {
				const consumers: Consumer[] = response.data.consumers_search.map(
					(item: any) => ({
						...item,
					}),
				);
				return consumers;
			} else return [];
		} catch (error) {
			console.error('Error searching consumers:', error);
			return [];
		}
	}

	async deleteConsumer(id: string) {
		try {
			const response = await deleteConsumer({ id });
			if (response?.data?.consumer_delete?.id) return { success: true };
		} catch (error) {
			return { status: 'error', message: error };
		}
	}

	async updateConsumer(payload: any) {
		try {
			const response = await adminUpdateConsumer(payload);
			if (response?.data?.consumer_update?.id) return { success: true };
		} catch (error) {
			return { status: 'error', message: error };
		}
	}

	async addConsumer(payload: any): Promise<RepositoryResponse> {
		try {
			const response = await createConsumer(payload);
			if (response?.data?.consumer_insert?.id) {
				const createdAt = new Date().toISOString();
				const id = response.data.consumer_insert.id;
				return {
					status: 'success',
					message: 'Consumer added successfully',
					data: { id, createdAt },
				};
			} else {
				return {
					status: 'error',
					message: 'Error Data-connect SQL query.',
				};
			}
		} catch (error: any) {
			return formatDataConnectError(error.response.errors);
		}
	}

	async addConsumerFromCsv(payload: FormData) {
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

			const consumerData: any[] = [];

			for (const rawValues of rows) {
				const data: any = {
					accountNo: '',
					fullName: '',
					book: '',
					classType: '',
				};

				header.forEach((key, idx) => {
					const value = rawValues[idx] ?? '';

					switch (key) {
						case 'accountno':
							data.accountNo = value.replace(/^"|"$/g, '').trim();
							break;
						case 'fullname':
							data.fullName = value;
							break;
						case 'book':
							data.book = value;
							break;
						case 'classtype':
							data.classType = value;
							break;
					}
				});

				// Validate required fields
				if (
					!data.accountNo ||
					!data.fullName ||
					!data.book ||
					!data.classType
				) {
					console.warn('Skipping invalid row:', rawValues);
					continue;
				}

				try {
					const res = await createConsumer(data);

					if (res.data.consumer_insert) {
						const id = res.data.consumer_insert.id;
						const createdAt = new Date().toISOString();
						consumerData.push({ id, createdAt, ...data });
					} else {
						return { status: 'error', message: res.data || 'Unknown error' };
					}
				} catch (error) {
					return { status: 'error', message: error };
				}
			}

			return {
				status: 'success',
				success: true,
				message: `${consumerData.length} consumer records created successfully`,
				statusCode: 200,
				data: consumerData,
			};
		} catch (error) {
			return { status: 'error', message: error };
		}
	}

	async paginateConsumers(
		limit = 10,
		offset = 0,
		orderByField = 'accountNo',
		orderDirection = 'DESC',
	) {
		try {
			const response = await paginatedConsumers({
				limit,
				offset,
				orderByField,
				orderDirection,
			});
			if (response.data.consumers.length > 0) {
				const consumers: Consumer[] = response.data.consumers.map(
					(item: any) => ({
						...item,
					}),
				);
				return consumers;
			} else {
				return [];
			}
		} catch (error) {
			console.error('Error fetching consumers:', error);
			return [];
		}
	}
}

export const consumerRepository = new ConsumerRepository();
