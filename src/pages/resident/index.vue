<script setup>
    import { ref, onMounted } from 'vue';
    import { ProductService } from '@/service/ProductService';
    import Header from '@/pages/resident/_components/header.vue';

    
    onMounted(() => {
        ProductService.getProductsMini().then((data) => (products.value = data));
    });

    const products = ref();

    const value = ref('Current');
    const options = ref(['Current', 'Previous']);
</script>

<template>
    <div class="sm:px-0 md:px-5 lg:px-10 xl:px-10 sm:py-0 md:py-1 lg:py-3 xl:lg:py-3 flex flex-col gap-10 bg-surface-50 dark:bg-surface-950">
        <Header/>
        <div class="bg-white sm:w-screen md:w-auto lg:w-auto">
            <div class="bg-surface-0 dark:bg-surface-900 py-6 shadow rounded-border px-2">
                <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">Invoice</div>
                <div>
                    <Toolbar>
                        <template #start>
                            <SelectButton severity="primary" v-model="value" :options="options"/>
                        </template>

                        <template #end>
                            <div class="w-full">
                                <IconField>
                                    <InputIcon>
                                        <i class="pi pi-search" />
                                    </InputIcon>
                                    <InputText placeholder="Search" />
                                </IconField>
                            </div>
                        </template>
                    </Toolbar>
                </div>
                <div>
                    <div>
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

