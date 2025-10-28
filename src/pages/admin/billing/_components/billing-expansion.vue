<template>
	<div
		class="p-4 m-2 bg-white dark:bg-surface-800 rounded-lg shadow-md border border-gray-200 dark:border-surface-600">
		<!-- Header -->
		<div class="flex justify-between items-center mb-4">
			<h5 class="font-bold text-xl">Bill No. {{ billing.billNo }}</h5>
			<div class="flex gap-2">
				<Tag
					:value="billing.paid === 'T' ? 'PAID' : 'UNPAID'"
					:severity="billing.paid === 'T' ? 'success' : 'danger'" />
				<Tag
					:icon="billing.verified === 'T' ? 'pi pi-check' : undefined"
					:severity="billing.verified === 'T' ? 'success' : 'warning'">
					<div class="flex items-center px-1">
						{{ billing.verified === 'T' ? 'Verified' : 'Unverified' }}
					</div>
				</Tag>
			</div>
		</div>

		<!-- Consumer Name -->
		<div class="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
			<p class="text-sm text-gray-600 dark:text-surface-300">Consumer:</p>
			<p class="font-semibold text-lg">{{ billing.fullName }}</p>
		</div>

		<!-- Grid Layout -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<!-- Billing Details -->
			<div
				class="flex flex-col p-4 border border-gray-200 dark:border-surface-600 rounded-md bg-gray-50 dark:bg-surface-700">
				<h6
					class="font-semibold mb-3 text-base text-surface-900 dark:text-surface-0">
					Billing Details
				</h6>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Bill No.:</span
						>
						<span>{{ billing.billNo }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Account No.:</span
						>
						<span>{{ billing.accountNo }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Book:</span
						>
						<span>{{ billing.book }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Billing Date:</span
						>
						<span>{{ formatDate(billing.billDate) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Due Date:</span
						>
						<span :class="{ 'text-red-600 dark:text-red-400': isOverdue }">{{
							formatDate(billing.dueDate)
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Disconnection:</span
						>
						<span class="text-red-600 dark:text-red-400 font-medium">{{
							formatDate(billing.disconDate)
						}}</span>
					</div>
				</div>
			</div>

			<!-- Charges -->
			<div
				class="flex flex-col p-4 border border-gray-200 dark:border-surface-600 bg-gray-50 dark:bg-surface-700 rounded-md">
				<h6
					class="font-semibold mb-3 text-base text-surface-900 dark:text-surface-0">
					Charges
				</h6>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Water Bill:</span
						>
						<span>{{ formatToPeso(billing.billAmnt) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Env. Fee:</span
						>
						<span>{{ formatToPeso(billing.environmentFee) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Arrears:</span
						>
						<span class="text-orange-600 dark:text-orange-400">{{
							formatToPeso(billing.arrearsAmnt)
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Arrears Env:</span
						>
						<span>{{ formatToPeso(billing.arrearsEnv) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Due Penalty:</span
						>
						<span class="text-red-600 dark:text-red-400">{{
							formatToPeso(billing.duePenalty)
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Meter Penalty:</span
						>
						<span>{{ formatToPeso(billing.mPenalty) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Discount:</span
						>
						<span class="text-green-600 dark:text-green-400"
							>-{{ formatToPeso(billing.discount) }}</span
						>
					</div>
				</div>
			</div>

			<!-- Meter Details -->
			<div
				class="flex flex-col p-4 border border-gray-200 dark:border-surface-600 rounded-md bg-gray-50 dark:bg-surface-700">
				<h6
					class="font-semibold mb-3 text-base text-surface-900 dark:text-surface-0">
					Meter Details
				</h6>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Meter No.:</span
						>
						<span>{{ billing.mtrNo }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Current:</span
						>
						<span>{{ billing.curReading }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Previous:</span
						>
						<span>{{ billing.preReading }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Usage:</span
						>
						<span class="font-bold text-primary"
							>{{ billing.waterUsage }} m³</span
						>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Prev. Usage:</span
						>
						<span>{{ billing.prevUsed }} m³</span>
					</div>
				</div>
			</div>

			<!-- Additional Info -->
			<div
				class="flex flex-col p-4 border border-gray-200 dark:border-surface-600 rounded-md bg-gray-50 dark:bg-surface-700">
				<h6
					class="font-semibold mb-3 text-base text-surface-900 dark:text-surface-0">
					Additional Info
				</h6>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Class:</span
						>
						<span class="capitalize">{{
							billing.classType.toLowerCase()
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Barangay:</span
						>
						<span>{{ billing.billBrgy || '—' }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Purok:</span
						>
						<span>{{ billing.billPurok || '—' }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>MR Sys No.:</span
						>
						<span>{{ billing.mrSysNo }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Status:</span
						>
						<span>{{ billing.bStatus === '2' ? 'Active' : 'Unknown' }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Total Due -->
		<div
			class="mt-6 p-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-700/20 rounded-md">
			<div class="flex justify-between items-center">
				<div>
					<p class="text-sm opacity-90">Total Amount Due</p>
					<p class="text-2xl font-bold">{{ formatToPeso(totalDue) }}</p>
				</div>
				<div
					v-if="isOverdue"
					class="text-right">
					<p class="text-xs opacity-90">Overdue</p>
					<p class="text-lg font-semibold">
						{{ formatToPeso(billing.duePenalty) }} penalty
					</p>
				</div>
			</div>
		</div>

		<!-- Payment Info -->
		<div
			v-if="billing.paid === 'T'"
			class="mt-3 text-center text-sm text-green-600 dark:text-green-400">
			Paid on {{ formatDate(billing.paymentDate) }} • Receipt:
			{{ billing.paymentReceipt }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import Tag from 'primevue/tag';
	import Badge from 'primevue/badge';

	const props = defineProps<{
		billing: {
			accountNo: string;
			amortAmnt: number;
			arrearsAmnt: number;
			arrearsEnv: number;
			bStatus: string;
			billAmnt: number;
			billBrgy: string;
			billDate: string;
			billNo: string;
			billPurok: string;
			book: string;
			classType: string;
			createdAt: string;
			curReading: number;
			disconDate: string;
			discount: number;
			dueDate: string;
			duePenalty: number;
			environmentFee: number;
			fullName: string;
			mPenalty: number;
			mrSysNo: number;
			mtrNo: string;
			nrWater: number;
			paid: string;
			paymentDate: string | null;
			paymentReceipt: string | null;
			paymentStatus: string | null;
			preReading: number;
			prevUsed: number;
			prevUsed2: number;
			prvBillDate: string;
			prvDiscon: string;
			prvDueDate: string;
			purokCode: string;
			stubOut: string;
			totalBill: number;
			updatedAt: string;
			verified: string;
			waterUsage: number;
		};
	}>();

	// Formatters
	const formatToPeso = (value: number) => `₱${value.toFixed(2)}`;

	const formatDate = (date: string) => {
		if (!date || date.includes('/  /')) return '—';
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	// Computed: Total Due
	const totalDue = computed(() => {
		const {
			billAmnt,
			environmentFee,
			arrearsAmnt,
			arrearsEnv,
			duePenalty,
			mPenalty,
			discount,
		} = props.billing;
		return (
			billAmnt +
			environmentFee +
			arrearsAmnt +
			arrearsEnv +
			duePenalty +
			mPenalty -
			discount
		);
	});

	// Computed: Is Overdue
	const isOverdue = computed(() => {
		const due = new Date(props.billing.dueDate);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return due < today && props.billing.paid !== 'T';
	});
</script>
