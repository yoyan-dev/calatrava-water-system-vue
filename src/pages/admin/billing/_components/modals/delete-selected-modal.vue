<script setup lang="ts">
	import { ref } from 'vue';
	import { useBillingStore } from '@/stores/billing';
	import { useToast } from 'primevue/usetoast';

	const toast = useToast();
	const store = useBillingStore();

	const isOpen = ref(false);

	function onDelete() {
		console.log(props.selectedBills)
		toast.add({
			severity: 'success',
			summary: 'Successful',
			detail: 'Resident Deleted',
			life: 3000,
		});
		isOpen.value = false;
	}

	const props = defineProps<{ selectedBills: any }>();
</script>
<template>
	<div>
		<Button
			icon="pi pi-trash"
			severity="danger"
			label="delete"
			@click="isOpen = true" />
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true">
			<div class="flex items-center gap-4">
				<i class="pi pi-exclamation-triangle !text-3xl" />
				<span
					>Are you sure you want to delete this selected <b>Water Bills</b>?</span
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
					size="small"
					label="Yes"
					@click="onDelete" />
			</template>
		</Dialog>
	</div>
</template>
