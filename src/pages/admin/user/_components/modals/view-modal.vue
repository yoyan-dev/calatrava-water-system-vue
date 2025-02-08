<script setup lang="ts">
import { ref, reactive } from "vue";
import type { Resident } from "@/types/resident";

const visible = ref(false);

const props = defineProps<{
  id?: Resident["id"];
  uid?: Resident["uid"];
  accountNumber?: Resident["accountNumber"];
  firstName?: Resident["firstName"];
  middleName?: Resident["middleName"];
  lastName?: Resident["lastName"];
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
    <div class="flex">
      <div class="p-5 border rounded-lg">
        <Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
        <div class="flex flex-col">
          <span class="text-xl">{{
            `${props.firstName} ${props.middleName} ${props.lastName}`
          }}</span>
          <span class="text-slate-600">{{ props.accountNumber }}</span>
        </div>
      </div>
      <div class="p-5">
        <div class="flex flex-col">
          <span class="text-slate-500">Classification</span>
          <span class="pl-5">{{ props.classification }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-slate-500">Address</span>
          <span class="pl-5">{{ props.address }}</span>
        </div>
      </div>
    </div>
    <div class="py-5">
      <div class="text-xl">List of Billings</div>
    </div>
  </Dialog>
</template>
