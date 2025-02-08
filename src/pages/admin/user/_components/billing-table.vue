<script setup>
import { ref, onMounted } from 'vue';

const billings = ref();
const columns = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' }
];

</script>

<template>
    <div class="card">
        <DataTable :value="billings" tableStyle="min-width: 50rem" header="List of Billings" size="small">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
        </DataTable>
    </div>
</template>
