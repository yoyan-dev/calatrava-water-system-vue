<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { FilterMatchMode } from '@primevue/core/api';
	import CreateModal from './_components/modals/create-modal.vue';
	import DeleteModal from './_components/modals/delete-modal.vue';
	import UpdateModal from './_components/modals/update-modal.vue';
	import { useResidentStore } from '@/stores/resident';
	import Header from './_components/header.vue';

	const store = useResidentStore();
	const selectedResidents = ref();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	function onPageChange(event: any) {
		store.fetchResidents(event);
	}

	onMounted(async () => {
		await store.fetchResidents({ first: 0, rows: 10, page: 0 });
		await store.fetchTotalResidents();
		console.log(store.totalResidents);
	});
</script>

<template>
	<div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
		<Header />

		<DataTable
			:value="store.residents"
			size="small"
			dataKey="id"
			:rows="store.rowsPerPage"
			:filters="filters"
			:loading="store.isLoading">
			<template #empty>
				<div class="flex items-center justify-center p-4">
					No residents found.
				</div>
			</template>
			<template #header>
				<Toolbar>
					<template #start>
						<CreateModal />
					</template>

					<template #end>
						<IconField>
							<InputIcon>
								<i class="pi pi-search" />
							</InputIcon>
							<InputText
								v-model="filters['global'].value"
								placeholder="Search..." />
						</IconField>
					</template>
				</Toolbar>
			</template>
			<Column
				field="accountNumber"
				header="Account No.">
			</Column>
			<Column header="Name">
				<template #body="slotProps">
					<div>
						{{
							`${slotProps.data.firstName} ${slotProps.data.middleName} ${slotProps.data.lastName}`
						}}
					</div>
				</template>
			</Column>
			<Column header="Email">
				<template #body="slotProps">
					<div class="text-sm text-gray-500 dark:text-gray-400">
						sample@gmail.com
					</div>
				</template>
			</Column>
			<Column
				field="address"
				header="Address">
			</Column>
			<Column
				field="classification"
				header="Classification"></Column>
			<Column :exportable="false">
				<template #body="slotProps">
					<div class="flex">
						<UpdateModal v-bind="slotProps.data" />
						<DeleteModal :uid="slotProps.data.uid" />
					</div>
				</template>
			</Column>
		</DataTable>
		<Paginator
			:rows="store.rowsPerPage"
			:totalRecords="store.totalResidents"
			:rowsPerPageOptions="[10, 20, 30]"
			@page="onPageChange"></Paginator>
	</div>
</template>
