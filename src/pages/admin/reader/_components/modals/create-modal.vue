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

	async function onSubmit() {
		isLoading.value = true;
		const response = await store.addReader(reader.value);
		toast.add({
			severity: response.status,
			summary: response.statusMessage,
			detail: response.message,
			life: 3000,
		});
		isOpen.value = false;
		reader.value = {};
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
							class="block font-bold mb-3"
							>Name</label
						>
						<InputText
							id="name"
							v-model.trim="reader.name"
							required="true"
							autofocus
							:invalid="isLoading && !reader.name"
							fluid />
						<small
							v-if="isLoading && !reader.name"
							class="text-red-500"
							>Name is required.</small
						>
					</div>
					<!-- <div>
						<label
							for="name"
							class="block font-bold mb-3"
							>First Reading</label
						>
						<InputNumber
							v-model.trim="reader.currentReading"
							required="true"
							autofocus
							inputId="integeronly"
							:invalid="isLoading && !reader.currentReading"
							fluid />
						<small
							v-if="isLoading && !reader.currentReading"
							class="text-red-500"
							>Reading is required.</small
						>
					</div> -->
				</div>

				<div class="w-full flex items-center justify-end gap-4">
					<Button
						label="Cancel"
						severity="danger"
						text
						@click="isOpen = false" />
					<Button
						label="Save"
						type="submit" />
				</div>
			</form>
		</Dialog>
	</div>
</template>
