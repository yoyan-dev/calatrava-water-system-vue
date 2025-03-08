<script setup lang="ts">
	import { ref } from 'vue';
	import { useToast } from 'primevue';
	import { useBillingStore } from '@/stores/billing';
	import { useFileParser } from '@/composables/useFileParser';

	const toast = useToast();
	const store = useBillingStore();
	const isOpen = ref(false);
	const { csvData, parseCsvFile } = useFileParser();

	async function onSubmit(payload: any) {
		const res = await store.addBatchBilling(payload);
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
			@select="parseCsvFile"
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
