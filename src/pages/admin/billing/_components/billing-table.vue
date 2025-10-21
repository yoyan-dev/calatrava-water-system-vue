<template>
	<div>
		<DataTable
			v-model:expandedRows="expandedRows"
			:value="value"
			:loading="loading"
			dataKey="billNo"
			size="small"
			class="text-sm"
			:rows="rows"
			:paginator="true"
			paginatorPosition="bottom"
			:totalRecords="totalRecords"
			@page="onPage">
			<template #empty>
				<div class="flex items-center justify-center p-4">
					No billing found.
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
				field="bill_no" />
			<Column
				class="text-primary-600 font-bold"
				header="Account Number"
				field="accountno" />
			<Column
				header="Billing Date"
				field="bill_date">
				<template #body="slotProps">
					{{ formatDate(slotProps.data.bill_date) }}
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
						@click="emit('toggle', $event, slotProps.data)"
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
	import { ref } from 'vue';
	import DataTable from 'primevue/datatable';
	import Column from 'primevue/column';
	import Tag from 'primevue/tag';
	import Button from 'primevue/button';
	import BillingExpansion from './billing-expansion.vue';

	// Define props with types
	const props = defineProps<{
		value: Array<any>;
		loading: boolean;
		totalRecords: number;
		rows?: number;
	}>();

	// Define emits
	const emit = defineEmits<{
		(e: 'update:selection', value: any): void;
		(e: 'page', event: any): void;
		(e: 'toggle', event: Event, data: any): void;
	}>();

	// Local state for expanded rows
	const expandedRows = ref([]);

	// Format functions (assume these are imported or defined globally; adjust as needed)
	const formatToPeso = (value: number) => `₱${value.toFixed(2)}`; // Example formatter
	const formatDate = (date: string) => new Date(date).toLocaleDateString(); // Example date formatter

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
		emit('page', event);
	};
</script>
