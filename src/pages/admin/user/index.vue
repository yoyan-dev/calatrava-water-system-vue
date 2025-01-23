<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/service/ProductService';
import CreateOrUpdateResident from '@/components/resident/createOrUpdate/index.vue'
import DeleteResident from '@/components/resident/delete/index.vue'
import { formatToPeso } from '@/composables/currencyFormat';

onMounted(() => {
    ProductService.getProducts().then((data: Object) => (users.value = data));
});

const toast = useToast();
const dt = ref();
const users = ref();
const deleteUsersDialog = ref(false);
const product = ref({});
const selectedUsers = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

function confirmDeleteSelected (){
    deleteUsersDialog.value = true;
};

function deleteSelectedUsers () {
    users.value = users.value.filter((val: Object) => !selectedUsers.value.includes(val));
    deleteUsersDialog.value = false;
    selectedUsers.value = null;
    toast.add({severity:'success', summary: 'Successful', detail: 'users Deleted', life: 3000});
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
                        v-model:selection="selectedUsers"
                        :value="users"
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
                                    <create-or-update-resident product="" :isNew="true"/>
                                    <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" />
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
                                <div>{{ slotProps.data.name }}</div>
                            </template>
                        </Column>
                        <Column header="Email">
                            <template #body="slotProps">
                                <div class="text-sm text-gray-500 dark:text-gray-400">sample@gmail.com</div>
                            </template>
                        </Column>
                        <Column field="category" header="Address" sortable >
                        </Column>
                        <Column field="category" header="Classification" sortable ></Column>
                        <Column field="price" header="Water Bill" sortable>
                            <template #body="slotProps">
                                {{ formatToPeso(slotProps.data.price) }}
                            </template>
                        </Column>
                        <Column :exportable="false" >
                            <template #body="slotProps">
                                <div class="flex">
                                    <create-or-update-resident :product="slotProps.data" :isNew="false"/>
                                    <delete-resident :product="slotProps.data"/>
                                </div>
                            </template>
                        </Column>
                    </DataTable>


                    <Dialog v-model:visible="deleteUsersDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                        <div class="flex items-center gap-4">
                            <i class="pi pi-exclamation-triangle !text-3xl" />
                            <span v-if="product">Are you sure you want to delete the selected users?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" text @click="deleteUsersDialog = false" />
                            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedUsers" />
                        </template>
                    </Dialog>
                </div>
            </div>
        </div>
    </div>
</template>
