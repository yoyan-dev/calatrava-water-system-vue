<script setup lang="ts">
	import { ref, watch, onMounted } from 'vue';
	import { useBillingStore } from '@/stores/billing';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';
	import { useRouter } from 'vue-router';

	const router = useRouter()
	const transactionStore = useBillingStore();
	const residentStore = useResidentStore();
	const isLoading = ref(false);
	const isSubmitted = ref(false);

	const transaction = ref<Resident>({});
	const selectedAccountNumber = ref('');
	const accountNumbers = ref<string[]>([]);

	onMounted(async () => {
		await residentStore.fetchResidents();
		accountNumbers.value = residentStore.residents.map(
			(resident: any) => resident.accountNumber,
		);
	});

	watch(selectedAccountNumber, async (newAccountNumber) => {
		if (newAccountNumber) {
			const findResident = residentStore.residents.find(
				(resident: any) => resident.accountNumber === newAccountNumber,
			);
			transaction.value = { ...findResident };
		}
	});
	function onSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;
		transaction.value.billingDate = new Date(transaction.value.billingDate); // Ensure billingDate is a Date object
		transactionStore.addBilling(transaction.value);
		transaction.value = {};
		isLoading.value = false;
		isSubmitted.value = false;
		router.push('/admin/billings');
	}
</script>

<template>
	<div class="bg-white p-5 rounded-sm">
		<form @submit.prevent="onSubmit">
			<div
				class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
				Create Water Billing
			</div>
			<div class="flex gap-5">
				<div class="flex flex-col gap-2 bg-gray-50 p-2 px-5 rounded-md">
					<div>
						<label
							for="account-number"
							class="block"
							>Account Number</label
						>
						<Select
							v-model="selectedAccountNumber"
							variant="filled"
							:options="accountNumbers"
							size="small"
							placeholder="Select Account Number"
							class="w-full md:w-56" />
					</div>
					<div v-if="transaction.accountNumber
					">
						<div class="flex items-center gap-4 px-3 pr-7 shadow-sm border rounded-md bg-white">
							<Avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
							<div>
								<h1 class="font-semibold">{{ transaction.firstName }} {{ transaction.middleName }} {{ transaction.lastName }}</h1>
								<span class="text-gray-400">{{ transaction.accountNumber }}</span>
							</div>
						</div>
						<div>
							<label
								for="address"
								class="block text-slate-600"
								>Address</label
							>
							<span class="pl-5">{{ transaction.address }}</span>
						</div>
						<div>
							<label
								for="address"
								class="block text-slate-600"
								>Classification</label
							>
							<span class="pl-5">{{ transaction.classification }}</span>
						</div>
					</div>
				</div>
				<div>
					<!-- <div class="flex gap-5">
						<div>
							<label
								for="
								"
								class="block"
								>Stubout</label
							>
							<InputNumber
								id="
								"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
						<div>
							<label
								for="
								"
								class="block"
								>Meter No.</label
							>
							<InputNumber
								id="
								"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
					</div> -->
					<!-- <div>
						<label
							for="
							"
							class="block"
							>Water Reader</label
						>
						<InputNumber
							id="
							"
							v-model.trim="transaction.waterBill"
							required
							size="small" />
					</div> -->
					<div>
						<label
							for="
							"
							class="block"
							>Bill Number</label
						>
						<InputNumber
							id="
							"
							v-model.trim="transaction.billNumber"
							required
							:useGrouping="false"
							size="small" />
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="water-bill"
								class="block"
								>Water Bill</label
							>
							<InputNumber
								id="water-bill"
								v-model.trim="transaction.waterBill"
								required
								mode="currency" currency="PHP"
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="previous-reading"
								class="block"
								>Previous Reading</label
							>
							<InputNumber
								id="previous-reading"
								v-model.trim="transaction.previousReading"
								required
								:minFractionDigits="0"
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="env-fee"
								class="block"
								>Env. fee</label
							>
							<InputNumber
								id="env-fee"
								v-model.trim="transaction.envFee"
								required
								mode="currency" currency="PHP"
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="current-reading"
								class="block"
								>Current Reading</label
							>
							<InputNumber
								id="current-reading"
								v-model.trim="transaction.currentReading"
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
								v-model.trim="transaction.arrears"
								required
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="previous-meter-usage"
								class="block"
								>Prev meter usage</label
							>
							<InputNumber
								id="previous-meter-usage"
								v-model.trim="transaction.previousMeterUsage"
								required
								:minFractionDigits="0"
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="env-fee-arrears"
								class="block"
								>Env. fee arrears</label
							>
							<InputNumber
								id="env-fee-arrears"
								v-model.trim="transaction.envFeeArrears"
								required
								mode="currency" currency="PHP"
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="water-consumption"
								class="block"
								>water consumption</label
							>
							<InputNumber
								id="water-consumption"
								v-model.trim="transaction.waterConsumption"
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
								v-model.trim="transaction.amortization"
								required
								:minFractionDigits="2"
								size="small" />
						</div>
						<div>
							<label
								for="billing-amount"
								class="block"
								>Billing amount</label
							>
							<InputNumber
								id="billing-amount"
								v-model.trim="transaction.billingAmmount"
								required
								:minFractionDigits="2"
								size="small" />
						</div>
					</div>
				</div>
				<div>
					<!-- <div>
						<label
							for="water-bill"
							class="block"
							>Area</label
						>
						<InputNumber
							id="water-bill"
							v-model.trim="transaction.waterBill"
							required
							size="small" />
					</div> -->
					<div>Current Billing schedule</div>
					<DatePicker
						v-model="transaction.billingDate"
						showIcon
						fluid
						:showOnFocus="false"
						size="small"
						format="MM-DD-YYYY" />
					<!-- <DatePicker v-model="transaction.waterBill" showIcon fluid :showOnFocus="false" />
          <DatePicker v-model="transaction.waterBill" showIcon fluid :showOnFocus="false" />
          <DatePicker v-model="transaction.waterBill" showIcon fluid :showOnFocus="false" /> -->
				</div>
			</div>
			<div class="flex justify-end">
				<Button
					label="Submit"
					type="submit"
					:loading="isLoading" />
			</div>

		</form>
	</div>
</template>
