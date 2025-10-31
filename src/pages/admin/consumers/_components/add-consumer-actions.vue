<template>
	<div class="flex gap-4">
		<Button
			@click="isOpen = true"
			type="button"
			label="Upload CSV"
			severity="primary"
			icon="pi pi-upload" />
		<Button
			@click="openConsumerDialog()"
			type="button"
			severity="primary"
			icon="pi pi-user-plus" />

		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Import Consumer csv"
			:modal="true">
			<FileUpload
				mode="basic"
				customUpload
				accept=".csv"
				severity="secondary"
				@select="onFileSelect"
				:pt="{
					root: 'justify-start border rounded-lg border-gray-300',
				}" />
			<p class="text-sm text-gray-500 mt-2">
				Note: Please ensure the CSV file has no more than 2000 rows.
			</p>
			<template #footer>
				<Button
					label="Cancel"
					severity="danger"
					variant="outlined"
					size="small"
					@click="isOpen = false" />
				<Button
					size="small"
					:loading="store.isLoading"
					label="Upload"
					@click="onSubmit"
					:disabled="!selectedFile" />
			</template>
		</Dialog>
	</div>
</template>
<script setup lang="ts">
	import { ref } from 'vue';
	import { useToast } from 'primevue';
	import { useConsumerStore } from '@/stores/consumer';
	import { useDialog } from 'primevue/usedialog';
	import ConsumerDialog from './consumer-dialog.vue';

	const toast = useToast();
	const store = useConsumerStore();
	const isOpen = ref(false);
	const selectedFile = ref<File | null>(null);
	const isUploading = ref(false);
	const dialog = useDialog();

	async function onSubmit() {
		if (!selectedFile.value) {
			toast.add({
				severity: 'warn',
				summary: 'No File Selected',
				detail: 'Please select a CSV file before uploading.',
				life: 3000,
			});
			return;
		}

		isUploading.value = true;
		const res = await store.addConsumerFromCsv(selectedFile.value);
		toast.add({
			severity: res.status,
			summary: res.statusMessage || 'Upload Status',
			detail: res.message,
			life: 3000,
		});

		isOpen.value = false;
	}

	function onFileSelect(event: any) {
		selectedFile.value = event.files?.[0] || null;
	}

	const openConsumerDialog = (consumer?: any) => {
		dialog.open(ConsumerDialog, {
			props: {
				header: consumer ? 'Edit Consumer' : 'Add New Consumer',
				style: { width: '90%', maxWidth: '500px' },
				modal: true,
				dismissableMask: true,
				closeOnEscape: true,
			},
			data: { consumer }, // Pass existing consumer for edit
			onClose: (options: any) => {
				if (options?.data?.success) {
					// Optionally refresh list
					// emit('refresh');
				}
			},
		});
	};
</script>
