<script setup lang="ts">
import { ref } from "vue";
import type { Resident } from "@/types/resident";
import UpdateModal from "./update-modal.vue";
import BillingTable from "../billing-table.vue";

const visible = ref(false);

const props = defineProps<{
  resident: Resident;
}>();
</script>
<template>
  <Button
    icon="pi pi-eye"
    severity="secondary"
    size="small"
    label="view"
    @click="visible = true"
    text
  />
  <Dialog
    v-model:visible="visible"
    modal
    header="Resident Profile"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="flex flex-wrap">
      <div class="p-5 border rounded-lg flex-1 flex md:flex-col">
        <Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
        <div class="flex justify-between items-start">
          <div class="flex flex-col">
            <span class="text-xl capitalize">{{
              `${props.resident.fullname}`
            }}</span>
            <span class="text-slate-600">Acc-no. {{ props.resident.uid }}</span>
          </div>
        </div>
      </div>
      <div class="px-0 md:px-5 flex-1">
        <div class="flex justify-between items-start">
          <div class="flex flex-col">
            <span class="text-slate-500">Classification</span>
            <span class="capitalize">{{ props.resident.classification }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-slate-500">Address</span>
            <span class="capitalize">{{ props.resident.address }}</span>
          </div>
          <UpdateModal v-bind="props.resident" />
        </div>
      </div>
    </div>
    <div class="py-5">
      <div class="p-2 border rounded-lg">
        <BillingTable :uid="props.resident.uid" />
      </div>
    </div>
  </Dialog>
</template>
