<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import Header from '@/pages/admin/collection/_components/header.vue';
	import { useCollectionStore } from '@/stores/collection';
	import ImportModal from './_components/modals/import-modal.vue';
	import DeleteSelected from './_components/modals/delete-selected-modal.vue';
	import OldCollectionsTable from './_components/tables/old-collections-table.vue';
	import CollectionsTable from './_components/tables/collections-table.vue';

	const store = useCollectionStore();
	const selectedCollection = ref([]);
	const menu = ref<any[]>([]);
	const expandedRows = ref({});

	function onToggled(event: Event, index: number) {
		menu.value[index].toggle(event);
	}

	onMounted(() => {
		store.fetchCollections();
	});
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
								placeholder="Search..." />
						</IconField>
					</div>
					<div class="flex gap-3 justify-start md:justify-end w-full flex-1">
						<FloatLabel variant="on">
							<DatePicker
								v-model:modelValue="store.month"
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

				<!-- <OldCollectionsTable :selectedCollections="selectedCollection" /> -->
				<CollectionsTable
					:selectedCollections="selectedCollection"
					:collections="store.groupCollectionByAccount" />
			</div>
		</div>
	</div>
</template>
