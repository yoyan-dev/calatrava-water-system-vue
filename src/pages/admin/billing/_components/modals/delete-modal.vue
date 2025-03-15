<script setup lang="ts">
	import { ref } from 'vue';
	import { useBillingStore } from '@/stores/billing';
	import { useToast } from 'primevue/usetoast';

	const toast = useToast();
	const store = useBillingStore();

	const isOpen = ref(false);

	function onDelete({ uid, accountno }: { uid: string; accountno: string }) {
		store.deleteBilling({ uid, accountno });
		toast.add({
			severity: 'success',
			summary: 'Successful',
			detail: 'Resident Deleted',
			life: 3000,
		});
		isOpen.value = false;
	}

	const props = defineProps<{ uid: string; accountno: string }>();
</script>
<template>
	<div>
		<Button
			icon="pi pi-trash"
			severity="danger"
			label="delete"
			text
			size="small"
			@click="isOpen = true" />
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Confirm"
			:modal="true">
			<div class="flex items-center gap-4">
				<i class="pi pi-exclamation-triangle !text-3xl" />
				<span v-if="uid"
					>Are you sure you want to delete <b>Water Bill</b>?</span
				>
			</div>
			<template #footer>
				<Button
					label="No"
					severity="danger"
					size="small"
					text
					@click="isOpen = false" />
				<Button
					label="Yes"
					size="small"
					@click="onDelete({ uid: props.uid, accountno: props.accountno })" />
			</template>
		</Dialog>
	</div>
</template>
