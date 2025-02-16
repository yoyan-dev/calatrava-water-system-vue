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
				<Toolbar>
					<template #start>
						<div class="flex gap-5">
							<IconField>
								<InputIcon>
									<i class="pi pi-search" />
								</InputIcon>
								<InputText placeholder="Search..." />
							</IconField>
						</div>
					</template>

					<template #end>
						<div class="flex gap-3">
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
							<RouterLink to="/admin/billing/create">
								<Button
									label="Create"
									icon="pi pi-plus"
									severity="primary" />
							</RouterLink>
							<ImportModal />
							<DeleteSelected
								:selectedBills="selectedWaterBill"
								v-if="selectedWaterBill.length" />
						</div>
					</template>
				</Toolbar>
			</div>
			<div class="border rounded-md">
				<DataTable
					:value="store.billings"
					:loading="store.isLoading"
					v-model:selection="selectedWaterBill"
					dataKey="billNumber"
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
					<Column
						header="Bill No."
						field="bill_no">
					</Column>
					<Column
						field="accountno"
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
