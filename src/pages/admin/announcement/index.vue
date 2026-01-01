<template>
	<div class="p-4 md:p-6">
		<Header page-title="Announcements" />

		<div class="flex flex-col gap-6">
			<!-- Actions Bar -->
			<div class="flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center gap-3">
					<Button
						type="button"
						label="Create New Announcement"
						icon="pi pi-plus"
						@click="handleAnnouncementDialog(null)" />
				</div>

				<!-- Optional: Filter by status or priority -->
				<div class="flex items-center gap-3">
					<Select
						v-model="selectedStatus"
						:options="statusOptions"
						optionLabel="label"
						optionValue="value"
						placeholder="Filter by Status"
						class="w-48"
						@change="loadAnnouncements" />
				</div>
			</div>

			<!-- Announcements List -->
			<AnnouncementCards
				:announcements="store.announcements"
				:loading="isLoading"
				@open-edit-dialog="handleAnnouncementDialog"
				@delete="confirmDelete" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import { useDialog } from 'primevue';

	import Header from '@/components/globals/header.vue';
	import AnnouncementCards from './_components/announcement-cards.vue';
	import AnnouncementDialog from './_components/announcement-dialog.vue';

	import { useAnnouncementStore } from '@/stores/announcement';

	const store = useAnnouncementStore();
	const dialog = useDialog();
	const toast = useToast();
	const isLoading = ref(false);

	// Dialog state
	const dialogVisible = ref(false);
	const selectedAnnouncement = ref<any>(null); // null = create mode

	// Optional filter
	const selectedStatus = ref<'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null>(null);
	const statusOptions = [
		{ label: 'All', value: null },
		{ label: 'Draft', value: 'DRAFT' },
		{ label: 'Published', value: 'PUBLISHED' },
		{ label: 'Archived', value: 'ARCHIVED' },
	];

	// Open dialog for create or edit
	const handleAnnouncementDialog = (announcement?: any) => {
		selectedAnnouncement.value = announcement ? { ...announcement } : null;

		dialog.open(AnnouncementDialog, {
			props: {
				header: announcement ? 'Edit Announcement' : 'Create Announcement',
				style: {
					width: '50vw',
				},
				breakpoints: {
					'960px': '75vw',
					'640px': '90vw',
				},
				modal: true,
			},
			data: { announcement },
		});
	};

	// After save (create/update)
	const onAnnouncementSaved = async () => {
		toast.add({
			severity: 'success',
			summary: 'Success',
			detail: 'Announcement saved successfully',
			life: 3000,
		});
		dialogVisible.value = false;
		selectedAnnouncement.value = null;
		await loadAnnouncements();
	};

	// Confirm delete
	const confirmDelete = async (id: string) => {
		// You can replace this with PrimeVue ConfirmDialog if preferred
		if (confirm('Are you sure you want to delete this announcement?')) {
			try {
				await store.deleteAnnouncement(id);
				toast.add({
					severity: 'success',
					summary: 'Deleted',
					detail: 'Announcement deleted',
					life: 3000,
				});
				await loadAnnouncements();
			} catch (err: any) {
				toast.add({
					severity: 'error',
					summary: 'Error',
					detail: err.message || 'Failed to delete announcement',
					life: 5000,
				});
			}
		}
	};

	// Fetch announcements (with optional status filter)
	const loadAnnouncements = async () => {
		isLoading.value = true;
		try {
			await store.fetchAnnouncements({
				status: selectedStatus.value ?? undefined, // null → undefined (optional)
			});
		} finally {
			isLoading.value = false;
		}
	};

	// Optional: Refetch when filter changes
	watch(selectedStatus, loadAnnouncements);
	onMounted(loadAnnouncements);
</script>
