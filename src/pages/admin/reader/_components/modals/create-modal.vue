<script setup lang="ts">
	import { ref } from 'vue';
	import { useReaderStore } from '@/stores/reader';
	import type { Reader } from '@/types/reader';
	import { useToast } from 'primevue';

	const store = useReaderStore();
	const toast = useToast();
	const isOpen = ref(false);
	const isLoading = ref(false);

	const reader = ref<Reader>({});

	function validateForm() {
		if (!reader.value.name || !reader.value.area) {
			return false;
		}
		return true;
	}

	const isSubmitted = ref(false)

	async function onSubmit() {
		isSubmitted.value = true;
		isLoading.value = true;
		const isValid = validateForm()
		if(!isValid){
			isLoading.value = false;
			return
		}
		const response = await store.addReader(reader.value);
		toast.add({
			severity: response.status,
			summary: response.statusMessage,
			detail: response.message,
			life: 3000,
		});
		isOpen.value = false;
		reader.value = {};
		isSubmitted.value = false;
		isLoading.value = false;
	}
</script>
<template>
	<div>
		<Button
			label="New"
			icon="pi pi-plus"
			class="mr-2"
			@click="isOpen = true" />
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Create Reader"
			modal>
			<form
				@submit.prevent="onSubmit"
				class="flex flex-col gap-4">
				<div class="flex flex-col gap-4">
					<div>
						<label
							for="name"
							class="block mb-1"
							>Name</label
						>
						<InputText
							id="name"
							v-model.trim="reader.name"
							autofocus
							variant="filled"
							placeholder="Enter meter reader name"
							:invalid="isSubmitted && !reader.name"
							fluid />
						<small
							v-if="isSubmitted && !reader.name"
							class="text-red-500"
							>This field must not be empty.</small
						>
					</div>
					<div>
						<label
							for="name"
							class="block mb-1"
							>Area</label
						>
						<InputText
							id="name"
							v-model.trim="reader.area"
							autofocus
							variant="filled"
							placeholder="Enter meter reader area"
							:invalid="isSubmitted && !reader.area"
							fluid />
						<small
							v-if="isSubmitted && !reader.area"
							class="text-red-500"
							>This field must not be empty.</small
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
						:loading="isLoading"
						label="Save"
						type="submit" />
				</div>
			</form>
		</Dialog>
	</div>
</template>
