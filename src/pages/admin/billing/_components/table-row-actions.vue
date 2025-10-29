<template>
	<Menu
		ref="menuRef"
		:model="actionItems"
		:popup="true" />
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { useConfirm } from 'primevue/useconfirm';
	import { useToast } from 'primevue/usetoast';
	import EditBilling from './modals/edit-billing.vue';
	import { useDialog } from 'primevue';
	import { useBillingStore } from '@/stores/billing';

	// Services
	const store = useBillingStore();
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
				dialog.open(EditBilling, {
					data: {
						billing: props.rowData,
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
							await store.deleteOneBilling(props.rowData.id);
							toast.add({
								severity: 'success',
								summary: 'Success',
								detail: 'Billing deleted successfully',
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
	]);

	// Methods
	const toggle = (event: any) => {
		menuRef.value.toggle(event);
	};
	defineExpose({ toggle });
</script>
