<template>
	<div class="space-y-6">
		<!-- Image -->
		<div>
			<label class="block text-sm font-medium mb-2"
				>Featured Image (Optional)</label
			>
			<FileUpload
				mode="basic"
				accept="image/*"
				:maxFileSize="5000000"
				chooseLabel="Choose Image"
				@select="onImageSelect"
				customUpload />

			<div
				v-if="imagePreview"
				class="mt-4 relative inline-block">
				<!-- Clear Button - Positioned at top-right corner -->
				<Button
					icon="pi pi-times"
					severity="danger"
					text
					rounded
					class="absolute -top-2 -right-2 shadow-lg hover:shadow-xl transition-shadow"
					@click="clearImage"
					aria-label="Remove image" />
				<img
					:src="imagePreview"
					alt="Featured image preview"
					class="max-w-md max-h-96 rounded-lg border border-surface-300 dark:border-surface-600 shadow-md object-cover" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { fileToURL } from '@/composables/fileToURL';
	import { watch, ref } from 'vue';

	const localImageUrl = defineModel<string | null>('imageUrl');
	const imageFile = defineModel<File | null>('imageFile');

	const imagePreview = ref<string | null | undefined>(null);

	watch(
		localImageUrl,
		(val) => {
			imagePreview.value = val;
		},
		{ immediate: true },
	);

	const onImageSelect = async (event: any) => {
		const file = event.files[0];
		if (!file) return;
		imagePreview.value = fileToURL(file);
		imageFile.value = file;
	};

	const clearImage = () => {
		if (localImageUrl.value) URL.revokeObjectURL(localImageUrl.value);
		imagePreview.value = null;
	};
</script>
