<script setup lang="ts">
	import { inject, onMounted, ref } from 'vue';
	import { useBillingStore } from '@/stores/billing';
	import { useToast } from 'primevue';

	const dialogRef = inject<any>('dialogRef');

	const store = useBillingStore();
	const toast = useToast();
	const data = ref();

	onMounted(() => {
		data.value = dialogRef.value.data.user;
		console.log(data.value);
	});

	function onClose() {
		dialogRef.value.close();
	}

	async function markPaid() {
		const res = await store.updateBilling(
			{ ...data.value, paymentStatus: 'paid' },
			data.value.uid,
		);
		toast.add({
			severity: res.status,
			summary: res.statusMessage,
			detail: res.message,
			life: 3000,
		});
		dialogRef.value.close();
	}
</script>
<template>
	<div v-if="data">
		<div v-if="data.paymentReceipt">
			<div class="card flex justify-center">
				<Image
					:src="data.paymentReceipt"
					alt="Image"
					width="250"
					preview />
			</div>
		</div>
		<div class="flex justify-end gap-4">
			<Button
				label="Yes"
				@click="markPaid"
				:loading="store.isLoading" />
			<Button
				label="Cancel"
				@click="onClose"
				severity="danger" />
		</div>
	</div>
</template>
