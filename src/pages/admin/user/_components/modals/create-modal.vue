<script setup lang="ts">
	import { ref } from 'vue';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';
	import { Toast, useToast } from 'primevue';

	const store = useResidentStore();
	const toast = useToast();
	const isOpen = ref(false);
	const isLoading = ref(false);

	const resident = ref<Resident>({});

	async function onSubmit() {
		isLoading.value = true;
		const response = await store.addResident(resident.value);
		toast.add({
			severity: response.status,
			summary: response.statusMessage,
			detail: response.message,
			life: 3000,
		});
		isOpen.value = false;
		resident.value = {};
		isLoading.value = false;
	}
</script>
<template>
	<div>
		<Toast position="bottom-right" />
		<Button
			label="New"
			icon="pi pi-plus"
			class="mr-2"
			@click="isOpen = true" />
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Resident Details"
			modal>
			<form
				@submit.prevent="onSubmit"
				class="flex flex-col gap-4">
				<div class="flex flex-col gap-4">
					<!-- <img v-if="resident.image" :src="`https://primefaces.org/cdn/primevue/images/resident/${resident.image}`" :alt="resident.image" class="block m-auto pb-4" /> -->
					<div>
						<label
							for="acc-no"
							class="block font-bold mb-3"
							>Account Number</label
						>
						<InputText
							id="acc-no"
							v-model.trim="resident.accountNumber"
							required="true"
							autofocus
							:invalid="isLoading && !resident.accountNumber"
							fluid />
						<small
							v-if="isLoading && !resident.accountNumber"
							class="text-red-500"
							>Account Number is required.</small
						>
					</div>
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
								:invalid="isLoading && !resident.firstName"
								fluid />
							<small
								v-if="isLoading && !resident.firstName"
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
								:invalid="isLoading && !resident.middleName"
								fluid />
							<small
								v-if="isLoading && !resident.middleName"
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
								:invalid="isLoading && !resident.lastName"
								fluid />
							<small
								v-if="isLoading && !resident.lastName"
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
					<!-- <div>
											<label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
											<Select id="inventoryStatus" v-model="resident.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
									</div> -->
				</div>

				<div class="w-full flex items-center justify-end gap-4">
					<Button
						label="Cancel"
						icon="pi pi-times"
						severity="danger"
						text
						@click="isOpen = false" />
					<Button
						label="Save"
						icon="pi pi-check"
						type="submit" />
				</div>
			</form>
		</Dialog>
	</div>
</template>
