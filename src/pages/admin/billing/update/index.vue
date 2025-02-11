<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBillingStore } from "@/stores/billing";
import type { Resident } from "@/types/resident";
import { Timestamp } from "firebase/firestore";
import { useResidentStore } from "@/stores/resident";

const router = useRouter();
const route = useRoute();
const store = useBillingStore();
const billingId = route.params.uid as string;
const residentStore = useResidentStore();
const resident = ref<Resident>({});

console.log(billingId);

onMounted(async () => {
  await store.fetchBilling(billingId);
  if (store.billing?.residentUid) {
    resident.value = await residentStore.fetchResidentByUid(
      store.billing.residentUid
    );
  }
  console.log(store.billing);
  console.log(resident.value);
});

function onSubmit() {
  store.updateBilling(store.billing as Resident, billingId);
  router.push("/admin/billings");
}
</script>

<template>
  <div v-if="store.billing" class="bg-white p-5 border rounded-lg">
    <form @submit.prevent="onSubmit">
      <div
        class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2"
      >
        Create Water Billing
      </div>
      <div class="flex gap-5">
        <div class="flex flex-col gap-2 bg-gray-50 p-2 px-5 rounded-md flex-1">
          <div v-if="resident.accountNumber">
            <div
              class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2"
            >
              Resident Details
            </div>
            <div
              class="flex items-center gap-4 px-3 pr-7 shadow-sm border rounded-md bg-white"
            >
              <Avatar
                icon="pi pi-user"
                style="background-color: #dee9fc; color: #1a2551"
              />
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
              <label for="address" class="block text-slate-600 my-2"
                >Area: {{ resident.address }}</label
              >
            </div>
            <!-- <div>
              <label for="address" class="block text-slate-600"
                >Classification: {{ resident.classification }}</label
              >
            </div> -->
            <!-- <div class="pt-2 border-t mt-2">
              <div
                class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2 mt-2"
              >
                Previous Billing Schedule
              </div>
              <div class="flex flex-col gap-1 text-gray-700 font-thin">
                <span>Reading Date: {{ previousBilling.readingDate }}</span>
                <span
                  >Distribution Dat:
                  {{ previousBilling.distributionDate }}</span
                >
                <span>Due Dat: {{ previousBilling.dueDate }}</span>
                <span
                  >Disconnection Dat:
                  {{ previousBilling.disconnectionDate }}</span
                >
              </div>
            </div> -->
          </div>
        </div>
        <div class="p-5 border rounded-lg flex-1 text-gray-700">
          <div>
            <div
              class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2"
            >
              Billing Details
            </div>
          </div>
          <div class="flex gap-5">
            <div>
              <label class="block">Bill Number</label>
              <InputNumber
                v-model="billing.billNumber"
                required
                :useGrouping="false"
                size="small"
              />
            </div>
            <div>
              <label class="block">Billing Date</label>
              <DatePicker
                v-model="billing.billingDate"
                showIcon
                fluid
                :showOnFocus="false"
                size="small"
                format="MM-DD-YYYY"
              />
            </div>
          </div>
          <div class="flex gap-5">
            <div>
              <label for="water-bill" class="block">Water Bill</label>
              <InputNumber
                id="water-bill"
                v-model="billing.waterBill"
                required
                mode="currency"
                currency="PHP"
                :minFractionDigits="2"
                size="small"
              />
            </div>
            <div>
              <label for="previous-reading" class="block"
                >Previous Reading</label
              >
              <InputNumber
                id="previous-reading"
                v-model="billing.previousReading"
                required
                :minFractionDigits="0"
                size="small"
              />
            </div>
          </div>
          <div class="flex gap-5">
            <div>
              <label for="env-fee" class="block">Env. fee</label>
              <InputNumber
                id="env-fee"
                v-model="billing.environmentFee"
                required
                mode="currency"
                currency="PHP"
                :minFractionDigits="2"
                size="small"
              />
            </div>
            <div>
              <label for="current-reading" class="block">Current Reading</label>
              <InputNumber
                id="current-reading"
                v-model="billing.currentReading"
                required
                :minFractionDigits="0"
                size="small"
              />
            </div>
          </div>
          <div class="flex gap-5">
            <div>
              <label for="arrears" class="block">Arrears</label>
              <InputNumber
                id="arrears"
                v-model="billing.arrears"
                required
                :minFractionDigits="2"
                size="small"
              />
            </div>
            <div>
              <label for="previous-meter-usage" class="block"
                >Prev meter usage</label
              >
              <InputNumber
                id="previous-meter-usage"
                v-model="billing.previousMeterUsage"
                required
                :minFractionDigits="0"
                size="small"
              />
            </div>
          </div>
          <div class="flex gap-5">
            <div>
              <label for="env-fee-arrears" class="block"
                >Env. fee arrears</label
              >
              <InputNumber
                id="env-fee-arrears"
                v-model="billing.environmentFeeArrears"
                required
                mode="currency"
                currency="PHP"
                :minFractionDigits="2"
                size="small"
              />
            </div>
            <div>
              <label for="water-consumption" class="block"
                >water consumption</label
              >
              <InputNumber
                id="water-consumption"
                v-model="billing.waterConsumption"
                required
                :minFractionDigits="0"
                size="small"
              />
            </div>
          </div>
          <div class="flex gap-5">
            <div>
              <label for="amortization" class="block">Amortization</label>
              <InputNumber
                id="amortization"
                v-model="billing.amortization"
                required
                :minFractionDigits="2"
                size="small"
              />
            </div>
            <div>
              <label for="billing-amount" class="block">Billing amount</label>
              <InputNumber
                id="billing-amount"
                v-model="billing.billingAmount"
                required
                :minFractionDigits="2"
                size="small"
              />
            </div>
          </div>
        </div>
        <div class="p-5 border rounded-lg flex-1 text-gray-700">
          <div>
            <label class="block">Meter Reader</label>
            <InputText placeholder="Enter meter reader" />
          </div>
          <div
            class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2 mt-2"
          >
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
                format="MM-DD-YYYY"
              />
            </div>
            <div>
              <label class="block">Distribution Date</label>
              <DatePicker
                v-model="billing.distributionDate"
                showIcon
                fluid
                :showOnFocus="false"
                size="small"
                format="MM-DD-YYYY"
              />
            </div>
            <div>
              <label class="block">Due Date</label>
              <DatePicker
                showIcon
                v-model="billing.dueDate"
                fluid
                :showOnFocus="false"
                size="small"
                format="MM-DD-YYYY"
              />
            </div>
            <div>
              <label class="block">Disconnection Date</label>
              <DatePicker
                v-model="billing.disconnectionDate"
                showIcon
                fluid
                :showOnFocus="false"
                size="small"
                format="MM-DD-YYYY"
              />
            </div>
          </div>
          <div class="flex justify-end mt-3">
            <Button label="Submit" type="submit" :loading="isLoading" />
          </div>
        </div>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
