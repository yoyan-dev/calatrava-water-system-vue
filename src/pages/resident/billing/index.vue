<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import Header from '@/pages/resident/billing/_components/header.vue';
	import { useResidentStore } from '@/stores/resident';
	import { useRoute, useRouter } from 'vue-router';
	import { useCurrentUser } from 'vuefire';
	import { getSeverity } from '@/composables/getSeverity';
	import { formatToPeso } from '@/composables/currencyFormat';

	const router = useRouter();
	const user = useCurrentUser() as any;
	const store = useResidentStore();
	const expandedRows = ref({});

	onMounted(async () => {
		if (!user.value) {
			console.log('No user is signed in.');
			router.push('/');
			return;
		}
		const residentId = user.value.uid;
		await store.fetchResident(residentId as string);
	});
</script>

<template>
	<div
		class="h-screen flex justify-center items-center"
		v-if="store.isLoading">
		<i
			class="pi pi-spin pi-spinner text-primary"
			style="font-size: 2rem"></i>
	</div>
	<div
		class="bg-surface-0 dark:bg-surface-900 m-0 md:m-3 lg:m-5 p-0 py-6 md:p-6 border rounded-lg"
		v-else>
		<Header class="px-2 md:p-0" />
		<div class="flex flex-col gap-3">
			<div>
				<div class="w-full">
					<!-- <FloatLabel variant="on">
							<DatePicker
								inputId="on_label"
								view="month"
								dateFormat="MM yy"
								showIcon
								fluid
								iconDisplay="input" />
							<label for="on_label">Select month</label>
						</FloatLabel> -->
				</div>
			</div>
			<div class="border rounded-md">
				<DataTable
					v-model:expandedRows="expandedRows"
					:value="store.resident?.billings"
					:loading="store.isLoading"
					dataKey="billNo"
					size="small"
					:rows="10">
					<template #empty>
						<div class="flex items-center justify-center p-4">
							No billing found.
						</div>
					</template>
					<Column
						class="whitespace-nowrap text-ellipsis"
						expander
						style="width: 5rem" />
					<Column
						class="whitespace-nowrap text-ellipsis"
						header="Bill No."
						field="billNo">
					</Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						field="billDate"
						header="Billing Date">
					</Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						field="waterBill"
						header="Bill Amount">
						<template #body="slotProps">
							<span class="rounded-md text-primary">
								<i name="pi pi-money-bill"></i
								>{{ formatToPeso(slotProps.data.billamnt) }}
							</span>
						</template>
					</Column>
					<Column
						class="whitespace-nowrap text-ellipsis"
						header="Status">
						<template #body="slotProps">
							<Tag
								:severity="
									getSeverity(slotProps.data.paymentStatus || 'unpaid')
								"
								:value="slotProps.data.paymentStatus ?? 'unpaid'"></Tag>
						</template>
					</Column>
					<template #expansion="slotProps">
						<div class="p-4 bg-gray-50">
							<h5 class="font-semibold">Bill#{{ slotProps.data.billNo }}</h5>
							<div class="flex flex-wrap gap-5">
								<div
									class="flex-1 flex flex-col p-3 border rounded-md bg-white">
									<h5 class="font-semibold mb-3">Billing Details</h5>
									<div class="flex justify-between items-end gap-3">
										<span>Bill No.:</span>
										<span class="text-gray-500">{{
											slotProps.data.billNo
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Account No.:</span>
										<span class="text-gray-500">{{
											slotProps.data.accountno
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Book:</span>
										<span class="text-gray-500">{{ slotProps.data.book }}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Billing Date:</span>
										<span class="text-gray-500">{{
											slotProps.data.billDate
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Due Date:</span>
										<span class="text-gray-500">{{
											slotProps.data.dueDate
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Disconnection Date:</span>
										<span class="text-gray-500">{{
											slotProps.data.disconDate
										}}</span>
									</div>
								</div>
								<div
									class="flex-1 flex flex-col p-3 border rounded-md bg-white">
									<h5 class="font-semibold mb-3">Charges</h5>
									<div class="flex justify-between items-end gap-3">
										<span>Water Bill:</span>
										<span class="text-gray-500">{{
											slotProps.data.billamnt
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Enviromental Fee:</span>
										<span class="text-gray-500">{{
											slotProps.data.enviromentFee
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Arrears Amount:</span>
										<span class="text-gray-500">{{
											slotProps.data.arrearsamt
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Arrears Env:</span>
										<span class="text-gray-500">{{
											slotProps.data.arrearsenv
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Due Penalty:</span>
										<span class="text-gray-500">{{
											slotProps.data.duePenalty
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Meter Penalty:</span>
										<span class="text-gray-500">{{
											slotProps.data.mPenalty
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Discount:</span>
										<span class="text-gray-500">{{
											slotProps.data.discount
										}}</span>
									</div>
								</div>
								<div
									class="flex-1 flex flex-col p-3 border rounded-md bg-white">
									<h5 class="font-semibold mb-3">Meter Details</h5>
									<div class="flex justify-between items-end gap-3">
										<span>Meter No.:</span>
										<span class="text-gray-500">{{
											slotProps.data.mtrNo
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Current Reading:</span>
										<span class="text-gray-500">{{
											slotProps.data.curreading
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Previous Reading:</span>
										<span class="text-gray-500">{{
											slotProps.data.prereading
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Water Usage:</span>
										<span class="text-gray-500">{{
											slotProps.data.waterusage
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Previous Usage:</span>
										<span class="text-gray-500">{{
											slotProps.data.prevused
										}}</span>
									</div>
								</div>
								<div
									class="flex-1 flex flex-col p-3 border rounded-md bg-white">
									<h5 class="font-semibold mb-3">Additional Information</h5>
									<div class="flex justify-between items-end gap-3">
										<span>Class Type:</span>
										<span class="text-gray-500">{{
											slotProps.data.classtype
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Barangay:</span>
										<span class="text-gray-500">{{
											slotProps.data.billbrgy
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Purok:</span>
										<span class="text-gray-500">{{
											slotProps.data.billpurok
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Verified:</span>
										<span class="text-gray-500">{{
											slotProps.data.verified
										}}</span>
									</div>
									<div class="flex justify-between items-end gap-3">
										<span>Paid:</span>
										<span class="text-gray-500">{{ slotProps.data.paid }}</span>
									</div>
								</div>
							</div>
							<!-- <DataTable :value="slotProps.data.orders">
									<Column class="whitespace-nowrap text-ellipsis" field="id" header="Id" sortable></Column>
									<Column class="whitespace-nowrap text-ellipsis" field="customer" header="Customer" sortable></Column>
									<Column class="whitespace-nowrap text-ellipsis" field="date" header="Date" sortable></Column>
								</DataTable> -->
						</div>
					</template>
				</DataTable>
				<!-- <Paginator
						:template="{
							'640px': 'PrevPageLink CurrentPageReport NextPageLink',
							'960px':
								'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
							'1300px':
								'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
							default:
								'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
						}"
						:rows="10"
					</Paginator> -->
			</div>
		</div>
	</div>
</template>
