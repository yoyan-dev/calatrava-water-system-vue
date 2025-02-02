<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { useBillingStore } from '@/stores/billing';
	import type { Resident } from '@/types/resident';

	const store = useBillingStore();
	const isOpen = ref(false);
	const isSubmitted = ref(false);
	const isLoading = ref(false);

	const props = defineProps<{
		id?: Resident['id'];
		uid?: Resident['uid'];
		firstName?: Resident['firstName'];
		middleName?: Resident['middleName'];
		lastName?: Resident['lastName'];
		waterBill?: Resident['waterBill'];
		address?: Resident['address'];
		classification?: Resident['classification'];
	}>();

	const transaction = reactive({
		id: props.id,
		waterBill: props.waterBill,
	});

	function onSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;
		store.updateTransaction(transaction, props.uid!);
		isOpen.value = false;
		isLoading.value = false;
	}
</script>
<template>
	<div>
		<Button
			icon="pi pi-pencil"
			class="mr-2"
			text
			severity="success"
			@click="isOpen = true" />
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="waterBill Details"
			:modal="true">
			<div class="flex flex-col gap-6">
				<!-- <img v-if="waterBill.image" :src="`https://primefaces.org/cdn/primevue/images/product/${waterBill.image}`" :alt="waterBill.image" class="block m-auto pb-4" /> -->
				<div>
					<label
						for="name"
						class="block font-bold mb-3"
						>Water Bill</label
					>
					<InputNumber
						id="name"
						v-model.trim="transaction.waterBill"
						required="true"
						autofocus
						:invalid="isSubmitted && !transaction.waterBill"
						fluid />
					<small
						v-if="!transaction.waterBill && isSubmitted"
						class="text-red-500"
						>Name is required.</small
					>
				</div>
			</div>

			<template #footer>
				<Button
					label="Cancel"
					severity="danger"
					icon="pi pi-times"
					text
					@click="isOpen = false" />
				<Button
					label="Save"
					icon="pi pi-check"
					@click="onSubmit"
					:loading="isLoading" />
			</template>
		</Dialog>
	</div>
</template>
