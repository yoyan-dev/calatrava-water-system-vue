<script setup lang="ts">
	import { ref, watch } from 'vue';
	import Papa from 'papaparse';
	import { useToast, type FileUploadSelectEvent } from 'primevue';
	import { useFetch } from '@vueuse/core';

	const toast = useToast();
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
		try {
			const { data: result } = await useFetch(
				`${import.meta.env.VITE_API_URL}/api/billings`,
			)
				.post(payload)
				.json();
			toast.add({
				severity: result.value.statusCode == 200 ? 'success' : 'error',
				summary: result.value.statusMessage,
				detail: result.value.message,
				life: 3000,
			});
			isOpen.value = false;
		} catch (e) {
			console.error(e);
		}
	}
</script>

<template>
	<Button
		label="Import CSV"
		@click="isOpen = true" />
	<Dialog
		v-model:visible="isOpen"
		:style="{ width: '450px' }"
		header="Confirm"
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
				@click="isOpen = false" />
			<Button
				label="Upload"
				@click="onSubmit(csvData)" />
		</template>
	</Dialog>
</template>
