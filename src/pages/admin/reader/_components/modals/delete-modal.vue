<script setup lang="ts">
	import { ref } from 'vue';
	import { useReaderStore } from '@/stores/reader';
	import { useToast } from 'primevue/usetoast';

	const toast = useToast();
	const store = useReaderStore();

	const isOpen = ref(false);

	async function deleteReader() {
		const response = await store.deleteReaders(props.uid!);
		toast.add({
			severity: response.status,
			summary: response.statusMessage,
			detail: response.message,
			life: 3000,
		});
		isOpen.value = false;
	}

	const props = defineProps<{ uid?: string }>();
</script>
<template>
	<Button
		icon="pi pi-trash"
		text
		severity="danger"
		@click="isOpen = true" />
	<Dialog
		v-model:visible="isOpen"
		:style="{ width: '450px' }"
		header="Confirm"
		modal>
		<form
			class="flex flex-col gap-4"
			@submit.prevent="deleteReader">
			<div class="flex items-center gap-4">
				<i class="pi pi-exclamation-triangle !text-3xl" />
				<span>Are you sure you want to delete meter reader?</span>
			</div>
			<div class="w-full flex gap-4 justify-end items-center">
				<Button
					label="No"
					icon="pi pi-times"
					severity="danger"
					text
					@click="isOpen = false" />
				<Button
					label="Yes"
					icon="pi pi-check"
					type="submit" />
			</div>
		</form>
	</Dialog>
</template>
