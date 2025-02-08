<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';

	const store = useResidentStore();
	const isOpen = ref(false);
	const isSubmitted = ref(false);

	const props = defineProps<{
		id?: Resident['id'];
		uid?: Resident['uid'];
		accountNumber?: Resident['accountNumber'];
		firstName?: Resident['firstName'];
		middleName?: Resident['middleName'];
		lastName?: Resident['lastName'];
		waterBill?: Resident['waterBill'];
		address?: Resident['address'];
		classification?: Resident['classification'];
	}>();

	const resident = reactive({
		firstName: props.firstName,
		middleName: props.middleName,
		lastName: props.lastName,
		address: props.address,
		classification: props.classification,
	});

	const isLoading = ref(false);
	function onSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;
		store.updateResident(resident, props.uid!);
		isOpen.value = false;
		isLoading.value = false;
	}
</script>

<template>
	<Button
		icon="pi pi-pencil"
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
				<span class="font-bold whitespace-nowrap">{{ resident.firstName }} {{ resident.lastName }}</span>
			</div>
		</template>
		<span class="text-surface-500 dark:text-surface-400 block mb-8">Update resident information.</span>
		<form
			@submit.prevent="onSubmit"
			class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<!-- <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" /> -->
				<div class="flex gap-5">
					<div>
						<label
							for="name"
							class="block font-bold mb-3"
							>Firstname</label
						>
						<InputText
							id="name"
							v-model.trim="resident.firstName"
							required="true"
							autofocus
							:invalid="isSubmitted && !resident.firstName"
							fluid />
						<small
							v-if="isSubmitted && !resident.firstName"
							class="text-red-500"
							>firstname is required.</small
						>
					</div>
					<div>
						<label
							for="name"
							class="block font-bold mb-3"
							>Middle name</label
						>
						<InputText
							id="name"
							v-model.trim="resident.middleName"
							required="true"
							autofocus
							:invalid="isSubmitted && !resident.middleName"
							fluid />
						<small
							v-if="isSubmitted && !resident.middleName"
							class="text-red-500"
							>Middle name is required.</small
						>
					</div>
					<div>
						<label
							for="name"
							class="block font-bold mb-3"
							>Lastname</label
						>
						<InputText
							id="name"
							v-model.trim="resident.lastName"
							required="true"
							autofocus
							:invalid="isSubmitted && !resident.lastName"
							fluid />
						<small
							v-if="isSubmitted && !resident.lastName"
							class="text-red-500"
							>Last name is required.</small
						>
					</div>
				</div>
				<div>
					<label
						for="name"
						class="block font-bold mb-3"
						>Address</label
					>
					<InputText
						id="name"
						v-model.trim="resident.address"
						required="true"
						autofocus
						:invalid="isSubmitted && !resident.address"
						fluid />
					<small
						v-if="isSubmitted && !resident.address"
						class="text-red-500"
						>Address is required.</small
					>
				</div>
				<div>
					<label
						for="name"
						class="block font-bold mb-3"
						>Classification</label
					>
					<InputText
						id="name"
						v-model.trim="resident.classification"
						required="true"
						autofocus
						:invalid="isSubmitted && !resident.classification"
						fluid />
					<small
						v-if="isSubmitted && !resident.classification"
						class="text-red-500"
						>Classification is required.</small
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
