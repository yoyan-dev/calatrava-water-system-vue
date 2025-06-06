<script setup lang="ts">
	import { ref, onMounted, computed } from 'vue';
	import type { Resident } from '@/types/resident';
	import useFirebaseTimestamp from '@/composables/useFirebaseTimestamp';
	import { formatToPeso } from '@/composables/currencyFormat';
	import type { Timestamp } from 'firebase/firestore';
	import PayBillModal from './modals/pay-bill-modal.vue';
	import { getSeverity } from '@/composables/getSeverity';
	import { useReminderStore } from '@/stores/reminder';
	import Reminder from './reminder.vue';
	import { isTargetDate } from '@/composables/targetDate';

	const store = useReminderStore();
	const hide = ref(false);
	const { formatTimestamp } = useFirebaseTimestamp();
	const props = defineProps<{
		resident: Resident;
	}>();

	onMounted(async () => {
		await store.fetchReminder(props.resident.uid);
		console.log(store.reminder);
	});

	const filtereReminder = computed(() => {
		return store.reminder?.filter((item: any) => {
			return isTargetDate(item.dueDate) && item.dueDate;
		});
	});
</script>
<template>
	<div>
		<div v-if="!store.isLoading && filtereReminder.length > 0">
			<Reminder :reminder="filtereReminder" />
		</div>
		<div class="bg-white p-5 border rounded-lg flex flex-col gap-3">
			<div class="flex justify-between">
				<h1 class="font-semibold text-xl">
					Bill #{{ props.resident.billings?.[0].billNo }}
					<Tag
						:severity="
							getSeverity(
								props.resident.billings?.[0].paymentStatus ?? 'unpaid',
							)
						"
						:value="
							props.resident.billings?.[0].paymentStatus ?? 'unpaid'
						"></Tag>
				</h1>
			</div>
			<hr />
			<div class="flex justify-between">
				<div>
					<label class="text-surface-500">Name</label><br />
					<span class="capitalize">{{ props.resident.fullname }}</span>
				</div>
				<div>
					<label class="text-surface-500">Class Type</label><br />
					<span class="capitalize">{{ resident.classtype }}</span>
				</div>
			</div>
			<div>
				<label class="text-surface-500">Bill Period</label><br />
				<span
					>{{ formatTimestamp(props.resident.billings?.[0].billDate) }} -
					{{ formatTimestamp(props.resident.billings?.[0].dueDate) }}</span
				>
			</div>
			<div class="flex justify-between">
				<div>
					<label class="text-surface-500">Due Date</label><br />
					<span>{{
						formatTimestamp(props.resident.billings?.[0].dueDate)
					}}</span>
				</div>
				<div>
					<label class="text-surface-500">Amount</label><br />
					<span>
						{{ formatToPeso(props.resident.billings?.[0].totalBill || 0) }}
					</span>
				</div>
			</div>
		</div>
		<div class="flex justify-end p-5">
			<PayBillModal
				v-if="hide || !props.resident.billings?.[0].paymentStatus"
				@close="hide = true"
				:uid="props.resident.uid"
				:billingUid="props.resident.billings?.[0].uid" />
		</div>
	</div>
</template>
