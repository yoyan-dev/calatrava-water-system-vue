<script setup lang="ts">
	import { ref, onMounted, watchEffect } from 'vue';
	import { FilterMatchMode } from '@primevue/core/api';
	import Header from '@/pages/admin/billing/_components/header.vue';
	import DeleteModal from '@/pages/admin/billing/_components/modals/delete-modal.vue';
	import DeleteSelected from '@/pages/admin/billing/_components/modals/delete-selected-modal.vue';
	import ViewReciept from '@/pages/admin/billing/_components/modals/view-reciept.vue';
	import viewBillModal from './_components/modals/view-bill-modal.vue';
	import { useBillingStore } from '@/stores/billing';
	import useFirebaseTimestamp from '@/composables/useFirebaseTimestamp';
	import { useRouter } from 'vue-router';
	import ImportModal from './_components/modals/import-modal.vue';
	import { useDialog } from 'primevue';

	const store = useBillingStore();
	const router = useRouter();
	const { formatTimestamp } = useFirebaseTimestamp();
	const selectedWaterBill = ref([]);
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	const menu = ref<any[]>([]);

	const items = ref([
		{
			label: 'Menu',
		},
	]);

	function onToggled(event: Event, index: number) {
		menu.value[index].toggle(event);
	}

	function getStatusLabel(status: String) {
		switch (status) {
			case 'Paid':
				return 'success';

			case 'Pending':
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

	// watchEffect(() => console.log(store.fetchCurrentBillings));
</script>

<template>
	<div class="bg-surface-0 dark:bg-surface-900 mx-5 p-4 py-6 md:p-6 border rounded-lg">
		<Header />
		<div class="flex flex-col gap-3">
			<div>
				<div class="flex items-start">
					<div class="flex gap-5 w-full flex-1">
					<IconField>
						<InputIcon>
							<i class="pi pi-search" />
						</InputIcon>
						<InputText
							v-model="filters['global'].value"
							placeholder="Search..." />
					</IconField>
					</div>
					<div class="flex justify-end gap-3 w-full flex-1">
						<!-- <RouterLink to="/admin/billing/create">
							<Button
								label="Create"
								icon="pi pi-plus"
								severity="primary" />
						</RouterLink> -->
						<ImportModal />
						<DeleteSelected
							:selectedBills="selectedWaterBill"
							v-if="selectedWaterBill.length" />
					</div>
				</div>
			</div>
			<div class="border rounded-md">
				<DataTable
					:value="store.fetchCurrentBillings"
					:loading="store.isLoading"
					v-model:selection="selectedWaterBill"
					dataKey="billNumber"
					size="small"
					:rows="10"
					:filters="filters">
					<template #empty>
						<div class="flex items-center justify-center p-4">
							No billing found.
						</div>
					</template>
					<Column
						selectionMode="multiple"
						style="width: 3rem"
						:exportable="false"></Column>
					<Column header="Bill No.">
						<template #body="slotProps">
							{{ slotProps.index + 1 }}
						</template>
					</Column>
					<Column
						field="residentUid"
						header="AccountNumber"></Column>
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
							<span class="rounded-md text-primary">
								<i name="pi pi-money-bill"></i
								>{{ `₱ ${slotProps.data.waterBill}` }}
							</span>
						</template>
					</Column>
					<Column
						field="area"
						header="Area"></Column>
					<Column header="Status">
						<template #body="slotProps">
							<Tag
								severity="warn"
								:value="slotProps.data.status"></Tag>
						</template>
					</Column>
					<Column header="Actions">
						<template #body="slotProps">
							<Button
								type="button"
								severity="secondary"
								icon="pi pi-ellipsis-v"
								@click="onToggled($event, slotProps.index)"
								text />

							<Popover :ref="(el) => (menu[slotProps.index] = el)">
								<label>Actions</label>
								<div class="flex flex-col">
									<RouterLink to="">
										<viewBillModal :billing="slotProps.data" />
									</RouterLink>
									<RouterLink to="">
										<ViewReciept />
									</RouterLink>
									<RouterLink to="">
										<Button
											icon="pi pi-check"
											severity="success"
											size="small"
											label="mark as paid"
											text />
									</RouterLink>
									<DeleteModal :uid="slotProps.data.residentUid" />
								</div>
							</Popover>
						</template>
					</Column>
				</DataTable>
			</div>
		</div>
	</div>
</template>
