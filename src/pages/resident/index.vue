<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';

onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

const products = ref();

</script>

<template>
    <div class="px-10 py-3 flex flex-col gap-10">
        <div class="card">
            <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem" class="bg-gray-100">
                <template #start>
                    <div class="flex items-center gap-2">
                        <Avatar image="/logo.jpeg" class="mr-2" size="large" shape="circle" />
                        <Button label="Invoice" text plain />
                        <Button label="Payment" text plain />
                        <Button label="Concern" text plain />
                    </div>
                </template>

                <template #end>
                    <div class="flex items-center gap-2">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
                    </div>
                </template>
            </Toolbar>
        </div>
        <div class="bg-surface-50 dark:bg-surface-950 p-5">
            <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
                <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">Invoice</div>
                <div>
                    <Toolbar>
                        <template #start>
                            <div class="bg-gray-50 rounded-full">
                                <Button label="Paid" class="mr-2" severity="secondary" rounded text />
                                <Button label="Unpaid" class="mr-2" severity="secondary" rounded text />
                                <Button label="All" severity="info" variant="light" rounded text />
                            </div>
                        </template>

                        <template #end>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText placeholder="Search" />
                            </IconField>
                        </template>
                    </Toolbar>
                </div>
                <div>
                    <div class="card">
                        <DataTable :value="products" tableStyle="min-width: 50rem">
                            <Column field="code" header="Code"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

