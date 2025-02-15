<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Resident } from "@/types/resident";
import UpdateModal from "./update-modal.vue";
import BillingTable from "../billing-table.vue"

const visible = ref(false);

const props = defineProps<{
  id?: Resident["id"];
  uid?: Resident["uid"];
  accountNumber?: Resident["accountNumber"];
  fullname?: Resident["fullname"];
  address?: Resident["address"];
  classification?: Resident["classification"];
}>();
</script>
<template>
  <Button
    icon="pi pi-eye"
    severity="secondary"
    size="small"
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
                `${props.fullname}`
              }}</span>
              <span class="text-slate-600">Acc-no. {{ props.accountNumber }}</span>
            </div>
        </div>
      </div>
      <div class="px-0 md:px-5 flex-1">
        <div class="flex justify-between items-start">
            <div class="flex flex-col">
              <span class="text-slate-500">Classification</span>
              <span class="capitalize">{{ props.classification }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-slate-500">Address</span>
              <span class="capitalize">{{ props.address }}</span>
            </div>
            <UpdateModal v-bind="props" />
        </div>
      </div>
    </div>
    <div class="py-5">
      <div class="p-2 border rounded-lg">
          <BillingTable/>
      </div>
    </div>
  </Dialog>
</template>
