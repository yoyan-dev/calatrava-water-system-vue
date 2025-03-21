<script setup lang="ts">
import { ref, computed, onMounted, watch, watchEffect } from "vue";
import type { Billing } from "@/types/billing";
import type { BillingStatus } from "@/types/billing";
import type { Resident } from "@/types/resident";
import useFirebaseTimestamp from "@/composables/useFirebaseTimestamp";

const visible = ref(false);
const { formatTimestamp } = useFirebaseTimestamp();

const props = defineProps<{
  billing: Billing;
}>();
console.log(props.billing);
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
    <div>
      <div class="flex gap-3 items-center pb-5">
        <Avatar image="/logo.png" size="xlarge" shape="circle" />
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
          ><strong>Account Number:</strong> {{ props.billing.accountno }}</span
        >
        <span><strong>Name:</strong> {{ props.billing.fullname }} ></span>
        <span><strong>Bill Number:</strong> {{ props.billing.bill_no }}</span>
        <span><strong>Book:</strong> {{ props.billing.book }}</span>
        <span><strong>Meter No:</strong> {{ props.billing.mtr_no }} </span>
        <span><strong>Stub out:</strong> 2616352</span>
        <span
          ><strong>Billing Month:</strong>
          {{ formatTimestamp(props.billing.bill_date) }}</span
        >
        <span
          ><strong>Billing Period:</strong> January 01, 2025 to January 30,
          2025</span
        >
        <span
          ><strong>Due Date:</strong>
          {{ formatTimestamp(props.billing.due_date) }}</span
        >
        <div class="flex flex-col gap-1">
          <h1 class="font-semibold">Reading</h1>
          <span
            ><strong>Pre Reading:</strong>{{ props.billing.prereading }}</span
          >
          <span><strong>Current Reading:</strong> 3536</span>
          <span><strong>Consumption:</strong> 3536</span>
          <hr />
          <span><strong>Current Charge:</strong> 3536</span>
          <span
            ><strong>Install Fee:</strong> {{ props.billing.installfee }}</span
          >
          <span
            ><strong>Water Bill Arrears:</strong>
            {{ props.billing.arrearsamt }}</span
          >
          <span><strong>Total Amount Due:</strong> 3536</span>
          <span><strong>Until Due Date:</strong> 3536</span>
        </div>
      </div>
    </div>
  </Dialog>
</template>
