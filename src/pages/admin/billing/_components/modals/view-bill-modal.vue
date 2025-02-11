<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { Billing } from "@/types/billing";
import type { BillingStatus } from "@/types/billing";
import type { Resident } from "@/types/resident";
import useFirebaseTimestamp from "@/composables/useFirebaseTimestamp";
import { useResidentStore } from "@/stores/resident";

const visible = ref(false);
const { formatTimestamp } = useFirebaseTimestamp();
const props = defineProps<{
  id?: Billing["id"];
  uid?: Billing["uid"];
  residentUid?: Billing["residentUid"];
  residentAccountNumber?: Billing["residentAccountNumber"];
  billNumber?: Billing["billNumber"];
  meterReader?: Billing["meterReader"];
  billingDate?: Billing["billingDate"];
  waterBill?: Billing["waterBill"];
  environmentFee?: Billing["environmentFee"];
  billingAmount?: Billing["billingAmount"];
  currentReading?: Billing["currentReading"];
  previousReading?: Billing["previousReading"];
  previousMeterUsage?: Billing["previousMeterUsage"];
  waterConsumption?: Billing["waterConsumption"];
  readingDate?: Billing["readingDate"];
  distributionDate?: Billing["distributionDate"];
  dueDate?: Billing["dueDate"];
  disconnectionDate?: Billing["disconnectionDate"];
  status?: BillingStatus;
  createdAt?: Billing["createdAt"];
  environmentFeeArrears?: Billing["environmentFeeArrears"];
  amortization?: Billing["amortization"];
  arrears?: Billing["arrears"];
  area?: Billing["area"];
}>();

const residentStore = useResidentStore();
const resident = ref({} as Resident);

const fetchResidentData = async (residentUid: string) => {
  if (residentUid) {
    await residentStore.fetchResident(residentUid);
    resident.value = { ...residentStore.resident };
  }
};

watch(
  () => props.residentUid,
  (newResidentUid) => {
    if (newResidentUid) {
      fetchResidentData(newResidentUid);
    }
  }
);
</script>
<template>
  <Button
    icon="pi pi-money-bill"
    severity="primary"
    label="view"
    size="small"
    @click="visible = true"
    text
  />
  <Dialog
    v-model:visible="visible"
    header="Bill Details"
    modal
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div v-if="residentStore.isLoading">...Loading</div>
    <div v-else>
      resident: {{ resident }}
      <div class="flex gap-3 items-center pb-5">
        <Avatar image="/logo.jpeg" size="xlarge" shape="circle" />
        <div class="text-cente">
          <h1 class="text-xl font-semibold md:text-2xl lg:text-2xl">
            Calatrava Water System
          </h1>
          <span class="text-sm text-slate-500"
            >Calatrava, Negros Occidental</span
          >
        </div>
      </div>
      <div class="flex flex-col gap-1 px-5 lg:w-[30rem]">
        <span
          ><strong>Account Number:</strong> {{ resident?.accountNumber }}</span
        >
        <span
          ><strong>Name:</strong> {{ resident?.firstName }}
          {{ resident?.lastName }}</span
        >
        <span><strong>Bill Number:</strong> {{ props.billNumber }}</span>
        <span><strong>Address:</strong> {{ resident?.address }}</span>
        <span><strong>Meter No:</strong> </span>
        <span><strong>Stub out:</strong> 2616352</span>
        <span><strong>Class type:</strong> {{ resident?.classification }}</span>
        <span
          ><strong>Billing Month:</strong>
          {{ formatTimestamp(props.billingDate) }}</span
        >
        <span
          ><strong>Billing Period:</strong> January 01, 2025 to January 30,
          2025</span
        >
        <span><strong>Reading Date:</strong> January 01, 2025</span>
        <span><strong>Due Date:</strong> January 01, 2025</span>
        <span><strong>Disconnection Date:</strong> January 01, 2025</span>
        <div class="flex flex-col gap-1">
          <h1 class="font-semibold">Reading</h1>
          <span><strong>Previous Reading:</strong> 3536</span>
          <span><strong>Current Reading:</strong> 3536</span>
          <span><strong>Consumption:</strong> 3536</span>
          <hr />
          <span><strong>Current Charge:</strong> 3536</span>
          <span><strong>Environmental Fee:</strong> 3536</span>
          <span><strong>Water Bill Arrears:</strong> 3536</span>
          <span><strong>Env. Fee Arrears:</strong> 3536</span>
          <span><strong>Amortization:</strong> 3536</span>
          <span><strong>Total Amount Due:</strong> 3536</span>
          <span><strong>Until Due Date:</strong> 3536</span>
        </div>
        <span><strong>Meter Reader:</strong> Joselito B. Rodriguez</span>
      </div>
    </div>
  </Dialog>
</template>
