import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import {
	addDoc,
	collection,
	doc,
	Timestamp,
	getDoc,
	writeBatch,
	deleteDoc,
} from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import type { Billing } from '@/types/billing';
import type { StoreResponse } from '@/types/store-response';
import { useFetch, watchDebounced } from '@vueuse/core';
import type { H3Response } from '@/types/h3response';
import { format } from 'date-fns';

export const useBillingStore = defineStore('billing', () => {
	const db = useFirestore();

	// State
	const billings = ref<Billing[]>([]);
	const billing = ref<Billing>();
	const isLoading = ref(false);
	const month = ref(new Date());
	const searchQuery = ref('');
	const totalBillings = ref(0);
	const page = ref(0);

	// getters
	const offset = computed(() => page.value * 10);
	const formattedDate = computed(() => format(month.value, 'yyyy-M'));

	// Actions
	async function fetchBillings(searchParams: Record<string, any> = {}) {
		isLoading.value = true;

		try {
			const queryString = new URLSearchParams(searchParams).toString();

			const url = `${import.meta.env.VITE_API_URL}/api/billings${
				queryString ? '?' + queryString : ''
			}`;

			const { data: response } = await useFetch(
				url,
				{
					method: 'GET',
				},
				{
					refetch: true,
				},
			).json<H3Response<Billing[]>>();
			billings.value = response.value?.data as Billing[];
			totalBillings.value = response.value?.total as number;
		} catch (error) {
			console.error('Error fetching students:', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function fetchBilling(uid: string) {
		isLoading.value = true;
		try {
			const docSnap = await getDoc(doc(db, 'billings', uid));
			console.log(docSnap.data());
			billing.value = { ...docSnap.data(), uid: docSnap.id };
		} catch (error) {
			console.error('Error fetching billing by ID:', error);
			throw error;
		} finally {
			isLoading.value = false;
		}
	}

	async function addBatchBilling(payload: Billing[]): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const { data: result } = await useFetch(
				`${import.meta.env.VITE_API_URL}/api/billings`,
			)
				.post(payload)
				.json();

			return {
				status: result.value.statusCode == 200 ? 'success' : 'error',
				statusMessage: result.value.statusMessage,
				message: result.value.message,
			};
		} catch (e) {
			console.error(e);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function addBilling(
		payload: Billing,
		selected: any,
	): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			if (!payload) {
				throw new Error('Current billing information is missing');
			}
			console.log(payload, selected);
			payload.id = (billings.value.length + 1).toString();
			payload.bill_no = payload.id;
			const docRef = await addDoc(collection(db, 'billings'), {
				...payload,
				residentAccountNumber: selected.accountNumber,
				residentUid: selected.uid,
				createdAt: Timestamp.now(),
			});
			// const residentSnap = await updateDoc(doc(db, 'residents'), {
			// 	currentBilling: { ...payload },
			// });
			// const existingBilling = billings.value.find(
			// 	(billing) => billing.residentAccountNumber === accountNumber,
			// );
			// if (existingBilling) {
			// 	billings.value = billings.value.filter(
			// 		(b) => b.residentAccountNumber !== accountNumber,
			// 	);
			// 	billings.value.push({
			// 		...payload,
			// 		residentAccountNumber: accountNumber,
			// 		uid: docRef.id,
			// 	});
			// } else {
			// 	billings.value.push({
			// 		...payload,
			// 		residentAccountNumber: accountNumber,
			// 		uid: docRef.id,
			// 	});
			// }
			return {
				status: 'success',
				statusMessage: 'Success message',
				message: 'Successfully added billing',
			};
		} catch (error: any) {
			console.log(error);
			return {
				status: 'error',
				statusMessage: 'Error message',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteBilling({
		accountno,
		uid,
	}: {
		accountno: string;
		uid: string;
	}): Promise<StoreResponse> {
		isLoading.value = true;
		try {
			const billingRef = doc(db, 'residents', accountno, 'billings', uid);
			await deleteDoc(billingRef);
			billings.value = billings.value.filter((item) => item.uid !== uid);
			return {
				status: 'success',
				statusMessage: 'Success',
				message: 'Successfully deleted billing',
			};
		} catch (error: any) {
			console.log(error);
			return {
				status: 'error',
				statusMessage: 'Error',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function deleteBillings(payload: Billing[]): Promise<StoreResponse> {
		isLoading.value = true;
		const batch = writeBatch(db);

		payload.forEach((item) => {
			const docRef = doc(
				db,
				'residents',
				item.accountno ?? '',
				'billings',
				item.uid ?? '',
			);
			batch.delete(docRef);
		});

		try {
			await batch.commit();
			billings.value = billings.value.filter(
				(val) => !payload.some((item) => item.uid === val.uid),
			);
			await fetchBillings({
				q: searchQuery.value,
				month: formattedDate.value,
				offset: offset.value,
			});
			return {
				status: 'success',
				statusMessage: 'Success',
				message: 'Successfully deleted billings',
			};
		} catch (error) {
			console.error('Error deleting billings:', error);
			return {
				status: 'error',
				statusMessage: 'Error',
				message: 'Something went wrong',
			};
		} finally {
			isLoading.value = false;
		}
	}

	function updateBilling(billing: Billing, uid: string) {
		const result = billings.value.find((item) => item.uid === uid);
		Object.assign(result || {}, billing);
	}

	watchDebounced(
		[searchQuery, formattedDate, offset],
		(newQuery) => {
			console.log(newQuery);
			fetchBillings({
				q: newQuery[0],
				month: newQuery[1],
				offset: newQuery[2],
			});
		},
		{ debounce: 300 },
	);

	return {
		billings,
		billing,
		isLoading,
		month,
		searchQuery,
		page,
		totalBillings,
		fetchBilling,
		fetchBillings,
		addBilling,
		addBatchBilling,
		updateBilling,
		deleteBilling,
		deleteBillings,
	};
});
