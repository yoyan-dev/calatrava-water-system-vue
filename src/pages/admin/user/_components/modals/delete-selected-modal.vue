<script setup lang="ts">
	import { ref } from 'vue';
	import { useResidentStore } from '@/stores/resident';
	import { useToast } from 'primevue/usetoast';
	import type { Resident } from '@/types/resident';

	const toast = useToast();
	const store = useResidentStore();

	const isOpen = ref(false);

	async function onDelete() {
		const uids = props.selectedResidents.map(
			(resident: Resident) => resident.uid,
		) as string[];
		const response = await store.deleteResidents(uids);
		toast.add({
			severity: response.status,
			summary: response.statusMessage,
			detail: response.message,
			life: 3000,
		});
		isOpen.value = false;
	}

	const props = defineProps<{ selectedResidents: Resident[] }>();
</script>
<template>
	<div>
		<Button
			icon="pi pi-trash"
			severity="danger"
			@click="isOpen = true" />
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true">
			<div class="flex items-center gap-4">
				<i class="pi pi-exclamation-triangle text-3xl!" />
				<span
					>Are you sure you want to delete this selected <b>Residents</b>?</span
				>
			</div>
			<template #footer>
				<Button
					label="No"
					severity="danger"
					text
					size="small"
					@click="isOpen = false" />
				<Button
					:loading="store.isLoading"
					size="small"
					label="Yes"
					@click="onDelete" />
			</template>
		</Dialog>
	</div>
</template>
