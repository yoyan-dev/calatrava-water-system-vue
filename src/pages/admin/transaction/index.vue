<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/service/ProductService';
import CreateModal from '@/pages/admin/transaction/_components/modals/create-modal.vue'
import UpdateModal from './_components/modals/update-modal.vue';
import DeleteModal from '@/pages/admin/transaction/_components/modals/delete-modal.vue'

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const statuses = ref([
    {label: 'INSTOCK', value: 'instock'},
    {label: 'LOWSTOCK', value: 'lowstock'},
    {label: 'OUTOFSTOCK', value: 'outofstock'}
]);

const formatCurrency = (value) => {
    if(value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    return;
};

const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

</script>

<template>
    <div>
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
            <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">Transactions</div>
            <div>
                <div>
                    <Toolbar class="mb-6">
                        <template #start>
                            <CreateModal/>
                            <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </template>

                        <template #end>
                            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
                            <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                        </template>
                    </Toolbar>

                    <DataTable
                        ref="dt"
                        v-model:selection="selectedProducts"
                        :value="products"
                        dataKey="id"
                        :paginator="true"
                        :rows="10"
                        :filters="filters"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    >
                        <template #header>
                            <div class="flex flex-wrap gap-2 items-center justify-between">
                                <h4 class="m-0">Manage Products</h4>
                                <IconField>
                                    <InputIcon>
                                        <i class="pi pi-search" />
                                    </InputIcon>
                                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                                </IconField>
                            </div>
                        </template>

                        <Column selectionMode="multiple"  :exportable="false"></Column>
                        <Column field="code" header="Code" sortable ></Column>
                        <Column field="name" header="Name" sortable ></Column>
                        <Column header="Image">
                            <template #body="slotProps">
                                <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                            </template>
                        </Column>
                        <Column field="price" header="Price" sortable >
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.price) }}
                            </template>
                        </Column>
                        <Column field="category" header="Category" sortable ></Column>
                        <Column field="inventoryStatus" header="Status" sortable>
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                            </template>
                        </Column>
                        <Column :exportable="false" >
                            <template #body="slotProps">
                                <div class="flex">
                                    <UpdateModal :product="slotProps.data" :isNew="false"/>
                                    <DeleteModal :product="slotProps.data"/>
                                </div>
                            </template>
                        </Column>
                    </DataTable>


                    <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                        <div class="flex items-center gap-4">
                            <i class="pi pi-exclamation-triangle !text-3xl" />
                            <span v-if="product">Are you sure you want to delete the selected products?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                        </template>
                    </Dialog>
                </div>
            </div>
        </div>
    </div>
</template>
