<template>
	<div>
		<DataTable
			v-model:selection="selectedBillings"
			v-model:expandedRows="expandedRows"
			v-model:first="first"
			:value="store.billings"
			:loading="store.isLoading"
			:lazy="true"
			dataKey="billNo"
			size="small"
			class="text-sm"
			:rows="rows"
			:globalFilterFields="['billNo']"
			paginator
			paginatorPosition="bottom"
			:rowsPerPageOptions="[5, 10, 20, 50]"
			:totalRecords="store.totalBillings"
			selectionMode="multiple"
			currentPageReportTemplate="{first} to {last} of {totalRecords}"
			paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
			@page="onPage"
			@update:selection="onSelectionUpdate">
			<template #empty>
				<div class="flex items-center justify-center p-4">
					No billing records found.
				</div>
			</template>
			<Column
				selectionMode="multiple"
				style="width: 3rem"
				:exportable="false" />
			<Column
				expander
				style="width: 5rem" />
			<Column
				class="font-medium"
				header="Bill No."
				field="billNo" />
			<Column
				class="text-primary-600 font-bold"
				header="Account No."
				field="accountNo" />

			<Column header="Customer Name">
				<template #body="slotProps">
					<span class="uppercase">{{ slotProps.data.fullName }}</span>
				</template>
			</Column>

			<Column
				header="Billing Date"
				field="billDate">
				<template #body="slotProps">
					{{ formatDate(slotProps.data.billDate) }}
				</template>
			</Column>
			<Column header="Total Bill">
				<template #body="slotProps">
					<span>{{ formatToPeso(slotProps.data.totalBill) }}</span>
				</template>
			</Column>
			<Column
				class="capitalize font-medium"
				header="Book"
				field="book" />
			<Column header="Status">
				<template #body="slotProps">
					<Tag
						class="capitalize"
						:severity="getSeverity(slotProps.data.paymentStatus ?? 'unpaid')"
						:value="slotProps.data.paymentStatus ?? 'unpaid'"
						rounded />
				</template>
			</Column>
			<Column header="Actions">
				<template #body="slotProps">
					<Button
						type="button"
						severity="secondary"
						icon="pi pi-ellipsis-v"
						text />
				</template>
			</Column>
			<template #expansion="slotProps">
				<BillingExpansion :billing="slotProps.data" />
			</template>
		</DataTable>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import BillingExpansion from './billing-expansion.vue';
	import { useBillingStore } from '@/stores/billing';

	const store = useBillingStore();
	const first = ref(0); // Bind to DataTable
	const rows = ref(10);
	const expandedRows = ref([]);
	const selectedBillings = ref();
	const emit = defineEmits(['updateSelection']);
	const clearSelection = () => {
		selectedBillings.value = [];
	};

	defineExpose({
		clearSelection,
	});

	// Format functions (assume these are imported or defined globally; adjust as needed)
	const formatToPeso = (value: number) => `₱${value.toFixed(2)}`; // Example formatter
	const formatDate = (date: string) => new Date(date).toLocaleDateString(); // Example date formatter

	const onSelectionUpdate = (updatedSelectionData: any) => {
		emit('updateSelection', updatedSelectionData);
	};

	const getSeverity = (status: string) => {
		switch (status.toLowerCase()) {
			case 'paid':
				return 'success';
			case 'unpaid':
				return 'danger';
			case 'partial':
				return 'warning';
			default:
				return 'info';
		}
	};

	const onPage = (event: any) => {
		const offset = event.first;
		const orderByField = event.sortField ?? 'bill_no';
		const orderDirection = event.sortOrder === 1 ? 'ASC' : 'DESC';
		const limit = event.rows;

		first.value = event.first; // Keep DataTable in sync

		store.fetchPaginateBillings({
			limit,
			offset,
			orderByField,
			orderDirection,
		});
	};

	const fetchBillingData = () => {
		store.fetchPaginateBillings({
			limit: rows.value,
			offset: first.value,
			orderByField: 'billNo',
			orderDirection: 'DESC',
		});
	};

	// Initial load
	onMounted(() => {
		fetchBillingData();
		store.fetchCountBillings();
	});
</script>
