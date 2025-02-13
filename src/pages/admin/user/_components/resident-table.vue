<script setup lang="ts">
	import { ref } from 'vue';
	import { FilterMatchMode } from '@primevue/core/api';
	import CreateModal from './modals/create-modal.vue';
	import DeleteModal from './modals/delete-modal.vue';
	import DeleteSelectedModal from './modals/delete-selected-modal.vue';
	import UpdateModal from './modals/update-modal.vue';
	import ViewModal from './modals/view-modal.vue';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';

	const store = useResidentStore();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	const selectedResidents = ref([]);

	const props = defineProps<{
		residents: Resident[];
	}>();
</script>

<template>
	<div class="flex flex-col gap-3">
		<Toolbar>
			<template #start>
				<IconField>
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText
						v-model="filters['global'].value"
						placeholder="Search..." />
				</IconField>
			</template>
			<template #end>
				<CreateModal />
				<DeleteSelectedModal
					:selectedResidents="selectedResidents"
					v-if="selectedResidents && selectedResidents.length" />
			</template>
		</Toolbar>
		<div class="card border rounded-md">
			<DataTable
				:value="props.residents"
				v-model:selection="selectedResidents"
				size="small"
				dataKey="uid"
				scrollable
				scrollHeight="450px"
				:filters="filters"
				:loading="store.isLoading">
				<template #empty>
					<div class="flex items-center justify-center p-4">
						No residents found.
					</div>
				</template>
				<Column
					selectionMode="multiple"
					style="width: 3rem"
					:exportable="false"></Column>
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
						<div class="font-semibold">
							<Avatar
								icon="pi pi-user"
								class="mr-2"
								size="normal" />
							{{
								`${slotProps.data.firstName} ${slotProps.data.middleName} ${slotProps.data.lastName}`
							}}
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
				<Column :exportable="false" header="Actions">
					<template #body="slotProps">
						<div class="flex">
							<ViewModal v-bind="slotProps.data" />
							<UpdateModal v-bind="slotProps.data" />
							<DeleteModal :uid="slotProps.data.uid" />
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
		<!-- <Paginator
			:rows="10"
			:totalRecords="store.totalResidents"
			:rowsPerPageOptions="[10, 20, 30]"
			@page="store.onPageChange"
			template="PrevPageLink CurrentPageReport NextPageLink  RowsPerPageDropdown"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" /> -->
	</div>
</template>
