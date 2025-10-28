<script setup lang="ts">
	import Header from './_components/header.vue';
	import BillingTable from './_components/billing-table.vue';
	import ImportModal from './_components/modals/import-modal.vue';
	import SearchInput from './_components/search-input.vue';
	import { ref } from 'vue';
	import { useBillingStore } from '@/stores/billing';
	import { useConfirm } from 'primevue/useconfirm';
	import { useToast } from 'primevue/usetoast';

	const confirm = useConfirm();
	const toast = useToast();
	const store = useBillingStore();
	const billingTable = ref<any>();
	const selectedBillings = ref<Array<any>>([]);
	const onUpdateSelection = (data: Array<any>) => {
		selectedBillings.value = data;
	};

	const deleteSelectedBillings = async () => {
		const result = await store.deleteSelectedBillings(selectedBillings.value);
		if (result?.status === 'success') {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Billings deleted successfully',
			});
			selectedBillings.value = [];
			billingTable.value.clearSelection();
		}
	};

	const confirmDelete = () => {
		confirm.require({
			message: `Are you sure you want to delete ${selectedBillings.value.length} billing records?`,
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
				deleteSelectedBillings();
			},
		});
	};
</script>
<template>
	<div class="p-4 md:p-6">
		<Header />
		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap items-center gap-4">
				<SearchInput class="mr-auto" />
				<ConfirmDialog></ConfirmDialog>
				<Button
					v-if="selectedBillings.length > 0"
					@click="confirmDelete"
					type="button"
					:label="`Delete (${selectedBillings.length})`"
					severity="danger"
					icon="pi pi-trash" />
				<ImportModal />
			</div>

			<div>
				<BillingTable
					ref="billingTable"
					@updateSelection="onUpdateSelection" />
			</div>
		</div>
	</div>
</template>
