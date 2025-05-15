<script setup lang="ts">
	import { ref, inject, onMounted, reactive } from 'vue';
	import { useFaqStore } from '@/stores/faq';
	import type { Faq } from '@/types/faq';
	import { useToast } from 'primevue/usetoast';

	const store = useFaqStore();
	const toast = useToast();
	const dialogRef = inject<any>('dialogRef');
	const faq = ref<Faq>({});

	onMounted(() => {
		faq.value = dialogRef.value.data.faq;
	});

	const isLoading = ref(false);
	async function onSubmit() {
		isLoading.value = true;
		const res = await store.updateFaq(faq.value.uid as string, faq.value);
		toast.add({
			severity: res.status,
			summary: res.statusMessage,
			detail: res.message,
			life: 3000,
		});
		dialogRef.value.close();
		isLoading.value = false;
	}

	function onClose() {
		dialogRef.value.close();
	}
</script>

<template>
	<div>
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
							>Question</label
						>
						<InputText
							id="name"
							v-model.trim="faq.question"
							autofocus
							fluid />
					</div>
				</div>
				<div>
					<label
						for="name"
						class="block mb-3"
						>Answer</label
					>
					<Textarea
						v-model="faq.answer"
						rows="5"
						fluid />
				</div>
			</div>

			<div class="w-full flex justify-end gap-4">
				<Button
					label="Cancel"
					severity="danger"
					text
					@click="onClose" />
				<Button
					label="Save"
					type="submit"
					:loading="isLoading" />
			</div>
		</form>
	</div>
</template>
