<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { useReaderStore } from '@/stores/reader';
	import type { Reader } from '@/types/reader';
	import { useToast } from 'primevue';

	const toast = useToast()
	const store = useReaderStore();
	const isOpen = ref(false);
	const isSubmitted = ref(false);

	const props = defineProps<{
		uid?: Reader['uid'];
		name?: Reader['name'];
		area?: Reader['area'];
	}>();

	const reader = reactive({
		name: props.name,
		area: props.area,
	});

	const isLoading = ref(false);
	function validateForm() {
		if (!reader.name || !reader.area) {
			return false;
		}
		return true;
	}

	async function onSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;
		const isValid = validateForm()

		if(!isValid){
			isLoading.value = false;
			return
		}
		// const response = await store.updateReader(reader);
		// toast.add({
		// 	severity: response.status,
		// 	summary: response.statusMessage,
		// 	detail: response.message,
		// 	life: 3000,
		// });
		isSubmitted.value = false;
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
				<span class="font-bold whitespace-nowrap">{{ reader.name }}</span>
			</div>
		</template>
		<span class="text-surface-500 dark:text-surface-400 block mb-8">Update reader information.</span>
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
						:invalid="isSubmitted && !reader.area"
						fluid />
					<small
						v-if="isSubmitted && !reader.area"
						class="text-red-500"
						>This field must not be empty.</small
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
