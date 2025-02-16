<script setup lang="ts">
	import { ref, watch } from 'vue';
	import CreateModal from './modals/create-modal.vue';
	import DeleteModal from './modals/delete-modal.vue';
	import DeleteSelectedModal from './modals/delete-selected-modal.vue';
	import UpdateModal from './modals/update-modal.vue';
	import ViewModal from './modals/view-modal.vue';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';

	const store = useResidentStore();

	const selectedResidents = ref([]);

	const props = defineProps<{
		residents: Resident[];
	}>();

	const menu = ref<any[]>([]);

	function onToggled(event: Event, index: number) {
		menu.value[index].toggle(event);
	}


</script>

<template>
	<div class="flex flex-col gap-3">
		<div class="flex flex-wrap gap-5 justify-between">
			<div class="flex-1">
				<IconField >
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText
						v-model="store.searchQuery"
						placeholder="Search..." fluid/>
				</IconField>
			</div>
			<div class=" flex gap-3 justify-end">
				<CreateModal />
				<DeleteSelectedModal
					:selectedResidents="selectedResidents"
					v-if="selectedResidents && selectedResidents.length" />
			</div>
		</div>
		<div class="card border rounded-md">
			<DataTable
				:value="props.residents"
				v-model:selection="selectedResidents"
				size="small"
				dataKey="uid"
				:loading="store.isLoading">
				<template #empty>
					<div class="flex items-center justify-center p-4">
						No residents found.
					</div>
				</template>
				<Column
					selectionMode="multiple"
					style="width: 3rem"
					:exportable="false"></Column>
				<column header="id">
					<template #body="slotProps"
						><span>{{ slotProps.index + 1 }}</span></template
					>
				</column>
				<Column
					field="uid"
					header="Account No.">
					<template #body="slotProps">
						<div class="flex w-[20vh]">{{ slotProps.data.uid }}</div>
					</template>
				</Column>
				<Column header="Name">
					<template #body="slotProps">
						<div class="font-semibold capitalize w-[45vh]">
							<Avatar
								icon="pi pi-user"
								class="mr-2"
								size="normal" />
							{{ slotProps.data.fullname }}
						</div>
					</template>
				</Column>
				<Column
					class="capitalize"
					field="address"
					header="Address">
					<template #body="slotProps">
						<div class="flex w-[25vh]">{{ slotProps.data.address }}</div>
					</template>
				</Column>
				<Column
					field="classification"
					header="Classification"
					class="capitalize"></Column>
				<Column
					:exportable="false"
					header="Actions">
					<template #body="slotProps">
						<Button
							type="button"
							severity="secondary"
							icon="pi pi-ellipsis-v"
							@click="onToggled($event, slotProps.index)"
							text />
	
						<Popover :ref="(el) => (menu[slotProps.index] = el)">
							<label>Actions</label>
							<div class="flex flex-col items-start">
								<ViewModal v-bind="slotProps.data" />
								<UpdateModal v-bind="slotProps.data" />
								<DeleteModal :uid="slotProps.data.uid" />
							</div>
						</Popover>
					</template>
				</Column>
			</DataTable>
		</div>
		<Paginator
			:rows="10"
			@page="(e) => (store.page = e.page)"
			:totalRecords="store.totalResidents"
			template="FirstPageLink PrevPageLink  PageLinks  NextPageLink LastPageLink">
			
			<template #start="slotProps">
				Showing {{ slotProps.state.page * 10 + 1 }} to
				{{ Math.min((slotProps.state.page + 1) * 10, store.totalResidents) }} of
				{{ store.totalResidents }} results
			</template>
		</Paginator>
		
	</div>
</template>
