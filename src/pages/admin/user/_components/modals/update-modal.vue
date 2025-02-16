<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';
	import { validateForm } from '../../_composables/validate';

	const store = useResidentStore();
	const isOpen = ref(false);
	const isSubmitted = ref(false);

	const props = defineProps<{
		id?: Resident['id'];
		uid?: Resident['uid'];
		accountNumber?: Resident['accountNumber'];
		fullname?: Resident['fullname'];
		address?: Resident['address'];
	}>();

	const resident = reactive({
		fullname: props.fullname,
		address: props.address,
	});

	const isLoading = ref(false);
	function onSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;

		const result = validateForm(resident)
		if(result.error) {
			isLoading.value = false;
			return;
		}
		store.updateResident(resident, props.uid!);
		isOpen.value = false;
		isLoading.value = false;
	}
</script>

<template>
	<Button
		icon="pi pi-pen-to-square"
		text
		class="mr-2"
		@click="isOpen = true" />
	<Dialog
		v-model:visible="isOpen"
		:style="{ width: '450px' }"
		modal>
		<template #header>
			<div class="inline-flex items-center justify-center gap-2">
				<Avatar icon="pi pi-user" class="mr-2" size="normal" />
				<span class="font-bold whitespace-nowrap">{{ resident.fullname }}</span>
			</div>
		</template>
		<span class="text-surface-500 dark:text-surface-400 block mb-8">Update resident information.</span>
		<form
			@submit.prevent="onSubmit"
			class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<!-- <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" /> -->
				<div class="flex flex-wrap gap-5">
					<div class="flex-auto">
						<label
							for="name"
							class="block mb-3"
							>Fullname</label
						>
						<InputText
							id="name"
							v-model.trim="resident.fullname"
						
							autofocus
							:invalid="isSubmitted && !resident.fullname"
							fluid />
						<small
							v-if="isSubmitted && !resident.fullname"
							class="text-red-500"
							>Fullname is required.</small
						>
					</div>
				</div>
				<div>
					<label
						for="name"
						class="block mb-3"
						>Address</label
					>
					<InputText
						id="name"
						v-model.trim="resident.address"
					
						autofocus
						:invalid="isSubmitted && !resident.address"
						fluid />
					<small
						v-if="isSubmitted && !resident.address"
						class="text-red-500"
						>Address is required.</small
					>
				</div>
			</div>

			<div class="w-full flex justify-end gap-4">
				<Button
					label="Cancel"
					severity="danger"
					text
					@click="isOpen = false" />
				<Button
					label="Save"
					type="submit"
					:loading="isLoading" />
			</div>
		</form>
	</Dialog>
</template>
