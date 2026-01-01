<script setup lang="ts">
	import type { Resident } from '@/types/resident';
	import { ref, inject, onMounted, defineAsyncComponent } from 'vue';
	import { useDialog } from 'primevue';
	import BillingTable from '../billing-table.vue';

	const dialogRef = inject<any>('dialogRef');
	const resident = ref<Resident>({});
	const dialog = useDialog();
	const updateResident = defineAsyncComponent(
		() => import('./update-modal.vue'),
	);

	onMounted(() => {
		resident.value = dialogRef.value.data.user;
	});
</script>
<template>
	<div>
		<div class="flex flex-wrap">
			<div class="p-5 border rounded-lg flex-1 flex md:flex-col">
				<Avatar
					icon="pi pi-user"
					class="mr-2"
					size="xlarge" />
				<div class="flex justify-between items-start">
					<div class="flex flex-col">
						<span class="text-xl capitalize">{{ `${resident.fullname}` }}</span>
						<span class="text-slate-600">Acc-no. {{ resident.uid }}</span>
					</div>
				</div>
			</div>
			<div class="px-0 md:px-5 flex-1">
				<div class="flex justify-between items-start">
					<div class="flex flex-col">
						<span class="text-slate-500">Classification</span>
						<span class="capitalize">{{ resident.classtype }}</span>
					</div>
					<div class="flex flex-col">
						<span class="text-slate-500">Book</span>
						<span class="capitalize">{{ resident.book }}</span>
					</div>
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
									data: { user: resident },
								});
							}
						" />
				</div>
			</div>
		</div>
		<div class="py-5">
			<div
				class="p-2 border rounded-lg"
				v-if="resident.uid">
				<BillingTable :uid="resident.uid" />
			</div>
		</div>
	</div>
</template>
