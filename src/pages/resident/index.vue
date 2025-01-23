<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';

onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

const products = ref();

const value = ref('All');
const options = ref(['All', 'Unpaid', 'Paid']);
</script>

<template>
    <div class="sm:px-0 md:px-5 lg:px-10 xl:px-10 sm:py-0 md:py-1 lg:py-3 xl:lg:py-3 flex flex-col gap-10">
        <div>
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
                            <SelectButton v-model="value" :options="options"/>
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
                        <DataTable :value="products" size="small">
                            <Column field="code" header="Bill Date"></Column>
                            <Column field="name" header="Water Bill"></Column>
                            <Column field="category" header="Due Date"></Column>
                            <Column field="quantity" header="Status"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

