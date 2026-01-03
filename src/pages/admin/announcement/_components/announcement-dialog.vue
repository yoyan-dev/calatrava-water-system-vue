<!-- _components/announcement-dialog.vue -->
<template>
	<div class="max-w-4xl mx-auto">
		<form
			@submit.prevent="handleSubmit"
			class="space-y-8">
			<AnnouncementBasicInfo v-model="form" />

			<AnnouncementTargeting v-model:target-zones="form.targetZones" />

			<AnnouncementMediaUpload
				v-model:image-url="form.imageUrl"
				v-model:imageFile="imageFile" />

			<AnnouncementScheduling
				v-model:published-at="publishedAtDate"
				v-model:expires-at="expiresAtDate" />

			<div
				class="flex justify-end gap-3 pt-6 border-t border-surface-200 dark:border-surface-700">
				<Button
					label="Cancel"
					severity="secondary"
					@click="closeDialog" />
				<Button
					type="submit"
					label="Save Announcement"
					:loading="saving" />
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, inject } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import { useAnnouncementStore } from '@/stores/announcement';
	import type { Announcement } from '@/types/announcement';

	import AnnouncementBasicInfo from './announcement-basic-info.vue';
	import AnnouncementTargeting from './announcement-targeting.vue';
	import AnnouncementMediaUpload from './announcement-media-upload.vue';
	import AnnouncementScheduling from './announcement-scheduling.vue';

	const dialogRef = inject<any>('dialogRef');
	const toast = useToast();
	const announcementStore = useAnnouncementStore();
	const saving = ref(false);
	const imagePreview = ref<string | null>(null);

	const form = ref<Partial<Announcement>>({
		title: '',
		content: '',
		status: 'DRAFT',
		priority: 'NORMAL',
		targetZones: null,
		imageUrl: null,
	});

	const imageFile = ref(null);

	const publishedAtDate = ref<Date | null>(null);
	const expiresAtDate = ref<Date | null>(null);

	const currentAnnouncement = computed(
		() => dialogRef.value?.data?.announcement as Announcement | undefined,
	);

	// Load data when dialog opens
	onMounted(async () => {
		if (currentAnnouncement.value) {
			const ann = currentAnnouncement.value;
			form.value = {
				title: ann.title,
				content: ann.content,
				status: ann.status,
				priority: ann.priority,
				targetZones: ann.targetZones ?? null,
				imageUrl: ann.imageUrl ?? null,
			};

			publishedAtDate.value = ann.publishedAt
				? new Date(ann.publishedAt)
				: null;
			expiresAtDate.value = ann.expiresAt ? new Date(ann.expiresAt) : null;
			imagePreview.value = ann.imageUrl || null;
		}
	});

	const closeDialog = () => dialogRef.value?.close();

	const handleSubmit = async () => {
		if (!form.value.title?.trim() || !form.value.content?.trim()) {
			toast.add({
				severity: 'warn',
				summary: 'Required',
				detail: 'Title and content are required',
				life: 3000,
			});
			return;
		}

		saving.value = true;
		try {
			const payload: Partial<Announcement> & { imageFile?: File | null } = {
				...form.value,
				publishedAt: publishedAtDate.value?.toISOString() || null,
				expiresAt: expiresAtDate.value?.toISOString() || null,

				imageFile: imageFile.value,
			};

			if (currentAnnouncement.value) {
				await announcementStore.updateAnnouncement(
					currentAnnouncement.value.id,
					payload,
				);
			} else {
				await announcementStore.createAnnouncement(payload);
			}

			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Announcement saved!',
				life: 3000,
			});
			closeDialog();
		} catch (err: any) {
			toast.add({
				severity: 'error',
				summary: 'Error',
				detail: err.message || 'Failed to save',
				life: 5000,
			});
		} finally {
			saving.value = false;
		}
	};
</script>
