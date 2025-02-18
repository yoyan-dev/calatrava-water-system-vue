<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import type { Billing } from '@/types/billing';
	import type { Resident } from '@/types/resident';
	import useFirebaseTimestamp from '@/composables/useFirebaseTimestamp';
	import { formatToPeso } from '@/composables/currencyFormat';
	import type { Timestamp } from 'firebase/firestore';

	const { formatTimestamp } = useFirebaseTimestamp();
	const props = defineProps<{
		resident: Resident;
	}>();

	console.log(props.resident.billings);
</script>
<template>
	<div>
		<div class="bg-white p-5 border rounded-lg flex flex-col gap-3">
			<div class="flex justify-between">
				<h1 class="font-semibold text-xl">
					Bill #{{ props.resident.billings?.[0].bill_no }}
					<Tag
						severity="danger"
						value="Unpaid"></Tag>
				</h1>
			</div>
			<hr />
			<div class="flex justify-between">
				<div>
					<label class="text-surface-500">Name</label><br />
					<span class="uppercase">{{ props.resident.fullname }}</span>
				</div>
				<div>
					<label class="text-surface-500">Class Type</label><br />
					<span class="uppercase">{{ resident.classification }}</span>
				</div>
			</div>
			<div>
				<label class="text-surface-500">Bill Period</label><br />
				<span>January 01, 2025 - January 31, 2025"</span>
			</div>
			<div class="flex justify-between">
				<div>
					<label class="text-surface-500">Due Date</label><br />
					<span>{{
						formatTimestamp(props.resident.billings?.[0].due_date)
					}}</span>
				</div>
				<div>
					<label class="text-surface-500">Amount</label><br />
					<!-- // <span>{{
					// 	formatToPeso(props.resident.billings?.[0].)
					// }}</span> -->
				</div>
			</div>
		</div>
	</div>
</template>
