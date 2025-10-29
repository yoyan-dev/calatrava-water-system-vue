<template>
	<div
		class="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
			<!-- Receipt & System Info -->
			<div class="space-y-3">
				<h4
					class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
					<i class="pi pi-receipt text-blue-600 dark:text-blue-400"></i>
					Receipt Details
				</h4>
				<div class="space-y-1 text-gray-700 dark:text-gray-300">
					<div class="flex justify-between">
						<span class="font-medium">Receipt No:</span>
						<span class="font-mono text-blue-700 dark:text-blue-400"
							>OR{{ collection.receiptNo }}</span
						>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Type:</span>
						<Tag
							:value="getReceiptType(collection.receiptType)"
							severity="info"
							class="text-xs" />
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Status:</span>
						<Tag
							:value="getStatusLabel(collection.receiptStatus)"
							:severity="getStatusSeverity(collection.receiptStatus)"
							class="text-xs" />
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Sys No:</span>
						<span class="font-mono">#{{ collection.sysNo }}</span>
					</div>
				</div>
			</div>

			<!-- Customer Info -->
			<div class="space-y-3">
				<h4
					class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
					<i class="pi pi-user text-green-600 dark:text-green-400"></i>
					Customer
				</h4>
				<div class="space-y-1 text-gray-700 dark:text-gray-300">
					<div class="flex justify-between">
						<span class="font-medium">Account No:</span>
						<span class="font-mono">{{ collection.accountNo }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Customer No:</span>
						<span class="font-mono">{{ collection.custNo }}</span>
					</div>
					<div>
						<span class="font-medium block mb-1">Name:</span>
						<p class="text-xs text-gray-600 dark:text-gray-400 leading-tight">
							{{ collection.fullName }}
						</p>
					</div>
				</div>
			</div>

			<!-- Payment Details -->
			<div class="space-y-3">
				<h4
					class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
					<i class="pi pi-money-bill text-indigo-600 dark:text-indigo-400"></i>
					Payment
				</h4>
				<div class="space-y-1 text-gray-700 dark:text-gray-300">
					<div class="flex justify-between">
						<span class="font-medium">Method:</span>
						<span>{{ getPaymentMethod(collection.pymtMethod) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Cash Tendered:</span>
						<span class="font-semibold text-indigo-700 dark:text-indigo-300">
							₱{{ formatCurrency(collection.cash) }}
						</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Check Amount:</span>
						<span>₱{{ formatCurrency(collection.check) }}</span>
					</div>
					<div
						v-if="collection.check > 0"
						class="text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
						<div>
							<span class="font-medium">Check No:</span>
							{{ collection.checkNo || '—' }}
						</div>
						<div>
							<span class="font-medium">Bank:</span>
							{{ collection.bankId || '—' }}
						</div>
						<div>
							<span class="font-medium">Date:</span>
							{{ formatCheckDate(collection.checkDate) }}
						</div>
					</div>
				</div>
			</div>

			<!-- Bill Breakdown -->
			<div class="space-y-3">
				<h4
					class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
					<i
						class="pi pi-file-invoice-dollar text-amber-600 dark:text-amber-400"></i>
					Bill Breakdown
				</h4>
				<div class="space-y-1 text-gray-700 dark:text-gray-300">
					<div class="flex justify-between">
						<span class="font-medium">Water Bill:</span>
						<span class="text-green-700 dark:text-green-400 font-medium">
							₱{{ formatCurrency(collection.waterBill) }}
						</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Env. Fee:</span>
						<span>₱{{ formatCurrency(collection.envFee) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">MRRF (Prev):</span>
						<span>₱{{ formatCurrency(collection.mrrfAmnt) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">MRRF (Curr):</span>
						<span>₱{{ formatCurrency(collection.cmrrfAmnt) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Discount:</span>
						<span class="text-red-600 dark:text-red-400"
							>-₱{{ formatCurrency(collection.discAmnt) }}</span
						>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Penalty:</span>
						<span class="text-orange-600 dark:text-orange-400"
							>₱{{ formatCurrency(collection.penAmnt) }}</span
						>
					</div>
					<div class="border-t border-gray-300 dark:border-gray-600 pt-1 mt-2">
						<div class="flex justify-between font-semibold">
							<span>Total Applied:</span>
							<span class="text-lg text-blue-700 dark:text-blue-400">
								₱{{ formatCurrency(collection.pacyAmnt) }}
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Arrears & Others -->
			<div class="space-y-3">
				<h4
					class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
					<i
						class="pi pi-exclamation-triangle text-red-600 dark:text-red-400"></i>
					Arrears & Others
				</h4>
				<div class="space-y-1 text-gray-700 dark:text-gray-300">
					<div class="flex justify-between">
						<span class="font-medium">Pay Arrears:</span>
						<i
							:class="
								collection.payArrears
									? 'pi pi-check text-green-600'
									: 'pi pi-times text-gray-400'
							"></i>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Arrears Amount:</span>
						<span>₱{{ formatCurrency(collection.arrearsAmt) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Arrears Env:</span>
						<span>₱{{ formatCurrency(collection.arrearsEnv) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Other Income:</span>
						<span>₱{{ formatCurrency(collection.othrIncome) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Other Apply:</span>
						<span>₱{{ formatCurrency(collection.othrApply) }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Reconnection:</span>
						<span>₱{{ formatCurrency(collection.othrReconn) }}</span>
					</div>
				</div>
			</div>

			<!-- Audit Trail -->
			<div class="space-y-3">
				<h4
					class="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
					<i class="pi pi-clock text-purple-600 dark:text-purple-400"></i>
					Audit Trail
				</h4>
				<div class="space-y-1 text-gray-700 dark:text-gray-300 text-xs">
					<div class="flex justify-between">
						<span class="font-medium">Teller:</span>
						<span>{{ collection.teller }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Transaction Time:</span>
						<span class="font-mono">{{
							formatDateTime(collection.trackDt)
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Bank/Branch:</span>
						<span
							>{{ collection.bankId }} / {{ collection.branch || '—' }}</span
						>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Batch No:</span>
						<span class="font-mono">{{ collection.batchNo || '—' }}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Online Ref:</span>
						<span class="font-mono text-xs">{{
							collection.onlineref || '—'
						}}</span>
					</div>
					<div class="flex justify-between">
						<span class="font-medium">Running Balance:</span>
						<span class="font-medium"
							>₱{{ formatCurrency(collection.runBalance) }}</span
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer Summary -->
		<div
			class="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600 flex justify-between items-center text-sm font-medium">
			<div class="text-gray-600 dark:text-gray-400">
				<i class="pi pi-info-circle mr-1"></i>
				<span v-if="collection.cash > collection.pacyAmnt">
					Change:
					<span class="text-green-600 dark:text-green-400"
						>₱{{ formatCurrency(collection.cash - collection.pacyAmnt) }}</span
					>
				</span>
				<span
					v-else-if="collection.cash < collection.pacyAmnt"
					class="text-red-600 dark:text-red-400">
					Underpayment: ₱{{
						formatCurrency(collection.pacyAmnt - collection.cash)
					}}
				</span>
				<span
					v-else
					class="text-blue-600 dark:text-blue-400"
					>Exact payment</span
				>
			</div>
			<div class="text-xs text-gray-500 dark:text-gray-500">
				ID: <span class="font-mono">{{ collection.id }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	import Tag from 'primevue/tag';

	defineProps<{
		collection: any;
	}>();

	// Formatters
	const formatCurrency = (value: number) => {
		return value.toLocaleString('en-PH', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const formatDateTime = (dateStr: string) => {
		if (!dateStr) return '—';
		const [date, time] = dateStr.split(' ');
		const [day, month, year] = date.split('/');
		const [hh, mm, ss] = time.split(':');
		return `${month}/${day}/${year} ${hh}:${mm}${ss ? `:${ss}` : ''}`;
	};

	const formatCheckDate = (date: string) => {
		return date === '/  /' ? '—' : date;
	};

	const getPaymentMethod = (method: number) => {
		const map: Record<number, string> = {
			1: 'Cash',
			2: 'Check',
			3: 'Online',
			4: 'GCash',
			5: 'Card',
		};
		return map[method] || `Method ${method}`;
	};

	const getReceiptType = (type: string) => {
		const map: Record<string, string> = {
			'04': 'Payment',
			'05': 'Adjustment',
			'06': 'Reconnection',
		};
		return map[type] || type;
	};

	const getStatusLabel = (status: string) => {
		const map: Record<string, string> = {
			'01': 'Posted',
			'02': 'Voided',
			'03': 'Cancelled',
		};
		return map[status] || 'Unknown';
	};

	const getStatusSeverity = (
		status: string,
	): 'success' | 'danger' | 'warn' | 'info' => {
		const map: Record<string, any> = {
			'01': 'success',
			'02': 'danger',
			'03': 'warn',
		};
		return map[status] || 'info';
	};
</script>
