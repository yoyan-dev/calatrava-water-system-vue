<script setup lang="ts">
	import { ref, onMounted, reactive } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { useBillingStore } from '@/stores/billing';
	import type { Resident } from '@/types/resident';
	import { Timestamp } from 'firebase/firestore';

	const router = useRouter();
	const route = useRoute();
	const store = useBillingStore();
	const billingId = route.params.uid as string;

	console.log(billingId);

	onMounted(() => {
		store.fetchBillingById(billingId);
		console.log(store.billing);
	});

	function onSubmit() {
		store.updateBilling(store.billing as Resident, billingId);
		router.push('/admin/billings');
	}
</script>

<template>
	<div
		v-if="store.billing"
		class="bg-white p-5 border rounded-lg">
		<form @submit.prevent="onSubmit">
			<div
				class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
				Update Water Billing
			</div>
			<div class="flex gap-5">
				<div class="flex flex-col gap-2 bg-gray-50 p-2 px-5 rounded-md">
					<div
						class="flex items-center gap-4 px-3 pr-7 shadow-sm border rounded-md bg-white">
						<Avatar
							icon="pi pi-user"
							style="background-color: #dee9fc; color: #1a2551"
							shape="circle" />
						<div>
							<h1 class="font-semibold">
								{{ store.billing.firstName }} {{ store.billing.middleName }}
								{{ store.billing.lastName }}
							</h1>
							<span class="text-gray-400">{{
								store.billing.accountNumber
							}}</span>
						</div>
					</div>
					<div>
						<label
							for="address"
							class="block text-slate-600"
							>Address</label
						>
						<span class="pl-5">{{ store.billing.address }}</span>
					</div>
					<div>
						<label
							for="classification"
							class="block text-slate-600"
							>Classification</label
						>
						<span class="pl-5">{{ store.billing.classification }}</span>
					</div>
				</div>
				<div>
					<div>
						<label
							for="billNumber"
							class="block"
							>Bill Number</label
						>
						<InputNumber
							id="billNumber"
							v-model.trim="store.billing.billNumber"
							required
							:useGrouping="false"
							size="small" />
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="waterBill"
								class="block"
								>Water Bill</label
							>
							<InputNumber
								id="waterBill"
								v-model.trim="store.billing.waterBill"
								required
								mode="currency"
								currency="PHP"
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="previousReading"
								class="block"
								>Previous Reading</label
							>
							<InputNumber
								id="previousReading"
								v-model.trim="store.billing.previousReading"
								required
								:minFractionDigits="0"
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="envFee"
								class="block"
								>Env. Fee</label
							>
							<InputNumber
								id="envFee"
								v-model.trim="store.billing.envFee"
								required
								mode="currency"
								currency="PHP"
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="currentReading"
								class="block"
								>Current Reading</label
							>
							<InputNumber
								id="currentReading"
								v-model.trim="store.billing.currentReading"
								required
								:minFractionDigits="0"
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="arrears"
								class="block"
								>Arrears</label
							>
							<InputNumber
								id="arrears"
								v-model.trim="store.billing.arrears"
								required
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="previousMeterUsage"
								class="block"
								>Prev Meter Usage</label
							>
							<InputNumber
								id="previousMeterUsage"
								v-model.trim="store.billing.previousMeterUsage"
								required
								:minFractionDigits="0"
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="envFeeArrears"
								class="block"
								>Env. Fee Arrears</label
							>
							<InputNumber
								id="envFeeArrears"
								v-model.trim="store.billing.envFeeArrears"
								required
								mode="currency"
								currency="PHP"
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="waterConsumption"
								class="block"
								>Water Consumption</label
							>
							<InputNumber
								id="waterConsumption"
								v-model.trim="store.billing.waterConsumption"
								required
								:minFractionDigits="0"
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="amortization"
								class="block"
								>Amortization</label
							>
							<InputNumber
								id="amortization"
								v-model.trim="store.billing.amortization"
								required
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="billingAmount"
								class="block"
								>Billing Amount</label
							>
							<InputNumber
								id="billingAmount"
								v-model.trim="store.billing.billingAmmount"
								required
								:minFractionDigits="2"
								size="small" />
						</div>
					</div>
				</div>
				<div>
					<div>Current Billing Schedule</div>
					<DatePicker
						v-model="store.billing.billingDate"
						showIcon
						fluid
						:showOnFocus="false"
						size="small"
						format="MM-DD-YYYY" />
				</div>
			</div>
			<div class="flex justify-end">
				<Button
					label="Submit"
					type="submit"
					:loading="store.isLoading" />
			</div>
		</form>
	</div>
	<div v-else>
		<p>Loading...</p>
	</div>
</template>
