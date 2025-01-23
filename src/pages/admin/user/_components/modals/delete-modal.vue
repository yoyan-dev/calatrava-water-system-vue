<script setup lang="ts">
	import { ref } from 'vue';
	import { useResidentStore } from '@/stores/resident';
	import { useToast } from 'primevue/usetoast';

	const toast = useToast();
	const store = useResidentStore();

	const isOpen = ref(false);

	function deleteResident() {
		store.deleteResident(props.id ?? '');
		toast.add({
			severity: 'success',
			summary: 'Successful',
			detail: 'Resident Deleted',
			life: 3000,
		});
		isOpen.value = false;
	}

	const props = defineProps<{ id?: string }>();
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
			@submit.prevent="deleteResident">
			<div class="flex items-center gap-4">
				<i class="pi pi-exclamation-triangle !text-3xl" />
				<span>Are you sure you want to delete user?</span>
			</div>
			<div class="w-full flex gap-4 justify-end items-center">
				<Button
					label="No"
					icon="pi pi-times"
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
