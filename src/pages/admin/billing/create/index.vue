<script setup lang="ts">
	import { ref, watch, onMounted, watchEffect, reactive } from 'vue';
	import { useBillingStore } from '@/stores/billing';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';
	import { useRouter } from 'vue-router';
	import type { Billing } from '@/types/billing';

	const router = useRouter();
	const billingStore = useBillingStore();
	const residentStore = useResidentStore();
	const isLoading = ref(false);

	const resident = ref<Resident>({});
	const billing = reactive<Billing>({
		waterBill: undefined,
	});

	const selected = ref<{ accountNumber: any; uid: string }>();
	const selectOptions = ref<{ accountNumber: any; uid: string }[]>([]);

	function onSubmit() {
		isLoading.value = true;

		// resident.value.billingDate = new Date(resident.value.billingDate);
		billingStore.addBilling(billing, selected.value);
		resident.value = {};
		isLoading.value = false;

		router.push('/admin/billings');
	}

	watchEffect(() => {
		selectOptions.value = residentStore.residents.map((item: Resident) => ({
			accountNumber: item.accountNumber,
			uid: item.uid ?? '',
		}));
	});

	watch(selected, () => {
		const findResident = residentStore.residents.find(
			(resident: Resident) => resident.uid == selected.value?.uid,
		);
		resident.value = { ...findResident };
	});

	onMounted(() => {
		residentStore.fetchResidents();
	});
</script>

<template>
	<div class="bg-white p-5 border rounded-lg">
		<form @submit.prevent="onSubmit">
			<div
				class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
				Create Water Billing
			</div>
			<div class="flex gap-5">
				<div class="flex flex-col gap-2 bg-gray-50 p-2 px-5 rounded-md flex-1">
					<div>
						<label
							for="account-number"
							class="block"
							>Account Number</label
						>
						<Select
							v-model="selected"
							variant="filled"
							:options="selectOptions"
							optionLabel="accountNumber"
							size="small"
							placeholder="Select Account Number"
							class="w-full md:w-56" />
					</div>
					<div v-if="resident.accountNumber">
						<div
							class="flex items-center gap-4 px-3 pr-7 shadow-sm border rounded-md bg-white">
							<Avatar
								icon="pi pi-user"
								style="background-color: #dee9fc; color: #1a2551"
								shape="circle" />
							<div>
								<h1 class="font-semibold">
									{{ resident.firstName }} {{ resident.middleName }}
									{{ resident.lastName }}
								</h1>
								<span class="text-gray-400">{{ resident.accountNumber }}</span>
							</div>
						</div>
						<div>
							<label
								for="address"
								class="block text-slate-600"
								>Address</label
							>
							<span class="pl-5">{{ resident.address }}</span>
						</div>
						<div>
							<label
								for="address"
								class="block text-slate-600"
								>Classification</label
							>
							<span class="pl-5">{{ resident.classification }}</span>
						</div>
					</div>
				</div>
				<div class="p-5 border rounded-lg flex-1">
					<div>
						<label class="block">Bill Number</label>
						<InputNumber
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
								v-model="billing.waterBill"
								required
								mode="currency"
								currency="PHP"
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
								required
								mode="currency"
								currency="PHP"
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
								required
								mode="currency"
								currency="PHP"
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
								required
								:minFractionDigits="2"
								size="small" />
						</div>
					</div>
				</div>
				<div class="p-5 border rounded-lg flex-1">
					<!-- <div>
						<label
							for="water-bill"
							class="block"
							>Area</label
						>
						<InputNumber
							id="water-bill"
							required
							size="small" />
					</div> -->
					<div>Current Billing schedule</div>
					<DatePicker
						showIcon
						fluid
						:showOnFocus="false"
						size="small"
						format="MM-DD-YYYY" />
					<!-- <DatePicker v-model="resident.waterBill" showIcon fluid :showOnFocus="false" />
          <DatePicker v-model="resident.waterBill" showIcon fluid :showOnFocus="false" />
          <DatePicker v-model="resident.waterBill" showIcon fluid :showOnFocus="false" /> -->
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
