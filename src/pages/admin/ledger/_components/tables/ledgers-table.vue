<template>
	<div>
		<DataTable
			v-model:selection="selectedLedgers"
			v-model:first="first"
			:value="store.ledgers"
			:loading="store.isLoading"
			:lazy="true"
			dataKey="id"
			size="small"
			class="text-sm"
			:rows="rows"
			paginator
			paginatorPosition="bottom"
			:rowsPerPageOptions="[5, 10, 20, 50]"
			:totalRecords="store.totalLedgers"
			selectionMode="multiple"
			currentPageReportTemplate="{first} to {last} of {totalRecords}"
			paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
			@page="onPage"
			@update:selection="onSelectionUpdate">
			<template #empty>
				<div class="flex items-center justify-center p-4 text-gray-500">
					No ledger transaction records found.
				</div>
			</template>

			<!-- Selection Checkbox -->
			<Column
				selectionMode="multiple"
				headerStyle="width: 3rem" />

			<!-- Sequence -->
			<Column
				field="sequence"
				header="Sequence">
				<template #body="slotProps">
					<span class="font-medium text-primary-700 dark:text-primary-500">
						{{ slotProps.data.sequence }}
					</span>
				</template>
			</Column>

			<!-- Account No -->
			<Column
				field="accountNo"
				header="Account No">
				<template #body="slotProps">
					<span class="font-mono text-xs">{{ slotProps.data.accountNo }}</span>
				</template>
			</Column>

			<!-- Customer No -->
			<Column
				field="custNo"
				header="Cust No">
				<template #body="slotProps">
					<span class="text-xs text-gray-600 dark:text-gray-400">{{
						slotProps.data.custNo
					}}</span>
				</template>
			</Column>

			<!-- Transaction Date -->
			<Column
				field="transDate"
				header="Trans Date">
				<template #body="slotProps">
					<span class="text-xs">{{
						formatDate(slotProps.data.transDate)
					}}</span>
				</template>
			</Column>

			<!-- Ref Code & Ref No -->
			<Column header="Reference">
				<template #body="slotProps">
					<div class="flex flex-col text-xs">
						<span class="font-medium">{{ slotProps.data.refCode }}</span>
						<span class="text-gray-500">Ref: {{ slotProps.data.refNo }}</span>
					</div>
				</template>
			</Column>

			<!-- Amount -->
			<Column
				field="amount"
				header="Amount">
				<template #body="slotProps">
					<span
						:class="
							slotProps.data.amount < 0 ? 'text-red-600' : 'text-green-600'
						"
						class="font-medium">
						{{ formatToPeso(slotProps.data.amount) }}
					</span>
				</template>
			</Column>

			<!-- Tag -->
			<Column
				field="tag"
				header="Type">
				<template #body="slotProps">
					<Badge
						:value="slotProps.data.tag"
						:severity="getTagSeverity(slotProps.data.tag)"
						size="small" />
				</template>
			</Column>

			<!-- Reading & Consumption -->
			<Column header="Meter">
				<template #body="slotProps">
					<div class="text-xs space-y-1">
						<div>
							<span class="font-medium">Read:</span>
							{{ slotProps.data.reading }}
						</div>
						<div>
							<span class="font-medium">Cons:</span>
							{{ slotProps.data.consumption }}
						</div>
					</div>
				</template>
			</Column>

			<!-- Timestamp (if present) -->
			<Column
				field="timestamp"
				header="Timestamp">
				<template #body="slotProps">
					<span class="text-xs text-gray-500 italic">
						{{
							slotProps.data.timestamp && slotProps.data.timestamp !== '/  /'
								? slotProps.data.timestamp
								: '—'
						}}
					</span>
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useLedgerStore } from '@/stores/ledger';

	const store = useLedgerStore();
	const first = ref(0); // Bind to DataTable
	const rows = ref(10);
	const selectedLedgers = ref();
	const selectedLedgerForAction = ref();
	const emit = defineEmits(['updateSelection']);
	const clearSelection = () => {
		selectedLedgers.value = [];
	};

	defineExpose({
		clearSelection,
	});

	const actionMenu = ref();
	const toggleActionMenu = (event: any, data: any) => {
		actionMenu.value.toggle(event);
		selectedLedgerForAction.value = data;
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

	const getTagSeverity = (tag: string) => {
		switch (tag) {
			case 'W':
				return 'info'; // Water
			case 'F':
				return 'warning'; // Fee
			case 'A':
				return 'success'; // Adjustment
			default:
				return 'secondary';
		}
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

		store.fetchPaginateLedgers({
			limit,
			offset,
			orderByField,
			orderDirection,
		});
	};

	const fetchLedgerData = () => {
		store.fetchPaginateLedgers({
			limit: rows.value,
			offset: first.value,
			orderByField: 'billNo',
			orderDirection: 'DESC',
		});
	};

	// Initial load
	onMounted(() => {
		fetchLedgerData();
		store.fetchCountLedgers();
	});
</script>
