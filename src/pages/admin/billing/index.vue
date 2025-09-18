<script setup lang="ts">
	import {
		ref,
		onMounted,
		watchEffect,
		nextTick,
		defineAsyncComponent,
	} from 'vue';
	import Header from '@/pages/admin/billing/_components/header.vue';
	import DeleteSelected from '@/pages/admin/billing/_components/modals/delete-selected-modal.vue';
	import { useBillingStore } from '@/stores/billing';
	import ImportModal from './_components/modals/import-modal.vue';
	import { getSeverity } from '@/composables/getSeverity';
	import { useDialog } from 'primevue';
	import type { Billing } from '@/types/billing';
	import { formatToPeso } from '@/composables/currencyFormat';

	const ViewReciept = defineAsyncComponent(
		() => import('@/pages/admin/billing/_components/modals/view-reciept.vue'),
	);

	const MarkPaid = defineAsyncComponent(
		() =>
			import('@/pages/admin/billing/_components/modals/mark-as-paid-modal.vue'),
	);

	const deleteBilling = defineAsyncComponent(
		() => import('@/pages/admin/billing/_components/modals/delete-modal.vue'),
	);

	const store = useBillingStore();
	const dialog = useDialog();
	const selectedWaterBill = ref([]);
	const expandedRows = ref({});
	const op = ref();
	const selectedBill = ref<Billing | null>();

	function onToggled(event: Event, billing: Billing) {
		op.value.hide();

		if (selectedBill.value?.uid === billing.uid) {
			selectedBill.value = null;
		} else {
			selectedBill.value = billing;

			nextTick(() => {
				op.value.show(event);
			});
		}
	}

	function hidePopover() {
		op.value.hide();
	}

	onMounted(() => {
		store.fetchBillings();
	});

	watchEffect(() => console.log(store.billings));
</script>

<template>
	<div
		class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg shadow-sm">
		<Header :totalBillings="store.totalBillings" />
		<div class="flex flex-col gap-3">
			<div>
				<div class="flex gap-5 flex-wrap items-start">
					<div class="flex-1">
						<IconField>
							<InputIcon>
								<i class="pi pi-search" />
							</InputIcon>
							<InputText
								v-model="store.searchQuery"
								placeholder="Search..." />
						</IconField>
					</div>
					<div class="flex gap-3 justify-start md:justify-end w-full flex-1">
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
					dataKey="billNo"
					size="small"
					:rows="10">
					<template #empty>
						<div class="flex items-center justify-center p-4">
							No billing found.
						</div>
					</template>
					<Column
						class="whitespace-nowrap text-ellipsis"
						selectionMode="multiple"
						style="width: 3rem"
						:exportable="false"></Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						expander
						style="width: 5rem" />
					<Column
						class="whitespace-nowrap text-ellipsis"
						header="Bill No."
						field="billNo">
					</Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						field="accountno"
						header="AccountNumber"></Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						field="billDate"
						header="Billing Date">
					</Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						header="Total Bill">
						<template #body="slotProps">
							<span class="rounded-md text-primary">
								<i name="pi pi-money-bill"></i
								>{{ formatToPeso(slotProps.data.totalBill) }}
							</span>
						</template>
					</Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						field="book"
						header="Book"></Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						header="Status">
						<template #body="slotProps">
							<Tag
								:severity="
									getSeverity(slotProps.data.paymentStatus ?? 'unpaid')
								"
								:value="slotProps.data.paymentStatus ?? 'unpaid'"></Tag>
						</template>
					</Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						header="Actions">
						<template #body="slotProps">
							<Button
								type="button"
								severity="secondary"
								icon="pi pi-ellipsis-v"
								@click="onToggled($event, slotProps.data)"
								text />
						</template>
					</Column>
					<template #expansion="slotProps">
						<div class="p-4">
							<h5 class="font-semibold">Bill#{{ slotProps.data.billNo }}</h5>
							<div class="flex gap-5">
								<div class="flex-1 flex flex-col p-3 border rounded-md">
									<h5 class="font-semibold mb-3">Billing Details</h5>
									<div class="flex justify-between items-end gap-3">
										<span>Bill No.:</span>
										<span class="text-gray-500">{{
											slotProps.data.billNo
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Account No.:</span>
										<span class="text-gray-500">{{
											slotProps.data.accountno
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Book:</span>
										<span class="text-gray-500">{{ slotProps.data.book }}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Billing Date:</span>
										<span class="text-gray-500">{{
											slotProps.data.billDate
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Due Date:</span>
										<span class="text-gray-500">{{
											slotProps.data.dueDate
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Disconnection Date:</span>
										<span class="text-gray-500">{{
											slotProps.data.disconDate
										}}</span>
									</div>
								</div>
								<div class="flex-1 flex flex-col p-3 border rounded-md">
									<h5 class="font-semibold mb-3">Charges</h5>
									<div class="flex justify-between items-end gap-3">
										<span>Water Bill:</span>
										<span class="text-gray-500">{{
											slotProps.data.billamnt
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Enviromental Fee:</span>
										<span class="text-gray-500">{{
											slotProps.data.enviromentFee
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Arrears Amount:</span>
										<span class="text-gray-500">{{
											slotProps.data.arrearsamt
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Arrears Env:</span>
										<span class="text-gray-500">{{
											slotProps.data.arrearsenv
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Due Penalty:</span>
										<span class="text-gray-500">{{
											slotProps.data.duePenalty
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Meter Penalty:</span>
										<span class="text-gray-500">{{
											slotProps.data.mPenalty
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Discount:</span>
										<span class="text-gray-500">{{
											slotProps.data.discount
										}}</span>
									</div>
								</div>
								<div class="flex-1 flex flex-col p-3 border rounded-md">
									<h5 class="font-semibold mb-3">Meter Details</h5>
									<div class="flex justify-between items-end gap-3">
										<span>Meter No.:</span>
										<span class="text-gray-500">{{
											slotProps.data.mtrNo
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Current Reading:</span>
										<span class="text-gray-500">{{
											slotProps.data.curreading
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Previous Reading:</span>
										<span class="text-gray-500">{{
											slotProps.data.prereading
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Water Usage:</span>
										<span class="text-gray-500">{{
											slotProps.data.waterusage
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Previous Usage:</span>
										<span class="text-gray-500">{{
											slotProps.data.prevused
										}}</span>
									</div>
								</div>
								<div class="flex-1 flex flex-col p-3 border rounded-md">
									<h5 class="font-semibold mb-3">Additional Information</h5>
									<div class="flex justify-between items-end gap-3">
										<span>Class Type:</span>
										<span class="text-gray-500">{{
											slotProps.data.classtype
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Barangay:</span>
										<span class="text-gray-500">{{
											slotProps.data.billbrgy
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Purok:</span>
										<span class="text-gray-500">{{
											slotProps.data.billpurok
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Verified:</span>
										<span class="text-gray-500">{{
											slotProps.data.verified
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Paid:</span>
										<span class="text-gray-500">{{ slotProps.data.paid }}</span>
									</div>
								</div>
							</div>
							<!-- <DataTable :value="slotProps.data.orders">
								<Column class="whitespace-nowrap text-ellipsis" field="id" header="Id" sortable></Column>
								<Column class="whitespace-nowrap text-ellipsis" field="customer" header="Customer" sortable></Column>
								<Column class="whitespace-nowrap text-ellipsis" field="date" header="Date" sortable></Column>
							</DataTable> -->
						</div>
					</template>
				</DataTable>
				<Paginator
					:template="{
						'640px': 'PrevPageLink CurrentPageReport NextPageLink',
						'960px':
							'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
						'1300px':
							'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
						default:
							'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
					}"
					:rows="10"
					@page="(e) => (store.page = e.page + 1)"
					:totalRecords="store.totalBillings">
				</Paginator>
			</div>
		</div>
	</div>
	<Popover ref="op">
		<div class="flex flex-col items-start">
			<Button
				icon="pi pi-wallet"
				severity="secondary"
				label="View Receipt"
				size="small"
				@click="
					() => {
						dialog.open(ViewReciept, {
							props: {
								header: 'View Reciept',
								style: {
									width: '50vw',
								},
								breakpoints: {
									'960px': '75vw',
									'640px': '90vw',
								},
								modal: true,
							},
							data: {
								user: selectedBill,
							},
						});
						hidePopover();
					}
				"
				text />
			<Button
				v-if="selectedBill?.paymentStatus !== 'paid'"
				icon="pi pi-check"
				severity="success"
				size="small"
				label="mark as paid"
				text
				@click="
					() => {
						dialog.open(MarkPaid, {
							props: {
								header: selectedBill?.paymentReceipt
									? 'Mark as Paid?'
									: 'Mark as Paid without Receipt?',
								style: {
									width: '50vw',
								},
								breakpoints: {
									'960px': '75vw',
									'640px': '90vw',
								},
								modal: true,
							},
							data: {
								user: selectedBill,
							},
						});
						hidePopover();
					}
				" />

			<Button
				icon="pi pi-trash"
				severity="danger"
				label="delete"
				size="small"
				text
				@click="
					() => {
						dialog.open(deleteBilling, {
							props: {
								header: 'Confirm',
								style: {
									width: '50vw',
								},
								breakpoints: {
									'960px': '75vw',
									'640px': '90vw',
								},
								modal: true,
							},
							data: {
								uid: selectedBill?.uid,
								accountno: selectedBill?.accountno,
							},
						});
						hidePopover();
					}
				" />
		</div>
	</Popover>
</template>
