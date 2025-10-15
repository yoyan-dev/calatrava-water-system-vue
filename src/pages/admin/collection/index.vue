<script setup lang="ts">
	import { ref, onMounted, watch } from 'vue';
	import { watchDebounced } from '@vueuse/core';
	import Header from '@/pages/admin/collection/_components/header.vue';
	import { useCollectionStore } from '@/stores/collection';
	import ImportModal from './_components/modals/import-modal.vue';
	import DeleteSelected from './_components/modals/delete-selected-modal.vue';
	import CollectionsTable from './_components/tables/collections-table.vue';

	const store = useCollectionStore();
	const selectedCollection = ref([]);

	onMounted(() => {
		store.fetchCollections();
	});

	// Reset page and fetch on month change (immediate)
	watch(
		() => store.month,
		() => {
			store.page = 0;
			store.fetchCollections();
		},
	);

	// Debounced search: reset page and fetch
	watchDebounced(
		() => store.searchQuery,
		() => {
			store.page = 0;
			store.fetchCollections();
		},
		{ debounce: 300 },
	);

	// Immediate fetch on page change
	watch(
		() => store.page,
		() => {
			store.fetchCollections();
		},
	);
</script>

<template>
	<div class="p-4 md:p-6">
		<Header :totalCollections="store.totalCollections" />
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div class="flex gap-5 flex-wrap items-start">
					<div class="flex-1">
						<IconField>
							<InputIcon>
								<i class="pi pi-search" />
							</InputIcon>
							<InputText
								v-model="store.searchQuery"
								placeholder="Search by account no." />
						</IconField>
					</div>
					<div class="flex gap-3 justify-start md:justify-end w-full flex-1">
						<FloatLabel variant="on">
							<DatePicker
								v-model="store.month"
								inputId="on_label"
								view="month"
								dateFormat="MM yy"
								showIcon
								iconDisplay="input" />
							<label for="on_label">Select month</label>
						</FloatLabel>
						<ImportModal />
						<DeleteSelected
							:selectedCollections="selectedCollection"
							v-if="selectedCollection.length" />
					</div>
				</div>
				<CollectionsTable
					:selectedCollections="selectedCollection"
					:collections="store.groupCollectionByAccount" />
			</div>
		</div>
	</div>
</template>
