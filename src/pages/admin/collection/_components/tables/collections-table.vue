<script setup lang="ts">
	import { ref } from 'vue';
	import CollectionRecordPanel from '../panels/collection-record-panel.vue';
	import { useCollectionStore } from '@/stores/collection';

	const store = useCollectionStore();
	const props = defineProps({ selectedCollections: Array, collections: Array });
	const selectedCollections = ref(props.selectedCollections);
	const expandedRows = ref({});

	const getMaxPymtdate = (records: any[]) => {
		if (!records || records.length === 0) return null;
		return records.reduce((maxDate, item) => {
			const currentParts = item.pymtdate.split('/');
			const currentStr = `${currentParts[2]}-${currentParts[0].padStart(
				2,
				'0',
			)}-${currentParts[1].padStart(2, '0')}`;
			const currentDate = new Date(currentStr);

			const maxParts = maxDate.split('/');
			const maxStr = `${maxParts[2]}-${maxParts[0].padStart(
				2,
				'0',
			)}-${maxParts[1].padStart(2, '0')}`;
			const maxDateObj = new Date(maxStr);

			return currentDate > maxDateObj ? item.pymtdate : maxDate;
		}, records[0].pymtdate);
	};
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
				<div class="p-4 rounded-lg">
					<div class="p-2 font-medium">Payments</div>
					<Accordion>
						<AccordionPanel
							v-for="(item, index) in slotProps.data.records"
							:key="item.uid"
							:value="index">
							<AccordionHeader>
								<div class="text-sm font-medium">
									<div>
										<i class="pi pi-receipt mr-2 text-blue-400" />
										<span class="text-gray-500 dark:text-gray-400 mr-4"
											>Receipt No.</span
										>
										<span>{{ item.receiptno }}</span>
									</div>
									<div>
										<i class="pi pi-calendar mr-2 text-orange-400" />
										<span class="text-gray-500 dark:text-gray-400 mr-4"
											>Payment Date</span
										>
										<span>{{ item.pymtdate }}</span>
									</div>
								</div>
								<Chip
									v-if="
										item?.pymtdate === getMaxPymtdate(slotProps.data?.records)
									"
									label="Latest"
									class="ml-auto mr-4"
									severity="info" />
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
				field="fullname"
				header="Fullname"></Column>
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
<style scoped>
	.p-chip {
		background-color: var(--color-green-600);
		color: var(--color-white);
		font-size: 0.75rem;
	}
</style>
