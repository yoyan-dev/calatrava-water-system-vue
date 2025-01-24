import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';

export const useTransactionStore = defineStore('transaction', () => {
    const transactions = ref<Resident[]>([]);

    function fetchResidents() {
        transactions.value = [
            { id: '1', firstName: 'test', middleName: 'tst', lastName: 'erf' },
        ];
    }

    function addTransaction(transaction: Resident) {
        transaction.id = (transactions.value.length + 1).toString();
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
        fetchResidents,
        addTransaction,
        deleteTransaction,
        updateTransaction,
    };
});
