<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { useReaderStore } from '@/stores/reader';
	import type { Reader } from '@/types/reader';

	const store = useReaderStore();
	const isOpen = ref(false);
	const isSubmitted = ref(false);

	const props = defineProps<{
		uid?: Reader['uid'];
		name?: Reader['name'];
	}>();

	const reader = reactive({
		name: props.name,
	});

	const isLoading = ref(false);
	function onSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;
		// store.updateReader(reader, props.uid!);
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
						class="block font-bold mb-3"
						>Name</label
					>
					<InputText
						id="name"
						v-model.trim="reader.name"
						required="true"
						autofocus
						:invalid="isSubmitted && !reader.name"
						fluid />
					<small
						v-if="isSubmitted && !reader.name"
						class="text-red-500"
						>Name is required.</small
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
