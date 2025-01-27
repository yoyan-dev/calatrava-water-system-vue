import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';

export const useTransactionStore = defineStore('transaction', () => {
    const transactions = ref<Resident[]>([]);

    function fetchTransactions() {
        transactions.value = [
            { id: '1', billNo: 1, billingDate: '01-01-2025', waterBill: 100 },
        ];
    }

    function addTransaction(transaction: Resident) {
        transaction.id = (transactions.value.length + 1).toString();
        transaction.billNo = transactions.value.length + 1
        transaction.billingDate = new Date().toLocaleDateString();
        transactions.value.push(transaction);
    }

    function deleteTransaction(id: string) {
        transactions.value = transactions.value.filter((val) => val.id !== id);
    }

    function updateTransaction(transaction: Resident) {
        const result = transactions.value.find((item) => item.id === transaction.id);
        Object.assign(result || {}, transaction);
    }

    return {
        transactions,
        fetchTransactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
    };
});
