<script setup lang="ts">
	import { ref } from 'vue';
	import { useBillingStore } from '@/stores/billing';
	import { useToast } from 'primevue/usetoast';

	const toast = useToast();
	const store = useBillingStore();

	const isOpen = ref(false);

	function deleteTransaction() {
		store.deleteTransaction(props.id ?? '');
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
	<div>
		<Button
			icon="pi pi-trash"
			severity="danger"
			text
			@click="isOpen = true" />
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true">
			<div class="flex items-center gap-4">
				<i class="pi pi-exclamation-triangle !text-3xl" />
				<span v-if="id"
					>Are you sure you want to delete <b>transaction</b>?</span
				>
			</div>
			<template #footer>
				<Button
					label="No"
					severity="danger"
					icon="pi pi-times"
					text
					@click="isOpen = false" />
				<Button
					label="Yes"
					icon="pi pi-check"
					@click="deleteTransaction" />
			</template>
		</Dialog>
	</div>
</template>
