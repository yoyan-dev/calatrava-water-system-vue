<script setup lang="ts">
	import { ref, watch, onMounted } from 'vue';
	import { useTransactionStore } from '@/stores/billing';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';

	const transactionStore = useTransactionStore();
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
		transactionStore.addTransaction(transaction.value);
		transaction.value = {};
		isLoading.value = false;
		isSubmitted.value = false;
	}
</script>

<template>
	<div class="bg-white p-5 rounded-sm">
		<form @submit.prevent="onSubmit">
			<div
				class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
				Add Transaction
			</div>
			<div class="flex gap-5">
				<div class="flex flex-col gap-2">
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
					<div>
						<label
							for="first-name"
							class="block"
							>First Name</label
						>
						<InputText
							id="first-name"
							v-model.trim="transaction.firstName"
							size="small"
							required />
					</div>
					<div>
						<label
							for="middle-name"
							class="block"
							>Middle Name</label
						>
						<InputText
							id="middle-name"
							v-model.trim="transaction.middleName"
							size="small" />
					</div>
					<div>
						<label
							for="last-name"
							class="block"
							>Last Name</label
						>
						<InputText
							id="last-name"
							v-model.trim="transaction.lastName"
							required
							size="small" />
					</div>
					<div>
						<label
							for="address"
							class="block"
							>Address</label
						>
						<InputText
							id="address"
							v-model.trim="transaction.address"
							required
							size="small" />
					</div>
					<div>
						<label
							for="classification"
							class="block"
							>Classification</label
						>
						<InputText
							id="classification"
							v-model.trim="transaction.classification"
							required
							size="small" />
					</div>
				</div>
				<div>
					<div class="flex gap-5">
						<div>
							<label
								for="electric-bill"
								class="block"
								>Stubout</label
							>
							<InputNumber
								id="electric-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
						<div>
							<label
								for="electric-bill"
								class="block"
								>Meter No.</label
							>
							<InputNumber
								id="electric-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
					</div>
					<div>
						<label
							for="electric-bill"
							class="block"
							>Water Reader</label
						>
						<InputNumber
							id="electric-bill"
							v-model.trim="transaction.waterBill"
							required
							size="small" />
					</div>
					<div>
						<label
							for="electric-bill"
							class="block"
							>Bill Number</label
						>
						<InputNumber
							id="electric-bill"
							v-model.trim="transaction.waterBill"
							required
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
								size="small" />
						</div>
						<div>
							<label
								for="electric-bill"
								class="block"
								>Previous Reading</label
							>
							<InputNumber
								id="electric-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="water-bill"
								class="block"
								>Env. fee</label
							>
							<InputNumber
								id="water-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
						<div>
							<label
								for="electric-bill"
								class="block"
								>Current Reading</label
							>
							<InputNumber
								id="electric-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="water-bill"
								class="block"
								>Arrears</label
							>
							<InputNumber
								id="water-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
						<div>
							<label
								for="electric-bill"
								class="block"
								>Prev meter usage</label
							>
							<InputNumber
								id="electric-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="water-bill"
								class="block"
								>Env. fee arrears</label
							>
							<InputNumber
								id="water-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
						<div>
							<label
								for="electric-bill"
								class="block"
								>water consumption</label
							>
							<InputNumber
								id="electric-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
					</div>
					<div class="flex gap-5">
						<div>
							<label
								for="water-bill"
								class="block"
								>Amortization</label
							>
							<InputNumber
								id="water-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
						<div>
							<label
								for="electric-bill"
								class="block"
								>Billing amount</label
							>
							<InputNumber
								id="electric-bill"
								v-model.trim="transaction.waterBill"
								required
								size="small" />
						</div>
					</div>
				</div>
				<div>
					<div>
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
					</div>
					<div>Current Billing schedule</div>
					<DatePicker
						v-model="transaction.billingDate"
						showIcon
						fluid
						:showOnFocus="false"
						size="small" />
					<!-- <DatePicker v-model="transaction.waterBill" showIcon fluid :showOnFocus="false" />
          <DatePicker v-model="transaction.waterBill" showIcon fluid :showOnFocus="false" />
          <DatePicker v-model="transaction.waterBill" showIcon fluid :showOnFocus="false" /> -->
				</div>
			</div>
			<Button
				label="Submit"
				type="submit"
				:loading="isLoading" />
		</form>
	</div>
</template>
