<template>
	<Button
		icon="pi pi-money-bill"
		severity="primary"
		label="Pay Current Bill"
		size="small"
		@click="visible = true" />
	<Dialog
		v-model:visible="visible"
		modal
		header="Pay Bill"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
		<div>
			<div class="flex justify-center">
				<Image
					src="https://businessmaker-academy.com/cms/wp-content/uploads/2022/04/Gcash-BMA-QRcode.jpg"
					alt="Image"
					width="300"
					preview />
			</div>
			<span class="text-surface-500 dark:text-surface-400 block mb-2 mt-5">
				Upload your receipt.
			</span>
			<FileUpload
				@select="onFileSelected"
				:multiple="false"
				accept="image/*"
				:maxFileSize="1000000">
				<template #empty>
					<span>Drag and drop files here to upload.</span>
				</template>
			</FileUpload>
			<div
				v-if="uploading"
				class="text-center mt-3">
				Uploading...
			</div>
			<div
				v-if="downloadURL"
				class="text-center mt-3">
				<a
					:href="downloadURL"
					target="_blank"
					class="text-blue-500 underline">
					View uploaded receipt
				</a>
			</div>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import { useStorageFile } from 'vuefire';
	import { getStorage, ref as storageRef } from 'firebase/storage';

	const toast = useToast();
	const visible = ref(false);
	const uploading = ref(false);
	const downloadURL = ref();
	const storage = getStorage();

	async function onFileSelected(event: any) {
		const file = event.files[0];
		if (!file) return;

		const filePath = `payments/${file.name}`;
		const fileRef = storageRef(storage, filePath);
		const { upload, url } = useStorageFile(fileRef);

		try {
			uploading.value = true;
			await upload(file);
			downloadURL.value = url.value;

			toast.add({
				severity: 'success',
				summary: 'Upload Successful',
				detail: 'Receipt uploaded successfully',
				life: 3000,
			});
		} catch (error) {
			console.error('Upload error:', error);
			toast.add({
				severity: 'error',
				summary: 'Upload Failed',
				detail: 'There was an issue uploading your receipt.',
				life: 3000,
			});
		} finally {
			uploading.value = false;
		}
	}
</script>
