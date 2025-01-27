<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { FilterMatchMode } from '@primevue/core/api';
    import { useToast } from 'primevue/usetoast';
    import { ProductService } from '@/service/ProductService';
    import Header from '@/pages/admin/transaction/_components/Header.vue';
    import CreateModal from '@/pages/admin/transaction/_components/modals/create-modal.vue'
    import UpdateModal from '@/pages/admin/transaction/_components/modals/update-modal.vue';
    import DeleteModal from '@/pages/admin/transaction/_components/modals/delete-modal.vue'
    import { formatToPeso } from '@/composables/currencyFormat';
    import { useTransactionStore } from '@/stores/transaction';

    const store = useTransactionStore()
    const toast = useToast();
    const dt = ref();
    const selectedWaterBill = ref();
    const filters = ref({
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    });

    function exportCSV () {
        dt.value.exportCSV();
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

    onMounted(() => {
        store.fetchTransactions();
    });
</script>

<template>
    <div>
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
            <Header/>
            <div>
                <div>
                    
                    <DataTable
                    ref="dt"
                    v-model:selection="selectedWaterBill"
                    :value="store.transactions"
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
                        <Column field="billNo" header="Bill No." sortable ></Column>
                        <Column field="billingDate" header="Billing Date" sortable ></Column>
                        <!-- <Column header="Image">
                            <template #body="slotProps">
                                <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                            </template>
                        </Column> -->
                        <Column field="waterBill" header="Water Bill" sortable >
                            <template #body="slotProps">
                                {{ formatToPeso(slotProps.data.waterBill) }}
                            </template>
                        </Column>
                        <Column field="area" header="Area" sortable ></Column>
                        <Column field="status" header="Status" sortable>
                            <!-- <template #body="slotProps">
                                <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                            </template> -->
                        </Column>
                        <Column :exportable="false" header="Actions">
                            <template #body="slotProps">
                                <div class="flex">
                                    <Button icon="pi pi-eye" severity="secondary" text />
                                    <UpdateModal v-bind="slotProps.data" />
                                    <DeleteModal :id="slotProps.data.id"/>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
