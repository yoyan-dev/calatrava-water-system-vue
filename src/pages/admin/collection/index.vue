<script setup lang="ts">
	import Header from './_components/header.vue';
	import CollectionTable from './_components/tables/collections-table.vue';
	import ImportModal from './_components/modals/import-modal.vue';
	import SearchInput from './_components/search-input.vue';
	import { ref } from 'vue';
	import { useCollectionStore } from '@/stores/collection';
	import { useConfirm } from 'primevue/useconfirm';
	import { useToast } from 'primevue/usetoast';

	const confirm = useConfirm();
	const toast = useToast();
	const store = useCollectionStore();
	const collectionTable = ref<any>();
	const selectedCollections = ref<Array<any>>([]);
	const onUpdateSelection = (data: Array<any>) => {
		selectedCollections.value = data;
	};

	const deleteSelectedCollections = async () => {
		const result = await store.deleteSelectedCollections(
			selectedCollections.value,
		);
		if (result?.status === 'success') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Collections deleted successfully',
			});
			selectedCollections.value = [];
			collectionTable.value.clearSelection();
		}
	};

	const confirmDelete = () => {
		confirm.require({
			message: `Are you sure you want to delete ${selectedCollections.value.length} collection records?`,
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			rejectProps: {
				label: 'Cancel',
				severity: 'secondary',
				outlined: true,
			},
			acceptProps: {
				severity: 'danger',
				label: 'Yes, Delete',
			},
			accept: () => {
				deleteSelectedCollections();
			},
		});
	};
</script>
<template>
	<div class="p-4 md:p-6">
		<Header :totalCollections="store.totalCollections" />
		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap items-center gap-4">
				<SearchInput class="mr-auto" />
				<ConfirmDialog></ConfirmDialog>
				<Button
					v-if="selectedCollections.length > 0"
					@click="confirmDelete"
					type="button"
					:label="`Delete (${selectedCollections.length})`"
					severity="danger"
					icon="pi pi-trash" />
				<ImportModal />
			</div>

			<div>
				<collectionTable
					ref="collectionTable"
					@updateSelection="onUpdateSelection" />
			</div>
		</div>
	</div>
</template>
