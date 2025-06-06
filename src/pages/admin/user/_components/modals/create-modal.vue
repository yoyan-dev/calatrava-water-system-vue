<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';
	import { useToast } from 'primevue';
	import { validateForm } from '../../_composables/validate';

	const store = useResidentStore();
	const toast = useToast();
	const isOpen = ref(false);
	const isLoading = ref(false);

	const resident = ref<Resident>({});
	const errorAccountNumberMessage = ref('');

	const isSubmitted = ref(false);

	async function onSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;

		const result = validateForm(resident.value);
		errorAccountNumberMessage.value = result.errorAccountNumberMessage;
		if (result.error) {
			isLoading.value = false;
			return;
		}

		isSubmitted.value = false;
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
		<Button
			icon="pi pi-plus"
			class="visible md:hidden"
			@click="isOpen = true" />
		<div class="hidden md:block">
			<Button
				icon="pi pi-plus"
				label="resident"
				class="mr-2"
				size="small"
				@click="isOpen = true" />
		</div>
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Create Resident"
			modal>
			<form
				@submit.prevent="onSubmit"
				class="flex flex-col gap-4">
				<div class="flex flex-col gap-4">
					<div>
						<label
							for="acc-no"
							class="block mb-1"
							>Account Number</label
						>
						<InputNumber
							id="acc-no"
							v-model.trim="resident.accountNumber"
							variant="filled"
							autofocus
							inputId="withoutgrouping"
							:useGrouping="false"
							:invalid="isSubmitted && !resident.accountNumber"
							fluid />
						<small
							v-if="
								(isSubmitted && !resident.accountNumber) ||
								errorAccountNumberMessage
							"
							class="text-red-500"
							>{{
								errorAccountNumberMessage
									? errorAccountNumberMessage
									: 'Account Number is required.'
							}}</small
						>
					</div>
					<div>
						<label
							for="name"
							class="block mb-1"
							>Firstname</label
						>
						<InputText
							id="name"
							v-model.trim="resident.fullname"
							variant="filled"
							autofocus
							:invalid="isSubmitted && !resident.fullname"
							fluid />
						<small
							v-if="isSubmitted && !resident.fullname"
							class="text-red-500"
							>Fullname is required.</small
						>
					</div>
					<div>
						<label
							for="name"
							class="block mb-1"
							>Book</label
						>
						<InputText
							id="name"
							v-model.trim="resident.book"
							variant="filled"
							autofocus
							:invalid="isSubmitted && !resident.book"
							fluid />
						<small
							v-if="isSubmitted && !resident.book"
							class="text-red-500"
							>Book is required.</small
						>
					</div>
				</div>

				<div class="w-full flex items-center justify-end gap-4">
					<Button
						label="Cancel"
						severity="danger"
						text
						@click="isOpen = false" />
					<Button
						label="Save"
						:loading="isLoading"
						type="submit" />
				</div>
			</form>
		</Dialog>
	</div>
</template>
