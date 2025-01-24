<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/service/ProductService';
import CreateModal from '@/pages/admin/transaction/_components/modals/create-modal.vue'
import UpdateModal from './_components/modals/update-modal.vue';
import DeleteModal from '@/pages/admin/transaction/_components/modals/delete-modal.vue'
import { formatToPeso } from '@/composables/currencyFormat';

onMounted(() => {
    ProductService.getProducts().then((data: Object) => (waterBills.value = data));
});

const toast = useToast();
const dt = ref();
const waterBills = ref();
const deleteWaterBillDialog = ref(false);
const product = ref({});
const selectedWaterBill = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

function exportCSV () {
    dt.value.exportCSV();
};

function confirmDeleteSelected () {
    deleteWaterBillDialog.value = true;
};

function deleteSelectedWaterBill () {
    waterBills.value = waterBills.value.filter((val: Object) => !selectedWaterBill.value.includes(val));
    deleteWaterBillDialog.value = false;
    selectedWaterBill.value = null;
    toast.add({severity:'success', summary: 'Successful', detail: 'waterBills Deleted', life: 3000});
};

function getStatusLabel (status: String) {
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
            <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">Wate Bills</div>
            <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">Manage Water Bill List</div>
            <div>
                <div>
                    
                    <DataTable
                    ref="dt"
                    v-model:selection="selectedWaterBill"
                    :value="waterBills"
                    dataKey="id"
                    size="small"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} water bills"
                    >
                        <template #header>
                            <div>
                                <Toolbar>
                                    <template #start>
                                        <CreateModal/>
                                        <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedWaterBill || !selectedWaterBill.length" />
                                    </template>
                                    
                                    <template #end>
                                        <div class="flex gap-5">
                                            <IconField>
                                                <InputIcon>
                                                    <i class="pi pi-search" />
                                                </InputIcon>
                                            </IconField>
                                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                                            <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                                        </div>
                                    </template>
                                </Toolbar>
                            </div>
                        </template>

                        <Column selectionMode="multiple"  :exportable="false"></Column>
                        <Column field="code" header="Bill No." sortable ></Column>
                        <Column field="name" header="Billing Date" sortable ></Column>
                        <!-- <Column header="Image">
                            <template #body="slotProps">
                                <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                            </template>
                        </Column> -->
                        <Column field="price" header="Water Bill" sortable >
                            <template #body="slotProps">
                                {{ formatToPeso(slotProps.data.price) }}
                            </template>
                        </Column>
                        <Column field="category" header="Area" sortable ></Column>
                        <Column field="inventoryStatus" header="Status" sortable>
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                            </template>
                        </Column>
                        <Column :exportable="false" header="Actions">
                            <template #body="slotProps">
                                <div class="flex">
                                    <Button icon="pi pi-eye" severity="secondary" text @click="deleteWaterBillDialog = false" />
                                    <UpdateModal :waterBill="slotProps.data"/>
                                    <DeleteModal :waterBill="slotProps.data"/>
                                </div>
                            </template>
                        </Column>
                    </DataTable>


                    <Dialog v-model:visible="deleteWaterBillDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                        <div class="flex items-center gap-4">
                            <i class="pi pi-exclamation-triangle !text-3xl" />
                            <span v-if="product">Are you sure you want to delete the selected water bills?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" text @click="deleteWaterBillDialog = false" />
                            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedWaterBill" />
                        </template>
                    </Dialog>
                </div>
            </div>
        </div>
    </div>
</template>
