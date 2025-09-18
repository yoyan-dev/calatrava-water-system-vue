<script setup lang="ts">
	import { ref, inject, onMounted } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import { useFaqStore } from '@/stores/faq';

	const toast = useToast();
	const store = useFaqStore();
	const dialogRef = inject<any>('dialogRef');
	const uid = ref();

	onMounted(() => {
		uid.value = dialogRef.value.data.uid;
	});

	async function deleteFaq() {
		const res = await store.deleteFaq(uid.value!);
		toast.add({
			severity: res.status,
			summary: res.statusMessage,
			detail: res.message,
			life: 3000,
		});

		dialogRef.value.close();
	}

	function onClose() {
		dialogRef.value.close();
	}
</script>
<template>
	<form
		class="flex flex-col gap-4"
		@submit.prevent="deleteFaq">
		<div class="flex items-center gap-4">
			<i class="pi pi-exclamation-triangle text-3xl!" />
			<span>Are you sure you want to delete this FAQ?</span>
		</div>
		<div class="w-full flex gap-4 justify-end items-center">
			<Button
				label="No"
				icon="pi pi-times"
				severity="danger"
				text
				@click="onClose" />
			<Button
				label="Yes"
				icon="pi pi-check"
				type="submit" />
		</div>
	</form>
</template>
