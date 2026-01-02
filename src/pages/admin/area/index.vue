<template>
	<div class="p-4 md:p-6">
		<Header page-title="Area Locations" />

		<div class="flex flex-col gap-6">
			<!-- Actions Bar -->
			<div class="flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center gap-3">
					<Button
						type="button"
						label="Add New Area"
						icon="pi pi-plus"
						@click="handleAreaDialog(null)" />
				</div>

				<div class="flex items-center gap-3">
					<!-- Filter: Active / Inactive -->
					<Select
						v-model="filterActive"
						:options="activeOptions"
						optionLabel="label"
						optionValue="value"
						placeholder="Show All"
						class="w-48"
						@change="loadAreas" />

					<!-- Optional: Search by name/code -->
					<!-- <InputText
            v-model="searchQuery"
            placeholder="Search area..."
            class="w-64"
            @input="debouncedSearch" /> -->
				</div>
			</div>

			<!-- Areas List (Table) -->
			<area-list
				:areas="filteredAreas"
				:loading="isLoading"
				@edit="handleAreaDialog"
				@delete="confirmDelete"
				@toggle-active="confirmToggleActive" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, computed, watch } from 'vue';
	import { useConfirm, useDialog, useToast } from 'primevue';

	import Header from '@/components/globals/header.vue';
	import AreaList from './_components/area-list.vue';
	import AreaDialog from './_components/area-dialog.vue';

	import { useAreaStore } from '@/stores/area';

	const store = useAreaStore();
	const dialog = useDialog();
	const toast = useToast();
	const confirm = useConfirm();

	const isLoading = ref(false);

	// Filters
	const filterActive = ref<boolean | null>(true); // true = active only, false = inactive, null = all
	const searchQuery = ref('');
	const activeOptions = [
		{ label: 'Active Only', value: true },
		{ label: 'Inactive Only', value: false },
		{ label: 'Show All', value: null },
	];

	// Computed: filtered by search (client-side for simplicity)
	const filteredAreas = computed(() => {
		let list = store.areas;

		if (filterActive.value !== null) {
			list = list.filter((a) => a.isActive === filterActive.value);
		}

		if (searchQuery.value.trim()) {
			const query = searchQuery.value.toLowerCase();
			list = list.filter(
				(a) =>
					a.name.toLowerCase().includes(query) ||
					(a.code && a.code.toLowerCase().includes(query)),
			);
		}

		return list;
	});

	// Load areas
	const loadAreas = async () => {
		isLoading.value = true;
		try {
			if (filterActive.value !== null) {
				await store.fetchAreas({ isActive: filterActive.value });
			} else {
				await store.fetchAreas(); // fetches all
			}
		} finally {
			isLoading.value = false;
		}
	};

	// Dialog: Create or Edit
	const handleAreaDialog = (area: any | null) => {
		dialog.open(AreaDialog, {
			props: {
				header: area ? 'Edit Area' : 'Add New Area',
				style: { width: '50vw' },
				breakpoints: { '960px': '75vw', '640px': '90vw' },
				modal: true,
			},
			data: { area: area ? { ...area } : null },
			onClose: (result: any) => {
				if (result?.success) {
					toast.add({
						severity: 'success',
						summary: 'Success',
						detail: area ? 'Area updated' : 'Area created',
						life: 3000,
					});
				}
			},
		});
	};

	// Confirm delete
	const confirmDelete = (id: string) => {
		confirm.require({
			message: 'This will permanently delete the area. Continue?',
			header: 'Delete Area',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Yes, Delete',
			rejectLabel: 'Cancel',
			acceptClass: 'p-button-danger',
			accept: async () => {
				try {
					await store.deleteArea(id);
					toast.add({
						severity: 'success',
						summary: 'Deleted',
						detail: 'Area deleted permanently',
						life: 3000,
					});
				} catch (err: any) {
					toast.add({
						severity: 'error',
						summary: 'Error',
						detail: err.message || 'Failed to delete',
						life: 5000,
					});
				}
			},
		});
	};

	// Toggle active/inactive
	const confirmToggleActive = (area: any) => {
		const willActivate = !area.isActive;
		confirm.require({
			message: `Are you sure you want to ${
				willActivate ? 'activate' : 'deactivate'
			} this area?`,
			header: `${willActivate ? 'Activate' : 'Deactivate'} Area`,
			icon: 'pi pi-info-circle',
			acceptLabel: willActivate ? 'Yes, Activate' : 'Yes, Deactivate',
			rejectLabel: 'Cancel',
			acceptClass: willActivate ? 'p-button-success' : 'p-button-warning',
			accept: async () => {
				try {
					if (willActivate) {
						await store.activateArea(area.id);
					} else {
						await store.deactivateArea(area.id);
					}
					toast.add({
						severity: 'success',
						summary: 'Updated',
						detail: `Area ${willActivate ? 'activated' : 'deactivated'}`,
						life: 3000,
					});
				} catch (err: any) {
					toast.add({
						severity: 'error',
						summary: 'Error',
						detail: err.message || 'Failed to update status',
						life: 5000,
					});
				}
			},
		});
	};

	// Load on mount and when filter changes
	onMounted(loadAreas);
	watch(filterActive, loadAreas);
</script>
