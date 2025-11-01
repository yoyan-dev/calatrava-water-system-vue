<template>
	<div>
		<div class="flex flex-wrap items-center gap-4">
			<SearchInput class="mr-auto" />
			<Button
				v-if="selectedConsumers.length > 0"
				@click="deleteSelectedConsumers"
				type="button"
				:label="`Delete (${selectedConsumers.length})`"
				severity="danger"
				icon="pi pi-trash" />
			<AddConsumerActions />
		</div>

		<DataTable
			v-model:selection="selectedConsumers"
			v-model:first="first"
			:value="store.consumers"
			:loading="store.isLoading"
			:lazy="true"
			dataKey="id"
			size="small"
			class="text-sm"
			:rows="rows"
			paginator
			:rowsPerPageOptions="[10, 20, 50, 100]"
			:totalRecords="store.totalConsumers"
			selectionMode="multiple"
			currentPageReportTemplate="{first} to {last} of {totalRecords} consumers"
			paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
			@page="onPage"
			@update:selection="onSelectionUpdate">
			<!-- Empty State -->
			<template #empty>
				<div
					class="flex flex-col items-center justify-center p-8 text-gray-500">
					<i class="pi pi-users text-4xl mb-3 text-gray-300"></i>
					<p>No consumers found.</p>
				</div>
			</template>

			<!-- Selection Column -->
			<Column
				selectionMode="multiple"
				headerStyle="width: 3rem" />

			<!-- Account No -->
			<Column
				field="accountNo"
				header="Account No">
				<template #body="slotProps">
					{{ slotProps.data.accountNo }}
				</template>
			</Column>

			<!-- Full Name -->
			<Column
				field="fullName"
				header="Full Name">
				<template #body="slotProps">
					<div class="flex items-center space-x-2">
						<i class="pi pi-user text-xs text-gray-500"></i>
						<span class="font-medium">{{ slotProps.data.fullName }}</span>
					</div>
				</template>
			</Column>

			<!-- Book -->
			<Column
				field="book"
				header="Book">
				<template #body="slotProps">
					<Badge
						:value="slotProps.data.book"
						severity="info"
						size="small" />
				</template>
			</Column>

			<!-- Class Type -->
			<Column
				field="classType"
				header="Class">
				<template #body="slotProps">
					<Badge
						:value="slotProps.data.classType"
						:severity="getClassSeverity(slotProps.data.classType)"
						size="small" />
				</template>
			</Column>

			<!-- Created At -->
			<Column
				field="createdAt"
				header="Registered">
				<template #body="slotProps">
					<span class="text-xs text-gray-500">
						{{ formatDateTime(slotProps.data.createdAt) }}
					</span>
				</template>
			</Column>

			<!-- Actions -->
			<Column
				header="Actions"
				headerStyle="width: 6rem"
				bodyStyle="text-align: right">
				<template #body="slotProps">
					<TableRowActions :rowData="slotProps.data" />
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useConsumerStore } from '@/stores/consumer';
	import { format } from 'date-fns';

	import AddConsumerActions from './add-consumer-actions.vue';
	import SearchInput from './search-input.vue';
	import TableRowActions from './table-row-actions.vue';
	import { useToast } from 'primevue';

	// Props & Emits
	defineProps<{
		rows?: number;
	}>();
	const emit = defineEmits(['selection-change']);

	// import composables
	const store = useConsumerStore();
	const toast = useToast();

	// Pagination & Selection
	const first = ref(0);
	const selectedConsumers = ref<any[]>([]);
	const rows = ref(10);

	// Methods
	const onPage = (event: any) => {
		const offset = event.first;
		const orderByField = event.sortField ?? 'bill_no';
		const orderDirection = event.sortOrder === 1 ? 'ASC' : 'DESC';
		const limit = event.rows;

		first.value = event.first; // Keep DataTable in sync

		store.fetchPaginateConsumers({
			limit,
			offset,
			orderByField,
			orderDirection,
		});
	};

	const deleteSelectedConsumers = async () => {
		const result = await store.deleteSelectedConsumers(selectedConsumers.value);
		if (result?.status === 'success') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Billings deleted successfully',
			});
			selectedConsumers.value = [];
		}
	};

	const onSelectionUpdate = () => {
		emit('selection-change', selectedConsumers.value);
	};

	const getClassSeverity = (classType: string) => {
		const map: Record<string, any> = {
			RESIDENTIAL: 'success',
			COMMERCIAL: 'warning',
			INDUSTRIAL: 'danger',
			GOVERNMENT: 'info',
			INSTITUTIONAL: 'secondary',
		};
		return map[classType.toUpperCase()] || 'secondary';
	};

	const formatDateTime = (iso: string) => {
		return iso ? format(new Date(iso), 'dd MMM yyyy HH:mm') : '—';
	};

	const fetchConsumersData = () => {
		store.fetchPaginateConsumers({
			limit: rows.value,
			offset: first.value,
			orderByField: 'accoountNo',
			orderDirection: 'DESC',
		});
	};

	// // Initial load
	onMounted(() => {
		fetchConsumersData();
		store.fetchCountConsumers();
	});
</script>
