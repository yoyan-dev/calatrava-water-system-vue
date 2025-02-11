<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Billing } from '@/types/billing';

const billings = ref<Billing[]>([]);
const columns = [
    { field: 'billNumber', header: 'Bill No.' },
    { field: 'billingDate', header: 'Billing Date' },
    { field: 'waterBill', header: 'Water Bill' },
    { field: 'area', header: 'Area' },
    { field: 'status', header: 'Status' }
];

</script>

<template>
    <div class="card">
        <DataTable :value="billings" tableStyle="min-width: 50rem" header="List of Billings" size="small">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
        </DataTable>
    </div>
</template>
