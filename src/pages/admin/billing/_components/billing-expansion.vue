<!-- src/components/BillingExpansion.vue -->
<template>
	<div class="p-4 bg-white rounded-lg shadow-md">
		<h5 class="font-semibold text-lg mb-4">Bill #{{ billing.billNo }}</h5>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<!-- Billing Details -->
			<div
				class="flex flex-col p-4 border border-gray-200 rounded-md bg-gray-50">
				<h6 class="font-semibold mb-3 text-base">Billing Details</h6>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Bill No.:</span>
					<span class="text-sm text-gray-600">{{ billing.billNo }}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Account No.:</span>
					<span class="text-sm text-gray-600">{{ billing.accountno }}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Book:</span>
					<span class="text-sm text-gray-600">{{ billing.book }}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Billing Date:</span>
					<span class="text-sm text-gray-600">{{
						formatDate(billing.billDate)
					}}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Due Date:</span>
					<span class="text-sm text-gray-600">{{
						formatDate(billing.dueDate)
					}}</span>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium">Disconnection Date:</span>
					<span class="text-sm text-gray-600">{{
						formatDate(billing.disconDate)
					}}</span>
				</div>
			</div>

			<!-- Charges -->
			<div
				class="flex flex-col p-4 border border-gray-200 rounded-md bg-gray-50">
				<h6 class="font-semibold mb-3 text-base">Charges</h6>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Water Bill:</span>
					<span class="text-sm text-gray-600">{{
						formatToPeso(billing.billamnt)
					}}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Environmental Fee:</span>
					<span class="text-sm text-gray-600">{{
						formatToPeso(billing.enviromentFee)
					}}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Arrears Amount:</span>
					<span class="text-sm text-gray-600">{{
						formatToPeso(billing.arrearsamt)
					}}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Arrears Env:</span>
					<span class="text-sm text-gray-600">{{
						formatToPeso(billing.arrearsenv)
					}}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Due Penalty:</span>
					<span class="text-sm text-gray-600">{{
						formatToPeso(billing.duePenalty)
					}}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Meter Penalty:</span>
					<span class="text-sm text-gray-600">{{
						formatToPeso(billing.mPenalty)
					}}</span>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium">Discount:</span>
					<span class="text-sm text-gray-600">{{
						formatToPeso(billing.discount)
					}}</span>
				</div>
			</div>

			<!-- Meter Details -->
			<div
				class="flex flex-col p-4 border border-gray-200 rounded-md bg-gray-50">
				<h6 class="font-semibold mb-3 text-base">Meter Details</h6>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Meter No.:</span>
					<span class="text-sm text-gray-600">{{ billing.mtrNo }}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Current Reading:</span>
					<span class="text-sm text-gray-600">{{ billing.curreading }}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Previous Reading:</span>
					<span class="text-sm text-gray-600">{{ billing.prereading }}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Water Usage:</span>
					<span class="text-sm text-gray-600">{{ billing.waterusage }}</span>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium">Previous Usage:</span>
					<span class="text-sm text-gray-600">{{ billing.prevused }}</span>
				</div>
			</div>

			<!-- Additional Information -->
			<div
				class="flex flex-col p-4 border border-gray-200 rounded-md bg-gray-50">
				<h6 class="font-semibold mb-3 text-base">Additional Information</h6>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Class Type:</span>
					<span class="text-sm text-gray-600">{{ billing.classtype }}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Barangay:</span>
					<span class="text-sm text-gray-600">{{ billing.billbrgy }}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Purok:</span>
					<span class="text-sm text-gray-600">{{ billing.billpurok }}</span>
				</div>
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium">Verified:</span>
					<span class="text-sm text-gray-600">{{
						billing.verified ? 'Yes' : 'No'
					}}</span>
				</div>
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium">Paid:</span>
					<span class="text-sm text-gray-600">{{
						billing.paid ? 'Yes' : 'No'
					}}</span>
				</div>
			</div>
		</div>
		<!-- Uncomment and adapt if needed for orders sub-table -->
		<!-- <DataTable :value="billing.orders" class="mt-4">
      <Column field="id" header="Id" sortable />
      <Column field="customer" header="Customer" sortable />
      <Column field="date" header="Date" sortable />
    </DataTable> -->
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';

	// Define props with type
	const props = defineProps<{
		billing: any;
	}>();

	// Format functions (same as in BillingTable; consider a shared utility)
	const formatToPeso = (value: number) => `₱${value.toFixed(2)}`;
	const formatDate = (date: string) => new Date(date).toLocaleDateString();
</script>
