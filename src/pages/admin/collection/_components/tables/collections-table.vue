<script setup lang="ts">
	import { ref } from 'vue';
	import CollectionRecordPanel from '../panels/collection-record-panel.vue';
	import { useCollectionStore } from '@/stores/collection';

	const store = useCollectionStore();
	const props = defineProps({ selectedCollections: Array, collections: Array });
	const selectedCollections = ref(props.selectedCollections);
	const expandedRows = ref({});
</script>

<template>
	<div>
		<DataTable
			:value="collections"
			v-model:selection="selectedCollections"
			:expandedRows="expandedRows"
			dataKey="uid"
			size="small"
			:rows="10">
			<template #empty>
				<div class="flex items-center justify-center p-4">
					No collection payment found.
				</div>
			</template>
			<Column
				class="whitespace-nowrap text-ellipsis"
				expander
				style="width: 5rem" />
			<template #expansion="slotProps">
				<div class="p-4">
					<Accordion>
						<AccordionPanel
							v-for="(item, index) in slotProps.data.records"
							:key="item.uid"
							:value="index">
							<AccordionHeader>
								<div class="text-sm">
									<div>
										<i class="pi pi-receipt mr-2" />
										<span class="text-gray-500 dark:text-gray-400 mr-4"
											>Receipt No.</span
										>
										<span class="text-primary">{{ item.receiptno }}</span>
									</div>
									<div>
										<i class="pi pi-calendar mr-2" />
										<span class="text-gray-500 dark:text-gray-400 mr-4"
											>Payment Date</span
										>
										<span class="text-primary">{{ item.pymtdate }}</span>
									</div>
								</div>
							</AccordionHeader>
							<AccordionContent>
								<CollectionRecordPanel :item="item" />
							</AccordionContent>
						</AccordionPanel>
					</Accordion>
				</div>
			</template>

			<Column
				field="accountno"
				header="Account No."></Column>
			<Column
				field="records"
				header="Records">
				<template #body="slotProps">
					<div>{{ slotProps.data.records.length }}</div>
				</template>
			</Column>
		</DataTable>
		<Paginator
			:rows="10"
			@page="(e) => (store.page = e.page + 1)"
			:totalRecords="store.totalCollections" />
	</div>
</template>
