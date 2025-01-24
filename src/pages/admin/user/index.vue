<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/service/ProductService';
import CreateModal from './_components/modals/create-modal.vue';
import DeleteModal from './_components/modals/delete-modal.vue';
import UpdateModal from './_components/modals/update-modal.vue';
import { formatToPeso } from '@/composables/currencyFormat';
import { useResidentStore } from '@/stores/residentStore';

const residentStore = useResidentStore()
const toast = useToast();
const dt = ref();
const residents = ref([]);
const deleteResidentsDialog = ref(false);
const product = ref({});
const selectedResidents = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const isLoading = ref(false)
onMounted(() => {
    isLoading.value = true
    residents.value = residentStore.fetchResidents()
    isLoading.value = false
})

function confirmDeleteSelected (){
    deleteResidentsDialog.value = true;
};

function deleteSelectedResidents () {
    // residents.value = residents.value.filter((val: Object) => !selectedResidents.value.includes(val));
    // deleteResidentsDialog.value = false;
    // selectedResidents.value = null;
    // toast.add({severity:'success', summary: 'Successful', detail: 'residents Deleted', life: 3000});
};
</script>

<template>
    <div>
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
            <div class="text-3xl font-medium text-surface-900 dark:text-surface-0 mb-2">Residents</div>
            <div class="font-medium text-surface-500 dark:text-surface-300 mb-4">Manage Resident List</div>
            <div>
                <div>
                    
                    <DataTable
                        ref="dt"
                        v-model:selection="selectedResidents"
                        :value="residents"
                        :loading="isLoading"
                        dataKey="id"
                        size="small"
                        :paginator="true"
                        :rows="10"
                        :filters="filters"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    >
                        <template #header>
                            <Toolbar >
                                <template #start>
                                    <CreateModal/>
                                    <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedResidents || !selectedResidents.length" />
                                </template>
        
                                <template #end>
                                    <IconField>
                                        <InputIcon>
                                            <i class="pi pi-search" />
                                        </InputIcon>
                                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                                    </IconField>
                                </template>
                            </Toolbar>
                        </template>

                        <Column selectionMode="multiple"  :exportable="false"></Column>
                        <Column header="Name">
                            <template #body="slotProps">
                                <div>{{ `${slotProps.data.firstName} ${slotProps.data.middleName} ${slotProps.data.lastName}` }}</div>
                            </template>
                        </Column>
                        <Column header="Email">
                            <template #body="slotProps">
                                <div class="text-sm text-gray-500 dark:text-gray-400">sample@gmail.com</div>
                            </template>
                        </Column>
                        <Column field="address" header="Address" sortable >
                        </Column>
                        <Column field="classification" header="Classification" sortable ></Column>
                        <Column field="waterBill" header="Water Bill" sortable>
                            <template #body="slotProps">
                                {{ formatToPeso(slotProps.data.waterBill) }}
                            </template>
                        </Column>
                        <Column :exportable="false" >
                            <template #body="slotProps">
                                <div class="flex">
                                    <UpdateModal :resident="slotProps.data"/>
                                    <DeleteModal :resident="slotProps.data"/>
                                </div>
                            </template>
                        </Column>
                    </DataTable>


                    <Dialog v-model:visible="deleteResidentsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                        <div class="flex items-center gap-4">
                            <i class="pi pi-exclamation-triangle !text-3xl" />
                            <span v-if="product">Are you sure you want to delete the selected users?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" text @click="deleteResidentsDialog = false" />
                            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedResidents" />
                        </template>
                    </Dialog>
                </div>
            </div>
        </div>
    </div>
</template>
