<template>
	<div
		class="p-4 m-2 bg-white dark:bg-surface-800 rounded-lg shadow-md border border-gray-200 dark:border-surface-600">
		<!-- Header -->
		<div class="flex justify-between items-center mb-4">
			<div>
				<h5 class="font-bold text-xl">OR{{ collection.receiptNo }}</h5>
				<div class="text-xs text-surface-600 dark:text-surface-400">
					<div>Paid: {{ formatTimestamp(collection.trackDt) }}</div>
					<div v-if="collection.updatedAt">
						Updated: {{ formatTimestamp(collection.updatedAt) }}
					</div>
				</div>
			</div>
			<div class="flex gap-2">
				<!-- Receipt Type -->
				<div
					v-tooltip.bottom="`Receipt Type`"
					:class="getReceiptTypeColor(collection.receiptType)">
					<i
						:class="getReceiptTypeIcon(collection.receiptType)"
						class="text-[0.85em]" />
					<span>{{ getReceiptType(collection.receiptType) }}</span>
				</div>

				<!-- Status -->
				<div
					v-tooltip.bottom="`Receipt Status`"
					:class="getStatusColor(collection.receiptStatus)">
					<i
						:class="getStatusIcon(collection.receiptStatus)"
						class="text-[0.85em]" />
					<span>{{ getStatusLabel(collection.receiptStatus) }}</span>
				</div>
			</div>
		</div>

		<!-- Customer Name -->
		<div class="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
			<p class="text-sm text-gray-600 dark:text-surface-300">Paid by:</p>
			<p class="font-semibold text-lg">{{ collection.fullName }}</p>
		</div>

		<!-- Grid Layout -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<!-- Receipt Info -->
			<div
				class="flex flex-col p-4 border border-gray-200 dark:border-surface-600 rounded-md bg-gray-50 dark:bg-surface-700">
				<h6
					class="font-semibold mb-3 text-base text-surface-900 dark:text-surface-0">
					Receipt Details
				</h6>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Receipt No:</span
						>
						<span class="font-mono">OR{{ collection.receiptNo }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Sys No:</span
						>
						<span class="font-mono">#{{ collection.sysNo }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Account No:</span
						>
						<span class="font-mono">{{ collection.accountNo }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Teller:</span
						>
						<span>{{ collection.teller }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Batch:</span
						>
						<span>{{ collection.batchNo || '—' }}</span>
					</div>
				</div>
			</div>

			<!-- Payment Method -->
			<div
				class="flex flex-col p-4 border border-gray-200 dark:border-surface-600 bg-gray-50 dark:bg-surface-700 rounded-md">
				<h6
					class="font-semibold mb-3 text-base text-surface-900 dark:text-surface-0">
					Payment Method
				</h6>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Method:</span
						>
						<span class="font-medium">{{
							getPaymentMethod(collection.pymtMethod)
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Cash Tendered:</span
						>
						<span class="text-indigo-700 dark:text-indigo-300 font-medium">
							{{ formatToPeso(collection.cash) }}
						</span>
					</div>
					<div
						class="flex justify-between"
						v-if="collection.check > 0">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Check Amt:</span
						>
						<span>{{ formatToPeso(collection.check) }}</span>
					</div>
					<div
						class="text-xs space-y-1 mt-2"
						v-if="collection.check > 0">
						<div class="flex justify-between">
							<span class="font-medium">Check No:</span>
							<span>{{ collection.checkNo || '—' }}</span>
						</div>
						<div class="flex justify-between">
							<span class="font-medium">Bank:</span>
							<span>{{ collection.bankId || '—' }}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Amount Breakdown -->
			<div
				class="flex flex-col p-4 border border-gray-200 dark:border-surface-600 rounded-md bg-gray-50 dark:bg-surface-700">
				<h6
					class="font-semibold mb-3 text-base text-surface-900 dark:text-surface-0">
					Amount Breakdown
				</h6>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Water Bill:</span
						>
						<span class="text-green-700 dark:text-green-400">{{
							formatToPeso(collection.waterBill)
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Env. Fee:</span
						>
						<span>{{ formatToPeso(collection.envFee) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Penalty:</span
						>
						<span class="text-orange-600 dark:text-orange-400">{{
							formatToPeso(collection.penAmnt)
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Discount:</span
						>
						<span class="text-red-600 dark:text-red-400"
							>-{{ formatToPeso(collection.discAmnt) }}</span
						>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Reconnection:</span
						>
						<span>{{ formatToPeso(collection.othrReconn) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Other Income:</span
						>
						<span>{{ formatToPeso(collection.othrIncome) }}</span>
					</div>
				</div>
			</div>

			<!-- Arrears & Balance -->
			<div
				class="flex flex-col p-4 border border-gray-200 dark:border-surface-600 rounded-md bg-gray-50 dark:bg-surface-700">
				<h6
					class="font-semibold mb-3 text-base text-surface-900 dark:text-surface-0">
					Arrears & Balance
				</h6>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Arrears Paid:</span
						>
						<span
							:class="
								collection.payArrears ? 'text-green-600' : 'text-gray-400'
							">
							{{ collection.payArrears ? 'Yes' : 'No' }}
						</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Arrears Amt:</span
						>
						<span>{{ formatToPeso(collection.arrearsAmt) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Arrears Env:</span
						>
						<span>{{ formatToPeso(collection.arrearsEnv) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Running Balance:</span
						>
						<span class="font-bold text-primary">{{
							formatToPeso(collection.runBalance)
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium text-gray-600 dark:text-surface-400"
							>Online Ref:</span
						>
						<span class="font-mono text-xs">{{
							collection.onlineref || '—'
						}}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Total Paid + Change -->
		<div
			class="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-700/20 rounded-md">
			<div class="flex justify-between items-center">
				<div>
					<p class="text-sm opacity-90">Total Amount Paid</p>
					<p class="text-2xl font-bold text-green-700 dark:text-green-400">
						{{ formatToPeso(collection.pacyAmnt) }}
					</p>
				</div>
				<div class="text-right">
					<p class="text-xs opacity-90">Change</p>
					<p
						class="text-lg font-semibold"
						:class="
							change >= 0
								? 'text-green-600 dark:text-green-400'
								: 'text-red-600 dark:text-red-400'
						">
						{{ formatToPeso(change) }}
					</p>
				</div>
			</div>
		</div>

		<!-- Footer Note -->
		<div
			class="mt-3 text-center text-xs text-surface-500 dark:text-surface-400">
			Receipt ID: <span class="font-mono">{{ collection.id }}</span>
			<span v-if="collection.receiptStatus === '02'"> • VOIDED</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { format, parse, isValid } from 'date-fns';

	const props = defineProps<{
		collection: {
			id: string;
			receiptNo: string;
			sysNo: string;
			accountNo: string;
			custNo: string;
			fullName: string;
			teller: string;
			trackDt: string | null;
			updatedAt?: string | null;
			receiptType: string;
			receiptStatus: string;
			pymtMethod: number;
			cash: number;
			check: number;
			checkNo?: string;
			bankId?: string;
			waterBill: number;
			envFee: number;
			penAmnt: number;
			discAmnt: number;
			othrReconn: number;
			othrIncome: number;
			arrearsAmt: number;
			arrearsEnv: number;
			payArrears: boolean;
			runBalance: number;
			onlineref?: string;
			pacyAmnt: number;
			batchNo?: string;
		};
	}>();

	// SAFE DATE PARSER - handles null, empty, malformed dates
	const parseDateString = (dateStr: string | null | undefined): Date | null => {
		if (!dateStr || dateStr.trim() === '' || dateStr.includes('/  /'))
			return null;

		// Handle format: "09/11/2025 14:30:22" or "09/11/2025"
		const cleaned = dateStr.trim();
		const parts = cleaned.split(' ');
		const datePart = parts[0];
		const timePart = parts[1] || '00:00:00';

		const [day, month, year] = datePart.split('/');
		if (!day || !month || !year) return null;

		// Create date in YYYY-MM-DD format for reliability
		const dateObj = parse(
			`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${timePart}`,
			'yyyy-MM-dd HH:mm:ss',
			new Date(),
		);

		return isValid(dateObj) ? dateObj : null;
	};

	// SAFE FORMATTER
	const formatTimestamp = (timestamp: string | null | undefined) => {
		const date = parseDateString(timestamp);
		if (!date) return '—';
		return format(date, 'MMM dd, yyyy | hh:mm a');
	};

	// Computed
	const change = computed(
		() => props.collection.cash - props.collection.pacyAmnt,
	);

	// Mappers (unchanged but safe)
	const getPaymentMethod = (method: number) => {
		const map: Record<number, string> = {
			1: 'Cash',
			2: 'Check',
			3: 'Online Transfer',
			4: 'GCash',
			5: 'Card',
		};
		return map[method] || `Method ${method}`;
	};

	const getReceiptType = (type: string) => {
		const map: Record<string, string> = {
			'4': 'Payment',
			'5': 'Adjustment',
			'6': 'Reconnection',
		};
		return map[type] || 'Other';
	};

	const getReceiptTypeIcon = (type: string) => {
		const map: Record<string, string> = {
			'04': 'pi pi-money-bill',
			'05': 'pi pi-refresh',
			'06': 'pi pi-bolt',
		};
		return map[type] || 'pi pi-receipt';
	};

	const getReceiptTypeColor = (type: string) => {
		const map: Record<string, string> = {
			'04': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
			'05': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
			'06': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
		};
		return `${
			map[type] ||
			'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
		} inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-base font-normal`;
	};

	const getStatusLabel = (status: string) => {
		const map: Record<string, string> = {
			'1': 'Posted',
			'2': 'Voided',
			'3': 'Cancelled',
		};
		return map[status] || 'Unknown';
	};

	const getStatusIcon = (status: string) => {
		const map: Record<string, string> = {
			'01': 'pi pi-check-circle',
			'02': 'pi pi-ban',
			'03': 'pi pi-exclamation-triangle',
		};
		return map[status] || 'pi pi-info-circle';
	};

	const getStatusColor = (status: string) => {
		const map: Record<string, string> = {
			'01': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
			'02': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
			'03': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
		};
		return `${
			map[status] ||
			'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
		} inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-base font-normal`;
	};

	// Safe peso formatter
	const formatToPeso = (value: number | null | undefined) => {
		const num = Number(value) || 0;
		return `₱${num.toFixed(2)}`;
	};
</script>
