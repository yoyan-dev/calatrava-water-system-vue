<script setup lang="ts">
import type { Resident } from "@/types/resident";
import useFirebaseTimestamp from "@/composables/useFirebaseTimestamp";
import { formatToPeso } from "@/composables/currencyFormat";
import type { Timestamp } from "firebase/firestore";
import PayBillModal from "./modals/pay-bill-modal.vue";
import { getSeverity } from "@/composables/getSeverity";

const { formatTimestamp } = useFirebaseTimestamp();
const props = defineProps<{
  resident: Resident;
}>();
</script>
<template>
  <div>
    <div class="pb-2">
      <Message severity="warn">
        <div>
          <h1 class="flex items-center gap-2">
            <i class="pi pi-bell"></i> Reminder!.
          </h1>
          <span>Hapit na imong due date.</span>
        </div>
      </Message>
    </div>
    <div class="bg-white p-5 border rounded-lg flex flex-col gap-3">
      <div class="flex justify-between">
        <h1 class="font-semibold text-xl">
          Bill #{{ props.resident.billings?.[0].billNo }}
          <Tag
            :severity="getSeverity(props.resident.billings?.[0].status as string)"
            :value="props.resident.billings?.[0].status"
          ></Tag>
        </h1>
      </div>
      <hr />
      <div class="flex justify-between">
        <div>
          <label class="text-surface-500">Name</label><br />
          <span class="capitalize">{{ props.resident.fullname }}</span>
        </div>
        <div>
          <label class="text-surface-500">Class Type</label><br />
          <span class="capitalize">{{ resident.classification }}</span>
        </div>
      </div>
      <div>
        <label class="text-surface-500">Bill Period</label><br />
        <span
          >{{ formatTimestamp(props.resident.billings?.[0].prvmrDate) }} -
          {{ formatTimestamp(props.resident.billings?.[0].dueDate) }}</span
        >
      </div>
      <div class="flex justify-between">
        <div>
          <label class="text-surface-500">Due Date</label><br />
          <span>{{
            formatTimestamp(props.resident.billings?.[0].dueDate)
          }}</span>
        </div>
        <div>
          <label class="text-surface-500">Amount</label><br />
          <span>
            {{ `₱ ${props.resident.billings?.[0].totalBill}` }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-end p-5">
      <PayBillModal
        :uid="props.resident.uid as string"
        :billingUid="props.resident.billings?.[0].uid as string"
      />
    </div>
  </div>
</template>
