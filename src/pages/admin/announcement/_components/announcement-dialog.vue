<!-- _components/announcement-dialog.vue -->
<template>
	<div>
		<form
			@submit.prevent="handleSubmit"
			class="space-y-6">
			<!-- Title -->
			<div>
				<label
					class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					Title <span class="text-red-500">*</span>
				</label>
				<InputText
					v-model="form.title"
					class="w-full"
					placeholder="Enter Title"
					:invalid="!form.title" />
			</div>

			<!-- Content -->
			<div>
				<label
					class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					Content <span class="text-red-500">*</span>
				</label>
				<Textarea
					v-model="form.content"
					rows="5"
					class="w-full"
					placeholder="Write the content..."
					:invalid="!form.content" />
			</div>

			<!-- Priority & Status -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Priority
					</label>
					<Select
						v-model="form.priority"
						:options="priorityOptions"
						optionLabel="label"
						optionValue="value"
						placeholder="Select priority"
						class="w-full" />
				</div>

				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Status
					</label>
					<Select
						v-model="form.status"
						:options="statusOptions"
						optionLabel="label"
						optionValue="value"
						placeholder="Select status"
						class="w-full" />
				</div>
			</div>

			<!-- Dates -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Published At
					</label>
					<DatePicker
						v-model="form.publishedAt"
						showTime
						hourFormat="12"
						dateFormat="yy-mm-dd"
						placeholder="Select date & time"
						class="w-full" />
				</div>

				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Expires At
					</label>
					<DatePicker
						v-model="form.expiresAt"
						showTime
						hourFormat="12"
						dateFormat="yy-mm-dd"
						placeholder="Optional expiry"
						class="w-full" />
				</div>
			</div>

			<!-- Actions -->
			<div class="flex justify-end gap-3 pt-4">
				<Button
					type="button"
					label="Cancel"
					severity="secondary"
					@click="$emit('closed')" />
				<Button
					type="submit"
					label="Save"
					:loading="saving" />
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref, watch, inject, onMounted } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import { useAnnouncementStore } from '@/stores/announcement';
	import type { Announcement } from '@/types/announcement';

	const dialogRef = inject<any>('dialogRef');
	const announcement = ref<Announcement>();

	const store = useAnnouncementStore();
	const toast = useToast();

	const saving = ref(false);

	const priorityOptions = [
		{ label: 'Normal', value: 'NORMAL' },
		{ label: 'Important', value: 'IMPORTANT' },
		{ label: 'Critical', value: 'CRITICAL' },
	];

	const statusOptions = [
		{ label: 'Draft', value: 'DRAFT' },
		{ label: 'Published', value: 'PUBLISHED' },
		{ label: 'Archived', value: 'ARCHIVED' },
	];

	const form = ref({
		title: '',
		content: '',
		priority: 'NORMAL' as 'NORMAL' | 'IMPORTANT' | 'CRITICAL',
		status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
		publishedAt: null as Date | null,
		expiresAt: null as Date | null,
	});

	// Computed to convert Date → string for saving
	const publishedAtString = computed({
		get: () =>
			form.value.publishedAt ? form.value.publishedAt.toISOString() : null,
		set: (val: string | null) => {
			form.value.publishedAt = val ? new Date(val) : null;
		},
	});

	const expiresAtString = computed({
		get: () =>
			form.value.expiresAt ? form.value.expiresAt.toISOString() : null,
		set: (val: string | null) => {
			form.value.expiresAt = val ? new Date(val) : null;
		},
	});

	// Watch announcement prop and convert string → Date
	watch(
		() => announcement.value,
		(ann) => {
			if (ann) {
				form.value = {
					title: ann.title,
					content: ann.content,
					priority: ann.priority,
					status: ann.status,
					publishedAt: ann.publishedAt ? new Date(ann.publishedAt) : null,
					expiresAt: ann.expiresAt ? new Date(ann.expiresAt) : null,
				};
			} else {
				// Reset for create mode
				form.value = {
					title: '',
					content: '',
					priority: 'NORMAL',
					status: 'DRAFT',
					publishedAt: null,
					expiresAt: null,
				};
			}
		},
		{ immediate: true },
	);

	// Close Modal
	const closeModal = () => {
		dialogRef.value?.close();
	};

	// In handleSubmit, use the computed string values
	const handleSubmit = async () => {
		if (!form.value.title || !form.value.content) {
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
			const payload = {
				title: form.value.title,
				content: form.value.content,
				priority: form.value.priority,
				status: form.value.status,
				publishedAt: publishedAtString.value,
				expiresAt: expiresAtString.value,
			};

			if (announcement.value) {
				await store.updateAnnouncement(announcement.value.id, payload);
				closeModal();
			} else {
				await store.createAnnouncement(payload);
				closeModal();
			}

			toast.add({
				severity: 'success',
				summary: 'Saved',
				detail: 'Announcement saved successfully',
				life: 3000,
			});
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

	onMounted(() => {
		announcement.value = dialogRef.value.data.announcement;
	});
</script>
