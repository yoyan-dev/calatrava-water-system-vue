<template>
	<div>
		<div class="flex flex-wrap items-center gap-4">
			<SearchInput class="mr-auto" />
			<Button
				v-if="selectedConsumers.length > 0"
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
					<div class="flex justify-end space-x-1">
						<Button
							icon="pi pi-eye"
							size="small"
							text
							rounded
							severity="secondary"
							@click="viewConsumer(slotProps.data)"
							v-tooltip.left="'View Details'" />
						<Button
							icon="pi pi-pencil"
							size="small"
							text
							rounded
							severity="info"
							@click="editConsumer(slotProps.data)"
							v-tooltip.left="'Edit'" />
						<Button
							icon="pi pi-trash"
							size="small"
							text
							rounded
							severity="danger"
							@click="confirmDelete(slotProps.data)"
							v-tooltip.left="'Delete'" />
					</div>
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { useToast } from 'primevue/usetoast';
	import { useConfirm } from 'primevue/useconfirm';
	import { useConsumerStore } from '@/stores/consumer';
	import { format } from 'date-fns';

	import AddConsumerActions from './add-consumer-actions.vue';
	import SearchInput from './search-input.vue';

	// Props & Emits
	defineProps<{
		rows?: number;
	}>();
	const emit = defineEmits(['selection-change']);

	// Store
	const store = useConsumerStore();
	const router = useRouter();
	const toast = useToast();
	const confirm = useConfirm();

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

	const onSelectionUpdate = () => {
		emit('selection-change', selectedConsumers.value);
	};

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.slice(0, 2)
			.join('')
			.toUpperCase();
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

	// Actions
	const viewConsumer = (consumer: any) => {
		router.push({ name: 'consumer-detail', params: { id: consumer.id } });
	};

	const editConsumer = (consumer: any) => {
		// Emit or open modal
		// emit('edit', consumer);
	};

	const confirmDelete = (consumer: any) => {
		confirm.require({
			message: `Delete consumer "${consumer.fullName}" (${consumer.accountNo})?`,
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: async () => {
				const success = await store.deleteOneConsumer(consumer.id);
				if (success) {
					toast.add({
						severity: 'success',
						summary: 'Deleted',
						detail: 'Consumer removed successfully',
						life: 3000,
					});
				}
			},
		});
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
