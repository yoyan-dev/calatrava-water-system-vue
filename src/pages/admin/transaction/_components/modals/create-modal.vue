<script setup lang="ts">
import { ref } from "vue";
import { useTransactionStore } from "@/stores/transaction";
import type { Resident } from "@/types/resident";

const store = useTransactionStore();
const isOpen = ref(false);
const isLoading = ref(false);
const isSubmitted = ref(false);

const transaction = ref<Resident>({});

function onSubmit() {
  isLoading.value = true;
  isSubmitted.value = true;
  store.addTransaction(transaction.value);
  isOpen.value = false;
  transaction.value = {};
  isLoading.value = false;
  isSubmitted.value = false;
}
</script>
<template>
  <div>
    <Button label="New" icon="pi pi-plus" class="mr-2" @click="isOpen = true" />
    <Dialog
      v-model:visible="isOpen"
      :style="{ width: '450px' }"
      header="Water Bill Details"
      :modal="true"
    >
      <div class="flex flex-col gap-6">
        <!-- <img v-if="waterBill.image" :src="`https://primefaces.org/cdn/primevue/images/waterBill/${waterBill.image}`" :alt="waterBill.image" class="block m-auto pb-4" /> -->
        <div>
          <label for="name" class="block font-bold mb-3">Water Bill</label>
          <InputText
            id="name"
            type="number"
            v-model.trim="transaction.waterBill"
            required="true"
            autofocus
            :invalid="submitted && !transaction.waterBill"
            fluid
          />
          <small v-if="submitted && !transaction.waterBill" class="text-red-500"
            >Name is required.</small
          >
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          severity="danger"
          icon="pi pi-times"
          text
          @click="isOpen = false"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          @click="onSubmit"
          :loading="isLoading"
        />
      </template>
    </Dialog>
  </div>
</template>
