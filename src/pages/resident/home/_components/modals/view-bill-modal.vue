<script setup lang="ts">
import { ref, onMounted } from "vue";
import payBillModal from "./pay-bill-modal.vue";
import type { Billing } from "@/types/billing";
import type { Resident } from "@/types/resident";
import useFirebaseTimestamp from "@/composables/useFirebaseTimestamp";
import { formatToPeso } from "@/composables/currencyFormat";

const visible = ref(false);

const { formatTimestamp } = useFirebaseTimestamp();
const props = defineProps<{
  resident: Resident;
  billing: Billing;
}>();
</script>
<template>
  <Button
    icon="pi pi-money-bill"
    severity="primary"
    label="View bill"
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
    <div class="flex gap-3 items-center pb-5">
      <Avatar image="./logo.png" size="xlarge" shape="circle" />
      <div class="text-cente">
        <h1 class="text-xl font-semibold md:text-2xl lg:text-2xl">
          Calatrava Water System
        </h1>
        <span class="text-sm text-slate-500">Calatrava, Negros Occidental</span>
      </div>
    </div>
    <div class="flex flex-col gap-1 px-5">
      <span
        ><strong>Account Number:</strong>
        {{ props.resident.accountNumber }}</span
      >
      <span
        ><strong>Name:</strong> {{ props.resident.firstName }}
        {{ props.resident.lastName }}</span
      >
      <span><strong>Bill Number:</strong> {{ props.billing.billNumber }}</span>
      <span><strong>Book:</strong> {{ props.resident.book }}</span>
      <span><strong>Meter No:</strong> 2616352</span>
      <span><strong>Stub out:</strong> 2616352</span>
      <span><strong>Class type:</strong> {{ props.resident.classtype }}</span>
      <span
        ><strong>Billing Month:</strong> {{ props.billing.billingDate }}</span
      >
      <span
        ><strong>Billing Period:</strong> January 01, 2025 to January 30,
        2025</span
      >
      <span
        ><strong>Reading Date:</strong> {{ props.billing.readingDate }}</span
      >
      <span><strong>Due Date:</strong> {{ props.billing.dueDate }}</span>
      <span
        ><strong>Disconnection Date:</strong>
        {{ props.billing.disconnectionDate }}</span
      >
      <div class="flex flex-col gap-1">
        <h1 class="font-semibold">Reading</h1>
        <span><strong>Previous Reading:</strong> 3536</span>
        <span><strong>Current Reading:</strong> 3536</span>
        <span><strong>Consumption:</strong> 3536</span>
        <hr />
        <span><strong>Current Charge:</strong> 3536</span>
        <span
          ><strong>Environmental Fee:</strong>
          {{ props.billing.environmentFee }}</span
        >
        <span
          ><strong>Water Bill Arrears:</strong>
          {{ props.billing.arrears }}</span
        >
        <span
          ><strong>Env. Fee Arrears:</strong>
          {{ props.billing.environmentFeeArrears }}</span
        >
        <span
          ><strong>Amortization:</strong> {{ props.billing.amortization }}</span
        >
        <span><strong>Total Amount Due:</strong> 3536</span>
        <span><strong>Until Due Date:</strong> 3536</span>
      </div>
      <span
        ><strong>Meter Reader:</strong> {{ props.billing.meterReader }}</span
      >
      <div class="text-center py-5">
        *Please pay your water bill on or before the due date. <br />
        Water service will be disconnected if payment<br />
        is not made three (3) days before the due date*<br />
      </div>
      <div>
        <payBillModal />
      </div>
    </div>
  </Dialog>
</template>
