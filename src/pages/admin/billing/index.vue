<script setup lang="ts">
	import { ref, onMounted, watchEffect, watch } from 'vue';
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
	const menu = ref<any[]>([]);
	const expandedRows = ref({});

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
		store.fetchBillings({ month: store.month });
	});
</script>

<template>
	<div class="bg-surface-0 dark:bg-surface-900 mx-5 p-4 py-6 md:p-6 border rounded-lg">
		<Header />
		<div class="flex flex-col gap-3">
			<div>
				<div class="flex gap-5 flex-wrap items-start">
					<div class="flex-1">
						<IconField>
							<InputIcon>
								<i class="pi pi-search" />
							</InputIcon>
							<InputText
								placeholder="Search..." />
						</IconField>
					</div>
					<div class="flex gap-3 justify-end md:justify-end w-full flex-1">
						<!-- <RouterLink to="/admin/billing/create">
							<Button
								label="Create"
								icon="pi pi-plus"
								severity="primary" />
						</RouterLink> -->
						<FloatLabel variant="on">
							<DatePicker
								v-model:modelValue="store.month"
								inputId="on_label"
								view="month"
								dateFormat="MM yy"
								showIcon
								iconDisplay="input" />
							<label for="on_label">Select month</label>
						</FloatLabel>
						<ImportModal />
						<DeleteSelected
							:selectedBills="selectedWaterBill"
							v-if="selectedWaterBill.length" />
					</div>
				</div>
			</div>
			<div class="border rounded-md">
				<DataTable
					v-model:expandedRows="expandedRows"
					:value="store.billings"
					:loading="store.isLoading"
					v-model:selection="selectedWaterBill"
					dataKey="bill_no"
					size="small"
					:rows="10">
					<template #empty>
						<div class="flex items-center justify-center p-4">
							No billing found.
						</div>
					</template>
					<Column
						selectionMode="multiple"
						style="width: 3rem"
						:exportable="false"></Column>
					<Column expander style="width: 5rem" />
					<Column
						header="Bill No."
						field="bill_no">
					</Column>
					<Column
						field="accountno"
						header="AccountNumber"></Column>
					<Column
						field="bill_date"
						header="Billing Date">
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
						field="address"
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
									<!-- <RouterLink to="">
										<viewBillModal :billing="slotProps.data" />
									</RouterLink> -->
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
					<template #expansion="slotProps">
						<div class="p-4">
							<h5 class="font-semibold">Bill#{{ slotProps.data.bill_no }}</h5>
							<div class="flex gap-5 justify-between">
								<div class="flex-1 flex flex-col p-3 border rounded-md">
									<div class="flex-1 flex justify-between">Account No.: <span class="text-gray-500 text-left">{{ slotProps.data.accountno }}</span></div>
									<div class="flex-1 flex justify-between">Address:     <span class="text-gray-500 text-left">{{ slotProps.data.address }}</span></div>
									<div class="flex-1 flex justify-between">Arrears:     <span class="text-gray-500 text-left">{{ slotProps.data.arrears }}</span></div>
									<div class="flex-1 flex justify-between">Average use: <span class="text-gray-500 text-left">{{ slotProps.data.averageuse }}</span></div>
									<div class="flex-1 flex justify-between">Bill Date:   <span class="text-gray-500 text-left">{{ slotProps.data.bill_date }}</span></div>
								</div>
								<div class="flex-1 flex flex-col p-3 border rounded-md">
									<div class="flex-1 flex justify-between">Bill No.: <span class="text-gray-500">{{ slotProps.data.bill_no }}</span></div>
									<div class="flex-1 flex justify-between">Route No.:     <span class="text-gray-500">{{ slotProps.data.c_route_no }}</span></div>
									<div class="flex-1 flex justify-between">Statdesc:     <span class="text-gray-500">{{ slotProps.data.c_statdesc }}</span></div>
									<div class="flex-1 flex justify-between">c_type: <span class="text-gray-500">{{ slotProps.data.c_type }}</span></div>
									<div class="flex-1 flex justify-between">Disconnection Date:   <span class="text-gray-500">{{ slotProps.data.discon_dat }}</span></div>
								</div>
								<div class="flex-1 flex flex-col p-3 border rounded-md">
									<div class="flex-1 flex justify-between">Due Date: <span class="text-gray-500">{{ slotProps.data.due_date }}</span></div>
									<div class="flex-1 flex justify-between">Install Fee:     <span class="text-gray-500">{{ slotProps.data.installfee }}</span></div>
									<div class="flex-1 flex justify-between">Meter Code:     <span class="text-gray-500">{{ slotProps.data.metercode }}</span></div>
									<div class="flex-1 flex justify-between">Mrrf: <span class="text-gray-500">{{ slotProps.data.mrrf }}</span></div>
									<div class="flex-1 flex justify-between">Meter No.:   <span class="text-gray-500">{{ slotProps.data.mtr_no }}</span></div>
								</div>
								<div class="flex-1 flex flex-col p-3 border rounded-md">
									<div class="flex-1 flex justify-between">Pre Reading: <span class="text-gray-500">{{ slotProps.data.prereading }}</span></div>
									<div class="flex-1 flex justify-between">Prorated:     <span class="text-gray-500">{{ slotProps.data.prorated }}</span></div>
									<div class="flex-1 flex justify-between">Prvmr_date:     <span class="text-gray-500">{{ slotProps.data.prvmr_date }}</span></div>
									<div class="flex-1 flex justify-between">Reminders: <span class="text-gray-500">{{ slotProps.data.reminders }}</span></div>
									<div class="flex-1 flex justify-between">Res2:   <span class="text-gray-500">{{ slotProps.data.res2 }}</span></div>
								</div>
							</div>
							<!-- <DataTable :value="slotProps.data.orders">
								<Column field="id" header="Id" sortable></Column>
								<Column field="customer" header="Customer" sortable></Column>
								<Column field="date" header="Date" sortable></Column>
							</DataTable> -->
						</div>
					</template>
				</DataTable>
			</div>
		</div>
	</div>
</template>
