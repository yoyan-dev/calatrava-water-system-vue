<script setup lang="ts">
	import { ref, watch, nextTick, defineAsyncComponent } from 'vue';
	import { useDialog } from 'primevue';
	import CreateModal from './modals/create-modal.vue';
	import DeleteSelectedModal from './modals/delete-selected-modal.vue';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';
	import createAnnouncementModal from './modals/create-announcement-modal.vue';

	const store = useResidentStore();
	const dialog = useDialog();
	const selectedResidents = ref([]);
	const props = defineProps<{
		residents: Resident[];
	}>();
	const op = ref();
	const selectedResident = ref<Resident | null>();

	const sendReminder = defineAsyncComponent(
		() => import('./modals/send-reminder-modal.vue'),
	);

	const viewResident = defineAsyncComponent(
		() => import('./modals/view-modal.vue'),
	);

	const updateResident = defineAsyncComponent(
		() => import('./modals/update-modal.vue'),
	);

	const deleteResident = defineAsyncComponent(
		() => import('./modals/delete-modal.vue'),
	);

	function onToggled(event: Event, resident: Resident) {
		op.value.hide();

		if (selectedResident.value?.uid === resident.uid) {
			selectedResident.value = null;
		} else {
			selectedResident.value = resident;

			nextTick(() => {
				op.value.show(event);
			});
		}
	}

	function hidePopover() {
		op.value.hide();
	}
</script>

<template>
	<div class="flex flex-col gap-3">
		<div class="flex flex-wrap gap-5 justify-between">
			<div class="flex-1">
				<IconField>
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText
						v-model="store.searchQuery"
						placeholder="Search..."
						class="hidden md:block" />
					<InputText
						v-model="store.searchQuery"
						placeholder="Search..."
						class="visible md:hidden"
						fluid />
				</IconField>
			</div>
			<div class="flex gap-1 md:gap-3 justify-start md:justify-end">
				<CreateModal />
				<createAnnouncementModal />
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
					class="whitespace-nowrap text-ellipsis"
					selectionMode="multiple"
					:exportable="false"></Column>
				<Column
					class="whitespace-nowrap text-ellipsis"
					header="id"
					field="id">
					<template #body="slotProps"
						><span>{{ slotProps.data.id }}</span></template
					>
				</Column>
				<Column
					class="whitespace-nowrap text-ellipsis"
					field="uid"
					header="Account No.">
					<template #body="slotProps">
						<div class="flex w-[20vh]">{{ slotProps.data.uid }}</div>
					</template>
				</Column>
				<Column
					class="whitespace-nowrap text-ellipsis"
					header="Name">
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
					class="whitespace-nowrap text-ellipsis capitalize"
					field="book"
					header="Book">
					<template #body="slotProps">
						<div class="flex w-[25vh]">{{ slotProps.data.book }}</div>
					</template>
				</Column>
				<Column
					class="whitespace-nowrap text-ellipsis capitalize"
					field="classtype"
					header="Classification"></Column>
				<Column
					class="whitespace-nowrap text-ellipsis"
					:exportable="false"
					header="Actions">
					<template #body="slotProps">
						<Button
							type="button"
							severity="secondary"
							icon="pi pi-ellipsis-v"
							@click="onToggled($event, slotProps.data)"
							text />
					</template>
				</Column>
			</DataTable>
		</div>
		<Paginator
			:template="{
				'640px': 'PrevPageLink CurrentPageReport NextPageLink',
				'960px':
					'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
				'1300px':
					'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
				default:
					'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  ',
			}"
			:rows="10"
			@page="(e) => (store.page = e.page + 1)"
			:totalRecords="store.totalResidents">
		</Paginator>

		<Popover ref="op">
			<div class="flex flex-col items-start">
				<Button
					severity="primary"
					icon="pi pi-send"
					label="reminder"
					size="small"
					text
					@click="
						() => {
							dialog.open(sendReminder, {
								props: {
									header: 'Send Reminder',
									style: {
										width: '50rem',
									},
									breakpoints: { '1199px': '75vw', '575px': '90vw' },
									modal: true,
								},
								data: {
									user: selectedResident,
								},
							});
							hidePopover();
						}
					" />
				<Button
					icon="pi pi-eye"
					severity="secondary"
					size="small"
					label="view"
					text
					@click="
						() => {
							dialog.open(viewResident, {
								props: {
									header: 'Resident Profile',
									style: {
										width: '50rem',
									},
									breakpoints: { '1199px': '75vw', '575px': '90vw' },
									modal: true,
								},
								data: {
									user: selectedResident,
								},
							});
							hidePopover();
						}
					" />
				<Button
					icon="pi pi-pen-to-square"
					text
					size="small"
					label="edit"
					class="mr-2"
					@click="
						() => {
							dialog.open(updateResident, {
								props: {
									header: 'Update resident',
									style: { width: '50rem' },
									breakpoints: { '1199px': '75vw', '575px': '90vw' },
									modal: true,
								},
								data: { user: selectedResident },
							});
							hidePopover();
						}
					" />
				<UpdateModal v-bind="selectedResident" />
				<Button
					icon="pi pi-trash"
					text
					size="small"
					label="delete"
					severity="danger"
					@click="
						() => {
							dialog.open(deleteResident, {
								props: {
									header: 'Confirm',
									style: {
										width: '50vw',
									},
									breakpoints: {
										'960px': '75vw',
										'640px': '90vw',
									},
									modal: true,
								},
								data: {
									uid: selectedResident?.uid,
								},
							});
							hidePopover();
						}
					" />
			</div>
		</Popover>
	</div>
</template>
