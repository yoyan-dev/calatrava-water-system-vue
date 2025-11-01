<template>
	<div class="flex justify-end space-x-1">
		<Button
			icon="pi pi-pencil"
			size="small"
			text
			rounded
			severity="info"
			@click="editConsumer"
			v-tooltip.left="'Edit'" />
		<Button
			icon="pi pi-trash"
			size="small"
			text
			rounded
			severity="danger"
			@click="confirmDelete"
			v-tooltip.left="'Delete'" />
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { useConfirm } from 'primevue/useconfirm';
	import { useToast } from 'primevue/usetoast';
	import { useDialog } from 'primevue';
	import { useConsumerStore } from '@/stores/consumer';

	import ConsumerDialog from './consumer-dialog.vue';

	// Services
	const store = useConsumerStore();
	const dialog = useDialog();
	const confirm = useConfirm();
	const toast = useToast();

	const props = defineProps<{
		rowData: any;
	}>();

	// Actions
	const editConsumer = () => {
		dialog.open(ConsumerDialog, {
			props: {
				header: 'Edit Consumer',
				style: { width: '90%', maxWidth: '500px' },
				modal: true,
				dismissableMask: true,
				closeOnEscape: true,
			},
			data: {
				consumer: props.rowData,
			},
		});
	};

	const confirmDelete = () => {
		const { rowData } = props;
		console.log('heeey');

		confirm.require({
			message: `Delete consumer "${rowData.fullName}" with Account No. ${rowData.accountNo}?`,
			header: 'Confirm Delete',
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
				const success = await store.deleteOneConsumer(rowData.id);
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
</script>
