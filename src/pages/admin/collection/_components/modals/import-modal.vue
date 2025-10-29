<script setup lang="ts">
	import { ref } from 'vue';
	import { useToast } from 'primevue';
	import { useCollectionStore } from '@/stores/collection';

	const toast = useToast();
	const store = useCollectionStore();
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
		const res = await store.addCollectionsFromCsv(selectedFile.value);
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
		header="Import collection csv"
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
</template>
