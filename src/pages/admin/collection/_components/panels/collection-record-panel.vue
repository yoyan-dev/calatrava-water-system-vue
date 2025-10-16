<template>
	<div
		class="flex justify-center gap-10 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm">
		<!-- Section 1: Account & Payment Details -->
		<div class="w-full">
			<h3
				class="font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
				Account & Payment Details
			</h3>
			<div class="space-y-1">
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Account No.:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.accountno }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Bill No.:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.billNo }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>SYS No.:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.sysno }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Receipt Type:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.receipttype }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Payment Date:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.pymtdate }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Payment Method:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.pymtmethod }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Cash:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.cash }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Check:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.check }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Check No.:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.checkno }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Bank ID:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.bankid }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Branch:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.branch }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Receipt Status:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.receiptstatus }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Teller:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.teller }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Pay Arrears:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.payarrears }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Bank Group:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.bankgroup }}</span
					>
				</div>
			</div>
		</div>

		<!-- Section 2: Online & Payment Info -->
		<div class="w-full">
			<h3
				class="font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
				Online & Payment Info
			</h3>
			<div class="space-y-1">
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Bank Online:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.bankonline }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Full Name:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.fullname }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Online Ref:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.onlineref }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Batch No.:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.batchno }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Payment Amount:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.papyamnt }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Payment Amount (Corrected):</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.pacyamnt }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>MRR Fee Amount:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.pmrrfamnt }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>CMRR Fee Amount:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.cmrrfamnt }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Discount Amount:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.pdiscamnt }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Penalty Amount:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.penamnt }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Track Date:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.trackdt }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Running Balance:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.runbalance }}</span
					>
				</div>
			</div>
		</div>

		<!-- Section 3: Customer & Billing Info -->
		<div class="w-full">
			<h3
				class="font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
				Customer & Billing Info
			</h3>
			<div class="space-y-1">
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Customer No.:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.custno }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Other Income:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.othrincome }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Arrears (Environment):</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.arrearsenv }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Arrears Amount:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.arrearsamt }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Environment Fee:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.envfee }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Water Bill:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.waterbill }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Amortize:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.amortize }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Check Date:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.checkdate }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Other Apply:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.othrapply }}</span
					>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
						>Other Reconnection:</span
					>
					<span
						class="text-sm text-gray-600 dark:text-gray-200 text-right flex-1"
						>{{ item.othrreconn }}</span
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		item: {
			accountno: string;
			billNo: string;
			sysno: string;
			receipttype: string;
			pymtdate: string;
			pymtmethod: string;
			cash: string | number;
			check: string | number;
			checkno: string;
			bankid: string;
			branch: string;
			receiptstatus: string;
			teller: string;
			payarrears: string | number;
			bankgroup: string;
			bankonline: string;
			fullname: string;
			onlineref: string;
			batchno: string;
			papyamnt: string | number;
			pacyamnt: string | number;
			pmrrfamnt: string | number;
			cmrrfamnt: string | number;
			pdiscamnt: string | number;
			penamnt: string | number;
			trackdt: string;
			runbalance: string | number;
			custno: string;
			othrincome: string | number;
			arrearsenv: string | number;
			arrearsamt: string | number;
			envfee: string | number;
			waterbill: string | number;
			amortize: string | number;
			checkdate: string;
			othrapply: string | number;
			othrreconn: string | number;
		};
	}>();
</script>
```
