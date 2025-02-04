<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue';
	import { FilterMatchMode } from '@primevue/core/api';
	import CreateModal from './_components/modals/create-modal.vue';
	import DeleteModal from './_components/modals/delete-modal.vue';
	import UpdateModal from './_components/modals/update-modal.vue';
	import { useResidentStore } from '@/stores/resident';
	import Header from './_components/header.vue';

	const store = useResidentStore();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	onMounted(() => {
		store.fetchResidents();
		store.fetchTotalResidents();
		console.log(store.residents);
	});
</script>

<template>
	<div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
		<Header />

		<DataTable
			:value="store.residents"
			size="small"
			dataKey="accountNumber"
			scrollable
			scrollHeight="450px"
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
			<column header="id">
				<template #body="slotProps"
					><span>{{ slotProps.index + 1 }}</span></template
				>
			</column>
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
		<!-- <Paginator
			:rows="10"
			:totalRecords="store.totalResidents"
			:rowsPerPageOptions="[10, 20, 30]"
			@page="store.onPageChange"
			template="PrevPageLink CurrentPageReport NextPageLink  RowsPerPageDropdown"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" /> -->
	</div>
</template>
