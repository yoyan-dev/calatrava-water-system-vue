<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { FilterMatchMode } from '@primevue/core/api';
	import { useToast } from 'primevue/usetoast';
	import Header from '@/pages/admin/billing/_components/header.vue';
	import DeleteModal from '@/pages/admin/billing/_components/modals/delete-modal.vue';
	import { formatToPeso } from '@/composables/currencyFormat';
	import { useBillingStore } from '@/stores/billing';

	const store = useBillingStore();
	const toast = useToast();
	const dt = ref();
	const selectedWaterBill = ref();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	function exportCSV() {
		dt.value.exportCSV();
	}

	function getStatusLabel(status: String) {
		switch (status) {
			case 'Paid':
				return 'success';

			case 'LOWSTOCK':
				return 'warn';

			case 'OUTOFSTOCK':
				return 'danger';

			default:
				return null;
		}
	}

	onMounted(() => {
		store.fetchBillings();
	});
</script>

<template>
	<div>
		<div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
			<Header />
			<div>
				<div>
					<DataTable
						ref="dt"
						v-model:selection="selectedWaterBill"
						:value="store.billings"
						dataKey="id"
						size="small"
						:paginator="true"
						:rows="10"
						:filters="filters"
						paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
						:rowsPerPageOptions="[5, 10, 25]"
						currentPageReportTemplate="Showing {first} to {last} of {totalRecords} water bills">
						<template #header>
							<div>
								<Toolbar>
									<template #start>
										<RouterLink to="/admin/billing/create">
											<Button
												label="Create"
												icon="pi pi-plus"
												severity="primary" />
										</RouterLink>
										<!-- <Button label="Delete" icon="pi pi-trash" severity="danger" outlined :disabled="!selectedWaterBill || !selectedWaterBill.length" /> -->
									</template>

									<template #end>
										<div class="flex gap-5">
											<IconField>
												<InputIcon>
													<i class="pi pi-search" />
												</InputIcon>
												<InputText
													v-model="filters['global'].value"
													placeholder="Search..." />
											</IconField>
											<!-- <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" /> -->
										</div>
									</template>
								</Toolbar>
							</div>
						</template>

						<Column
							selectionMode="multiple"
							:exportable="false"></Column>
						<Column
							field="billNumber"
							header="Bill No."
							sortable></Column>
						<Column
							field="billingDate"
							header="Billing Date"
							sortable></Column>
						<Column
							field="waterBill"
							header="Water Bill"
							sortable>
							<template #body="slotProps">
								{{ formatToPeso(slotProps.data.waterBill) }}
							</template>
						</Column>
						<Column
							field="address"
							header="Area"
							sortable></Column>
						<Column
							field="status"
							header="Status"
							sortable>
							<template>
                                <Tag value="PAID" severity="success" />
                            </template>
						</Column>
						<Column
							:exportable="false"
							header="Actions">
							<template #body="slotProps">
								<div class="flex">
									<RouterLink :to="`/admin/billing/${slotProps.data.uid}`">
										<Button
											icon="pi pi-eye"
											severity="secondary"
											text />
									</RouterLink>
									<RouterLink :to="`/admin/billing/update/${slotProps.data.uid}`">
										<Button icon="pi pi-pen-to-square"
										severity="success"
										text />
									</RouterLink>
									<DeleteModal :uid="slotProps.data.uid" />
								</div>
							</template>
						</Column>
					</DataTable>
				</div>
			</div>
		</div>
	</div>
</template>
