<script setup lang="ts">
	import { ref } from 'vue';
	import { useToast } from 'primevue';
	import { useBillingStore } from '@/stores/billing';

	const toast = useToast();
	const store = useBillingStore();
	const isOpen = ref(false);
	const selectedFile = ref<File | null>(null);
	const isUploading = ref(false);

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
		const res = await store.addBillings(selectedFile.value);
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
</script>

<template>
	<Button
		label="Upload CSV"
		icon="pi pi-upload"
		@click="isOpen = true" />
	<Dialog
		v-model:visible="isOpen"
		:style="{ width: '450px' }"
		header="Import Billings csv"
		:modal="true">
		<FileUpload
			:pt="{
				root: 'justify-start border rounded-lg border-gray-300',
			}"
			mode="basic"
			@select="onFileSelect"
			customUpload
			accept=".csv"
			severity="secondary" />
		<p class="text-sm text-gray-500 mt-2">
			Note: Please ensure the CSV file has no more than 3000 rows.
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
				:loading="isUploading"
				label="Upload"
				@click="onSubmit" />
		</template>
	</Dialog>
</template>
