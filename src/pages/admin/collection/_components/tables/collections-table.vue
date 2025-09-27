<script setup lang="ts">
	import { ref } from 'vue';
	import CollectionRecordPanel from '../panels/collection-record-panel.vue';

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
			<!-- <Column
				class="whitespace-nowrap text-ellipsis"
				selectionMode="multiple"
				style="width: 3rem"
				:exportable="false"></Column> -->
			<Column
				class="whitespace-nowrap text-ellipsis"
				expander
				style="width: 5rem" />
			<template #expansion="slotProps">
				<div class="p-4">
					<Accordion :value="0">
						<AccordionPanel
							v-for="(item, index) in slotProps.data.records"
							:key="item.uid"
							:value="index">
							<AccordionHeader>
								<div>
									<span
										class="font-semibold text-gray-500 dark:text-gray-400 mr-4"
										>Receipt#</span
									>
									<span class="text-primary">{{ item.receiptno }}</span>
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
	</div>
</template>
