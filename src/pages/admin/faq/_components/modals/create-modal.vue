<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import { useToast } from 'primevue';
	import type { Faq } from '@/types/faq';
	import { useFaqStore } from '@/stores/faq';

	const store = useFaqStore();
	const toast = useToast();
	const isOpen = ref(false);
	const isLoading = ref(false);

	const faq = ref<Faq>({});

	async function onSubmit() {
		isLoading.value = true;

		const response = await store.addFaq(faq.value);
		toast.add({
			severity: response.status,
			summary: response.statusMessage,
			detail: response.message,
			life: 3000,
		});
		isOpen.value = false;
		faq.value = {};
		isLoading.value = false;
	}
</script>
<template>
	<div>
		<Button
			icon="pi pi-plus"
			label="FAQ"
			class="mr-2"
			@click="isOpen = true" />
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Create FAQ"
			modal>
			<form
				@submit.prevent="onSubmit"
				class="flex flex-col gap-4">
				<div class="flex flex-col gap-4">
					<div>
						<label
							for="name"
							class="block mb-1"
							>Question</label
						>
						<InputText
							id="name"
							v-model.trim="faq.question"
							variant="filled"
							autofocus
							fluid
							required />
					</div>
					<div>
						<label
							for="name"
							class="block mb-1"
							>Answer</label
						>
						<Textarea
							v-model="faq.answer"
							rows="5"
							fluid
							required />
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
