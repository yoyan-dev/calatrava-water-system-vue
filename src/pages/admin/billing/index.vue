<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { FilterMatchMode } from '@primevue/core/api';
	import Header from '@/pages/admin/billing/_components/header.vue';
	import DeleteModal from '@/pages/admin/billing/_components/modals/delete-modal.vue';
	import { formatToPeso } from '@/composables/currencyFormat';
	import { useBillingStore } from '@/stores/billing';
	import useFirebaseTimestamp from '@/composables/useFirebaseTimestamp';

	const store = useBillingStore();
	const { formatTimestamp } = useFirebaseTimestamp();
	const selectedWaterBill = ref();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

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
	<div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
		<Header />
		<div class="flex flex-col gap-3">
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
			<div class="border rounded-md">
				<DataTable
					:value="store.billings"
					:loading="store.isLoading"
					dataKey="uid"
					size="small"
					:rows="10"
					:filters="filters">
					<Column
						field="billNumber"
						header="Bill No."></Column>
					<Column
						field="uid"
						header="UID"></Column>
					<Column
						field="billingDate"
						header="Billing Date">
						<template #body="slotProps">
							{{ formatTimestamp(slotProps.data.billingDate) }}
						</template>
					</Column>
					<Column
						field="waterBill"
						header="Water Bill">
						<template #body="slotProps">
							{{ `₱${slotProps.data.waterBill}` }}
						</template>
					</Column>
					<Column
						field="address"
						header="Area"></Column>
					<Column
						field="status"
						header="Status">
						<template>
							<Tag
								value="PAID"
								severity="success" />
						</template>
					</Column>
					<Column header="Actions">
						<template #body="slotProps">
							<div class="flex">
								<RouterLink :to="`/admin/billing/${slotProps.data.uid}`">
									<Button
										icon="pi pi-eye"
										severity="secondary"
										text />
								</RouterLink>
								<RouterLink :to="`/admin/billing/update/${slotProps.data.uid}`">
									<Button
										icon="pi pi-pen-to-square"
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
</template>
