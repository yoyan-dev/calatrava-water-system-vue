import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	Timestamp,
} from 'firebase/firestore';
import { useFirestore } from 'vuefire';

export const useTransactionStore = defineStore('transaction', () => {
	const db = useFirestore();
	const transactions = ref<Resident[]>([]);
	const isLoading = ref(false);

	function fetchTransactions() {
		transactions.value = [
			{ id: '1', billNumber: 1, billingDate: '01-01-2025', waterBill: 100 },
		];
	}

	async function addTransaction(transaction: Resident) {
		isLoading.value = true;
		transaction.id = (transactions.value.length + 1).toString();
		transaction.billNumber = Number(transaction.id);
		transaction.billingDate = Timestamp.now();
		const docRef = await addDoc(collection(db, 'transactions'), {
			...transaction,
		});
		transactions.value.push({ ...transaction, uid: docRef.id });
		isLoading.value = false;
	}

	async function deleteTransaction(uid: string) {
		isLoading.value = true;
		await deleteDoc(doc(db, 'transactions', uid));
		transactions.value = transactions.value.filter((item) => item.uid !== uid);
		isLoading.value = false;
	}

	function updateTransaction(transaction: Resident, uid: string) {
		const result = transactions.value.find(
			(item) => item.id === transaction.id,
		);
		Object.assign(result || {}, transaction);
	}

	return {
		transactions,
		isLoading,
		fetchTransactions,
		addTransaction,
		deleteTransaction,
		updateTransaction,
	};
});
