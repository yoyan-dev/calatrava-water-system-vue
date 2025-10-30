<script setup lang="ts">
	import Header from './_components/header.vue';
	import LedgerTable from './_components/tables/ledgers-table.vue';
	import ImportModal from './_components/modals/import-modal.vue';
	import SearchInput from './_components/search-input.vue';
	import { ref } from 'vue';
	import { useLedgerStore } from '@/stores/ledger';
	import { useConfirm } from 'primevue/useconfirm';
	import { useToast } from 'primevue/usetoast';

	const confirm = useConfirm();
	const toast = useToast();
	const store = useLedgerStore();
	const ledgerTable = ref<any>();
	const selectedLedgers = ref<Array<any>>([]);
	const onUpdateSelection = (data: Array<any>) => {
		selectedLedgers.value = data;
	};

	const deleteSelectedLedgers = async () => {
		const result = await store.deleteSelectedLedgers(selectedLedgers.value);
		if (result?.status === 'success') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Ledgers deleted successfully',
			});
			selectedLedgers.value = [];
			ledgerTable.value.clearSelection();
		}
	};

	const confirmDelete = () => {
		confirm.require({
			message: `Are you sure you want to delete ${selectedLedgers.value.length} Ledger records?`,
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
				deleteSelectedLedgers();
			},
		});
	};
</script>
<template>
	<div class="p-4 md:p-6">
		<Header :totalLedgers="store.totalLedgers" />
		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap items-center gap-4">
				<SearchInput class="mr-auto" />
				<ConfirmDialog></ConfirmDialog>
				<Button
					v-if="selectedLedgers.length > 0"
					@click="confirmDelete"
					type="button"
					:label="`Delete (${selectedLedgers.length})`"
					severity="danger"
					icon="pi pi-trash" />
				<ImportModal />
			</div>

			<div>
				<LedgerTable
					ref="ledgerTable"
					@updateSelection="onUpdateSelection" />
			</div>
		</div>
	</div>
</template>
