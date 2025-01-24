<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';

	const store = useResidentStore();
	const isOpen = ref(false);
	const isSubmitted = ref(false);

	const props = defineProps<{
		id?: Resident['id'];
		firstName?: Resident['firstName'];
		middleName?: Resident['middleName'];
		lastName?: Resident['lastName'];
		waterBill?: Resident['waterBill'];
		address?: Resident['address'];
		classification?: Resident['classification'];
	}>();

	const resident = reactive({
		id: props.id,
		firstName: props.firstName,
		middleName: props.middleName,
		lastName: props.lastName,
	});

	function onSubmit() {
		isSubmitted.value = true;
		store.updateResident(resident);
		isOpen.value = false;
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
		header="Update Resident Details"
		modal>
		<form
			@submit.prevent="onSubmit"
			class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<!-- <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" /> -->
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
							:invalid="isLoading && !resident.address"
							fluid />
						<small
							v-if="isLoading && !resident.address"
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
							:invalid="isLoading && !resident.classification"
							fluid />
						<small
							v-if="isLoading && !resident.classification"
							class="text-red-500"
							>Classification is required.</small
						>
					</div>
			</div>

			<div class="w-full flex justify-end gap-4">
				<Button
					label="Cancel"
					icon="pi pi-times"
					text
					@click="isOpen = false" />
				<Button
					label="Save"
					icon="pi pi-check"
					type="submit" />
			</div>
		</form>
	</Dialog>
</template>
