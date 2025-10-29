<template>
	<Menu
		class="py-2"
		ref="menuRef"
		:model="actionItems"
		:popup="true" />
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { useConfirm } from 'primevue/useconfirm';
	import { useToast } from 'primevue/usetoast';
	import EditCollection from '../modals/edit-collection.vue';
	import { useDialog } from 'primevue';
	import { useCollectionStore } from '@/stores/collection';

	// Services
	const store = useCollectionStore();
	const dialog = useDialog();
	const confirm = useConfirm();
	const toast = useToast();

	const props = defineProps<{
		rowData: any;
	}>();

	// Refs
	const menuRef = ref();

	// Computed action items
	const actionItems = computed(() => [
		{
			label: 'Edit',
			icon: 'pi pi-pencil',
			command: () => {
				dialog.open(EditCollection, {
					data: {
						collection: props.rowData,
					},
				});
			},
		},
		{
			label: 'Delete',
			icon: 'pi pi-trash',
			command: () => {
				confirm.require({
					message: 'Are you sure you want to delete this record?',
					header: 'Confirm Deletion',
					icon: 'pi pi-exclamation-triangle',
					acceptProps: {
						severity: 'danger',
						label: 'Yes, Delete',
					},
					rejectProps: {
						severity: 'secondary',
						label: 'Cancel',
					},
					accept: async () => {
						try {
							await store.deleteOneCollection(props.rowData.id);
							toast.add({
								severity: 'success',
								summary: 'Success',
								detail: 'Collection deleted successfully',
							});
						} catch (error) {
							console.error('Delete failed:', error);
							toast.add({
								severity: 'error',
								summary: 'Error',
								detail: 'Failed to delete record',
							});
						}
					},
				});
			},
		},
		// {
		// 	label: `Mark ${props.rowData?.paid === 'F' ? 'Paid' : 'Unpaid'}`,
		// 	icon: `pi pi-receipt`,
		// 	command: () => {
		// 		const paidObj = {
		// 			paid: props.rowData?.paid === 'F' ? 'T' : 'F',
		// 			paymentStatus: props.rowData?.paid === 'F' ? 'paid' : 'unpaid',
		// 		};

		// 		store.updateBillingFromCsv(props.rowData.id, paidObj);
		// 	},
		// },
	]);

	// Methods
	const toggle = (event: any) => {
		menuRef.value.toggle(event);
	};
	defineExpose({ toggle });
</script>
