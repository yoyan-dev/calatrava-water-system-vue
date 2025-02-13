<script setup lang="ts">
	import { ref, watch, onMounted, watchEffect, reactive } from 'vue';
	import { useBillingStore } from '@/stores/billing';
	import { useResidentStore } from '@/stores/resident';
	import { useReaderStore } from '@/stores/reader';
	import type { Resident } from '@/types/resident';
	import { useRouter } from 'vue-router';
	import type { Billing } from '@/types/billing';
	import { useToast } from 'primevue';

	const toast = useToast();
	const router = useRouter();
	const billingStore = useBillingStore();
	const residentStore = useResidentStore();
	const readerStore = useReaderStore()
	const isLoading = ref(false);

	const resident = ref<Resident>({});

	const previousBilling = ref<Billing>({});

	const billing = reactive<Billing>({
		waterBill: undefined,
		billNumber: undefined,
		previousReading: undefined,
		environmentFee: undefined,
		currentReading: undefined,
		arrears: undefined,
		previousMeterUsage: undefined,
		environmentFeeArrears: undefined,
		waterConsumption: undefined,
		amortization: undefined,
		billingAmount: undefined,
	});

	const selected = ref<{ accountNumber: any; uid: string; fullName: string }>();
	const selectOptions = ref<
		{ accountNumber: any; uid: string; fullName: string }[]
	>([]);

	const selectedReader = ref()

	async function onSubmit() {
		isLoading.value = true;
		billing.area = resident.value.address;
		billing.meterReader = selectedReader.value.name
		const result = await billingStore.addBilling(billing, selected.value);
		isLoading.value = false;

		toast.add({
			severity: result.status,
			summary: result.statusMessage,
			detail: result.message,
			life: 3000,
		});
		router.push('/admin/billings');
	}

	watchEffect(() => {
		selectOptions.value = residentStore.residents.map((item: Resident) => ({
			accountNumber: item.accountNumber,
			fullName: `${item.firstName ?? ''} ${item.lastName ?? ''}`.trim(),
			uid: item.uid ?? '',
		}));
		// selectOptionsReader.value = readerStore.value.readers.map((row: any) => row)
	});


	watch(selected, () => {
		const findResident = residentStore.residents.find(
			(resident: Resident) => resident.uid == selected.value?.uid,
		);
		resident.value = { ...findResident };
		if(findResident){
			previousBilling.value = {...findResident.currentBilling}
		}
	});

	onMounted(() => {
		residentStore.fetchResidents();
		readerStore.fetchReaders()
	});
</script>

<template>
	<div class="bg-white p-5">
		<form @submit.prevent="onSubmit">
			<div
				class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
				Create New Water Bill
			</div>
			<div class="flex gap-5">
				<div class="flex flex-col gap-2 p-2 px-5 rounded-md flex-1">
					<div>
						<label
							for="account-number"
							class="block"
							>Account Number</label
						>
						<Select
							v-model="selected"
							:loading="residentStore.isLoading"
							:options="selectOptions"
							optionLabel="fullName"
							size="small"
							placeholder="Select resident"
							class="w-full md:w-56" />
					</div>
					<div v-if="resident.accountNumber">
						<div
							class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
							Resident Details
						</div>
						<div
							class="flex items-center gap-4 px-3 pr-7 shadow-sm border rounded-md bg-white">
							<Avatar
								icon="pi pi-user"
								style="background-color: #dee9fc; color: #1a2551" />
							<div>
								<h1 class="font-semibold">
									{{ resident.firstName }} {{ resident.middleName }}
									{{ resident.lastName }}
								</h1>
								<span class="text-gray-700 font-thin">{{
									resident.accountNumber
								}}</span>
							</div>
						</div>
						<div>
							<label
								for="address"
								class="block text-slate-600 my-2"
								>Area: {{ resident.address }}</label
							>
						</div>
						<!-- <div>
              <label for="address" class="block text-slate-600"
                >Classification: {{ resident.classification }}</label
              >
            </div> -->
						<div class="pt-2 border-t mt-2" >
							<div
								class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2 mt-2">
								Previous Billing Schedule
							</div>
							<div class="flex flex-col gap-1 text-gray-700 font-thin" v-if="previousBilling.readingDate">
								<span>Reading Date: {{ previousBilling.readingDate }}</span>
								<span
									>Distribution Date:
									{{ previousBilling.distributionDate }}</span
								>
								<span>Due Date: {{ previousBilling.dueDate }}</span>
								<span
									>Disconnection Date:
									{{ previousBilling.disconnectionDate }}</span
								>
							</div>
							<div class="text-center py-5 text-gray-700" v-else>
								No previous billing found
							</div>
						</div>
					</div>
				</div>
				<div class="p-5 border rounded-lg flex-1 text-gray-700">
					<div>
						<div
							class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
							Billing Details
						</div>
					</div>
					<div>
						<div>
							<label class="block">Billing Date</label>
							<DatePicker
								v-model="billing.billingDate"
								showIcon
								fluid
								:showOnFocus="false"
								size="small"
								format="MM-DD-YYYY" />
						</div>
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
								size="small" fluid/>
						</div>
						<div>
							<label
								for="previous-reading"
								class="block"
								>Previous Reading</label
							>
							<InputNumber
								id="previous-reading"
								v-model="previousBilling.previousReading"
								:disabled="previousBilling.previousReading? true : false"
								required
								:minFractionDigits="0"
								size="small" fluid/>
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
								v-model="billing.environmentFee"
								required
								mode="currency"
								currency="PHP"
								:minFractionDigits="2"
								size="small" fluid/>
						</div>
						<div>
							<label
								for="current-reading"
								class="block"
								>Current Reading</label
							>
							<InputNumber
								id="current-reading"
								v-model="billing.currentReading"
								required
								:minFractionDigits="0"
								size="small" fluid/>
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
								v-model="billing.arrears"
								required
								:minFractionDigits="2"
								size="small" fluid/>
						</div>
						<div>
							<label
								for="previous-meter-usage"
								class="block"
								>Prev meter usage</label
							>
							<InputNumber
								id="previous-meter-usage"
								v-model="previousBilling.previousMeterUsage"
								:disabled="previousBilling.previousMeterUsage? true : false"
								required
								:minFractionDigits="0"
								size="small" fluid/>
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
								v-model="billing.environmentFeeArrears"
								required
								mode="currency"
								currency="PHP"
								:minFractionDigits="2"
								size="small" fluid/>
						</div>
						<div>
							<label
								for="water-consumption"
								class="block"
								>water consumption</label
							>
							<InputNumber
								id="water-consumption"
								v-model="billing.waterConsumption"
								required
								:minFractionDigits="0"
								size="small" fluid/>
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
								v-model="billing.amortization"
								required
								:minFractionDigits="2"
								size="small" fluid/>
						</div>
						<div>
							<label
								for="billing-amount"
								class="block"
								>Billing amount</label
							>
							<InputNumber
								id="billing-amount"
								v-model="billing.billingAmount"
								required
								:minFractionDigits="2"
								size="small" fluid/>
						</div>
					</div>
				</div>
				<div class="p-5 border rounded-lg flex-1 text-gray-700">
					<div>
						<label class="block">Meter Reader</label>
						<Select
							v-model="selectedReader"
							:loading="readerStore.isLoading.value"
							:options="readerStore.readers.value"
							optionLabel="name"
							size="small"
							placeholder="Select meter reader"
							class="w-full md:w-56" />
					</div>
					<div
						class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2 mt-2">
						Dates
					</div>
					<div>
						<label class="block text-lg text-surface-900"
							>Current Billing Schedule</label
						>
						<div>
							<label class="block">Reading Date</label>
							<DatePicker
								showIcon
								v-model="billing.readingDate"
								fluid
								:showOnFocus="false"
								size="small"
								format="MM-DD-YYYY" />
						</div>
						<div>
							<label class="block">Distribution Date</label>
							<DatePicker
								v-model="billing.distributionDate"
								showIcon
								fluid
								:showOnFocus="false"
								size="small"
								format="MM-DD-YYYY" />
						</div>
						<div>
							<label class="block">Due Date</label>
							<DatePicker
								showIcon
								v-model="billing.dueDate"
								fluid
								:showOnFocus="false"
								size="small"
								format="MM-DD-YYYY" />
						</div>
						<div>
							<label class="block">Disconnection Date</label>
							<DatePicker
								v-model="billing.disconnectionDate"
								showIcon
								fluid
								:showOnFocus="false"
								size="small"
								format="MM-DD-YYYY" />
						</div>
					</div>
					<div class="flex justify-end mt-3">
						<Button
							label="Submit"
							type="submit"
							:loading="isLoading" />
					</div>
				</div>
			</div>
		</form>
	</div>
</template>
