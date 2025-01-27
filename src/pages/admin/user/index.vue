<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { FilterMatchMode } from '@primevue/core/api';
	import CreateModal from './_components/modals/create-modal.vue';
	import DeleteModal from './_components/modals/delete-modal.vue';
	import UpdateModal from './_components/modals/update-modal.vue';
	import { useResidentStore } from '@/stores/resident';
	import Header from './_components/header.vue';

	const store = useResidentStore();
	const deleteResidentsDialog = ref(false);
	const product = ref({});
	const selectedResidents = ref();
	const filters = ref({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	function confirmDeleteSelected() {
		deleteResidentsDialog.value = true;
	}

	function deleteSelectedResidents() {
		// residents.value = residents.value.filter((val: Object) => !selectedResidents.value.includes(val));
		// deleteResidentsDialog.value = false;
		// selectedResidents.value = null;
		// toast.add({severity:'success', summary: 'Successful', detail: 'residents Deleted', life: 3000});
	}

	onMounted(() => {
		store.fetchResidents();
	});
</script>

<template>
	<div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
		<Header />

		<DataTable
			:value="store.residents"
			size="small">
			<template #empty>
				<div class="flex items-center justify-center p-4">
					No residents found.
				</div>
			</template>
			<template #header>
				<Toolbar>
					<template #start>
						<CreateModal />
						<Button
							label="Delete"
							icon="pi pi-trash"
							severity="danger"
							outlined
							@click="confirmDeleteSelected"
							:disabled="!selectedResidents || !selectedResidents.length" />
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
						<DeleteModal :id="slotProps.data.id" />
					</div>
				</template>
			</Column>
		</DataTable>

		<Dialog
			v-model:visible="deleteResidentsDialog"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true">
			<div class="flex items-center gap-4">
				<i class="pi pi-exclamation-triangle !text-3xl" />
				<span v-if="product"
					>Are you sure you want to delete the selected users?</span
				>
			</div>
			<template #footer>
				<Button
					label="No"
					icon="pi pi-times"
					text
					@click="deleteResidentsDialog = false" />
				<Button
					label="Yes"
					icon="pi pi-check"
					text
					@click="deleteSelectedResidents" />
			</template>
		</Dialog>
	</div>
</template>
