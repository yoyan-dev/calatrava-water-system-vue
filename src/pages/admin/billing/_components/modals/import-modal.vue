<script setup lang="ts">
	import { ref, watch } from 'vue';
	import Papa from 'papaparse';
	import { useToast, type FileUploadSelectEvent } from 'primevue';
	import { useFetch } from '@vueuse/core';
	import { useBillingStore } from '@/stores/billing';

	const toast = useToast();
	const store = useBillingStore()
	const isOpen = ref(false);
	const csvData = ref<any[]>();

	function handleFileChange(event: FileUploadSelectEvent) {
		const file = event.files[0];
		Papa.parse(file as File, {
			header: true,
			complete: (result: any) => {
				const filteredData = result.data
					.filter((row: any) =>
						Object.values(row).some((value) => value !== '' && value !== null),
					)
					.map((row: any) =>
						Object.fromEntries(
							Object.entries(row).map(([key, value]) => [
								key,
								typeof value === 'string' ? value.toLowerCase() : value,
							]),
						),
					);

				csvData.value = filteredData;
				console.log(filteredData);
			},
			error: (error: any) => {
				console.error('Error parsing CSV file:', error);
			},
		});
	}

	async function onSubmit(payload: any) {
		const res = await store.addBatchBilling(payload)
		toast.add({
			severity: res.status,
			summary: res.statusMessage,
			detail: res.message,
			life: 3000,
		});
	}
</script>

<template>
	<Button
		icon="pi pi-file-import"
		@click="isOpen = true" />
	<Dialog
		v-model:visible="isOpen"
		:style="{ width: '450px' }"
		header="Import billing csv"
		:modal="true">
		<FileUpload
			:pt="{
				root: 'justify-start border rounded-lg border-gray-300',
			}"
			mode="basic"
			@select="handleFileChange"
			customUpload
			accept=".csv"
			severity="secondary" />
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
				@click="onSubmit(csvData)" />
		</template>
	</Dialog>
</template>
