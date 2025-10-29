<template>
	<div>
		<DataTable
			v-model:selection="selectedCollections"
			v-model:expandedRows="expandedRows"
			v-model:first="first"
			:value="store.collections"
			:loading="store.isLoading"
			:lazy="true"
			dataKey="id"
			size="small"
			class="text-sm"
			:rows="rows"
			paginator
			paginatorPosition="bottom"
			:rowsPerPageOptions="[5, 10, 20, 50]"
			:totalRecords="store.totalCollections"
			selectionMode="multiple"
			currentPageReportTemplate="{first} to {last} of {totalRecords}"
			paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
			@page="onPage"
			@update:selection="onSelectionUpdate">
			<template #empty>
				<div class="flex items-center justify-center p-4 text-gray-500">
					No collection payment records found.
				</div>
			</template>

			<!-- Selection Checkbox -->
			<Column
				selectionMode="multiple"
				headerStyle="width: 3rem" />

			<!-- Expansion -->
			<Column
				expander
				style="width: 1rem" />

			<!-- Receipt Number -->
			<Column
				field="receiptNo"
				header="Receipt No.">
				<template #body="slotProps">
					<span class="font-medium text-primary-700 dark:text-primary-500">{{
						slotProps.data.receiptNo
					}}</span>
				</template>
			</Column>

			<!-- Payment Date -->
			<Column
				field="pymtDate"
				header="Payment Date">
				<template #body="slotProps">
					<span class="text-sm">{{ formatDate(slotProps.data.pymtDate) }}</span>
				</template>
			</Column>

			<!-- Account No / Customer -->
			<Column
				field="accountNo"
				header="Account">
				<template #body="slotProps">
					<div
						v-tooltip.bottom="slotProps.data.fullName"
						class="flex flex-col">
						<span class="font-medium text-sm">{{
							slotProps.data.accountNo
						}}</span>
						<span class="text-xs text-gray-600 truncate max-w-xs">{{
							slotProps.data.fullName
						}}</span>
					</div>
				</template>
			</Column>

			<!-- Water Bill -->
			<Column
				field="waterBill"
				header="Water Bill">
				<template #body="slotProps">
					<span class="font-medium text-green-700">{{
						formatToPeso(slotProps.data.waterBill)
					}}</span>
				</template>
			</Column>

			<!-- Cash Paid -->
			<Column
				field="cash"
				header="Cash Paid">
				<template #body="slotProps">
					<span class="font-semibold text-indigo-700">{{
						formatToPeso(slotProps.data.cash)
					}}</span>
				</template>
			</Column>

			<!-- Applied Amount (pacyamnt) -->
			<Column
				field="pacyAmnt"
				header="Applied">
				<template #body="slotProps">
					<span class="text-sm font-medium"
						>₱{{ formatToPeso(slotProps.data.pacyAmnt) }}</span
					>
				</template>
			</Column>

			<!-- Teller -->
			<Column
				field="teller"
				header="Teller">
				<template #body="slotProps">
					<div class="flex items-center gap-1">
						<i class="pi pi-user text-xs text-gray-500"></i>
						<span>{{ slotProps.data.teller }}</span>
					</div>
				</template>
			</Column>

			<!-- Status -->
			<Column
				field="receiptStatus"
				header="Status">
				<template #body="slotProps">
					<Tag
						:value="getStatusLabel(slotProps.data.receiptStatus)"
						:severity="getStatusSeverity(slotProps.data.receiptStatus)"
						class="text-xs" />
				</template>
			</Column>

			<!-- Actions -->
			<Column
				header="Actions"
				headerStyle="width: 4rem"
				bodyStyle="text-align: right">
				<template #body="slotProps">
					<Button
						@click="toggleActionMenu($event, slotProps.data)"
						type="button"
						severity="secondary"
						icon="pi pi-ellipsis-v"
						text
						rounded
						size="small" />
				</template>
			</Column>

			<!-- Expansion -->
			<template #expansion="slotProps">
				<CollectionExpansion :collection="slotProps.data" />
			</template>
		</DataTable>

		<TableROwActions
			ref="actionMenu"
			:rowData="selectedCollectionForAction" />
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import CollectionExpansion from '../panels/collection-expansion.vue';
	import TableROwActions from './table-row-actions.vue';
	import { useCollectionStore } from '@/stores/collection';

	const store = useCollectionStore();
	const first = ref(0); // Bind to DataTable
	const rows = ref(10);
	const expandedRows = ref([]);
	const selectedCollections = ref();
	const selectedCollectionForAction = ref();
	const emit = defineEmits(['updateSelection']);
	const clearSelection = () => {
		selectedCollections.value = [];
	};

	defineExpose({
		clearSelection,
	});

	const actionMenu = ref();
	const toggleActionMenu = (event: any, data: any) => {
		actionMenu.value.toggle(event);
		selectedCollectionForAction.value = data;
	};

	// Format functions (assume these are imported or defined globally; adjust as needed)
	const formatToPeso = (value: number) => `₱${value.toFixed(2)}`; // Example formatter
	const formatDate = (date: string) => new Date(date).toLocaleDateString(); // Example date formatter

	const getStatusLabel = (status: string) => {
		const map: Record<string, string> = {
			'01': 'Posted',
			'02': 'Voided',
			'03': 'Cancelled',
		};
		return map[status] || 'Unknown';
	};

	const getStatusSeverity = (
		status: string,
	): 'success' | 'danger' | 'warn' | 'info' => {
		const map: Record<string, any> = {
			'01': 'success',
			'02': 'danger',
			'03': 'warn',
		};
		return map[status] || 'info';
	};

	const onSelectionUpdate = (updatedSelectionData: any) => {
		emit('updateSelection', updatedSelectionData);
	};

	const onPage = (event: any) => {
		const offset = event.first;
		const orderByField = event.sortField ?? 'bill_no';
		const orderDirection = event.sortOrder === 1 ? 'ASC' : 'DESC';
		const limit = event.rows;

		first.value = event.first; // Keep DataTable in sync

		store.fetchPaginateCollections({
			limit,
			offset,
			orderByField,
			orderDirection,
		});
	};

	const fetchCollectionData = () => {
		store.fetchPaginateCollections({
			limit: rows.value,
			offset: first.value,
			orderByField: 'billNo',
			orderDirection: 'DESC',
		});
	};

	// Initial load
	onMounted(() => {
		fetchCollectionData();
		store.fetchCountCollections();
	});
</script>
