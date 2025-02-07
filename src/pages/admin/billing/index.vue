<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { FilterMatchMode } from '@primevue/core/api';
	import Header from '@/pages/admin/billing/_components/header.vue';
	import DeleteModal from '@/pages/admin/billing/_components/modals/delete-modal.vue';
	import ViewReciept from '@/pages/admin/billing/_components/modals/view-reciept.vue';
	import { formatToPeso } from '@/composables/currencyFormat';
	import { useBillingStore } from '@/stores/billing';
	import useFirebaseTimestamp from '@/composables/useFirebaseTimestamp';
	import { useRouter } from 'vue-router';

	const store = useBillingStore();
	const router = useRouter()
	const { formatTimestamp } = useFirebaseTimestamp();
	const selectedWaterBill = ref();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	const menu = ref()

	const items = ref([
		{
			label: 'Menu',
		},
	]);

	function toggle (event: any) {
		menu.value.toggle(event);
	};

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
	<div class="bg-surface-0 dark:bg-surface-900 p-6 border rounded-lg">
		<Header />
		<div class="flex flex-col gap-3">
			<div>
				<Toolbar>
					<template #end>
						<RouterLink to="/admin/billing/create">
							<Button
								label="Create"
								icon="pi pi-plus"
								severity="primary" />
						</RouterLink>
						<!-- <Button label="Delete" icon="pi pi-trash" severity="danger" outlined :disabled="!selectedWaterBill || !selectedWaterBill.length" /> -->
					</template>
	
					<template #start>
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
							<span class="px-2 py-1 rounded-md bg-primary-50 text-primary">
								<i name="pi pi-money-bill"></i>{{ `₱ ${slotProps.data.waterBill}` }}
							</span>
						</template>
					</Column>
					<Column
						field="address"
						header="Area"></Column>
					<Column
						header="Status">
						<template #body>
							<Tag severity="warn" value="Unpaid"></Tag>
						</template>
					</Column>
					<Column header="Actions">
						<template #body="slotProps">
							<Button type="button" severity="secondary" icon="pi pi-ellipsis-v" @click="toggle"  text/>

							<Popover ref="menu">
								<label>Actions</label>
								<div class="flex flex-col">
									<RouterLink :to="`/admin/billing/${slotProps.data.uid}`">
										<Button
											icon="pi pi-eye"
											severity="secondary"
											label="view"
											size="small"
											text />
									</RouterLink>
									<RouterLink :to="`/admin/billing/update/${slotProps.data.uid}`">
										<Button
											icon="pi pi-pen-to-square"
											severity="secondary"
											size="small"
											label="edit"
											text />
									</RouterLink>
									<RouterLink to="">
										<ViewReciept/>
									</RouterLink>
									<RouterLink to="">
										<Button
											icon="pi pi-check"
											severity="success"
											size="small"
											label="mark as paid"
											text />
									</RouterLink>
									<DeleteModal :uid="slotProps.data.uid" />
								</div>
							</Popover>
							<!-- <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" text/>
							<TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
								<template #item="{ item}">
									<label>{{ item.label }}</label>
									<div class="flex flex-col">
										<RouterLink :to="`/admin/billing/${slotProps.data.uid}`">
											<Button
												icon="pi pi-eye"
												severity="secondary"
												label="view"
												size="small"
												text />
										</RouterLink>
										<RouterLink :to="`/admin/billing/update/${slotProps.data.uid}`">
											<Button
												icon="pi pi-pen-to-square"
												severity="secondary"
												size="small"
												label="edit"
												text />
										</RouterLink>
										<RouterLink to="">
											<Button
												icon="pi pi-wallet"
												severity="secondary"
												label="view reciept"
												size="small"
												text />
										</RouterLink>
										<RouterLink to="">
											<Button
												icon="pi pi-pen-to-square"
												severity="secondary"
												size="small"
												label="mark as paid"
												text />
										</RouterLink>
										<DeleteModal :uid="slotProps.data.uid" />
									</div>
								</template>
							</TieredMenu> -->
						</template>
					</Column>
				</DataTable>
			</div>
		</div>
	</div>
</template>
