<script setup lang="ts">
import { ref } from "vue";
import { useLedgerStore } from "@/stores/ledger";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const store = useLedgerStore();

const isOpen = ref(false);

async function onDelete() {
  const res = await store.deleteLedgers(props.selectedLedgers);
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  });
  isOpen.value = false;
}

const props = defineProps<{ selectedLedgers: any }>();
</script>
<template>
  <div>
    <Button icon="pi pi-trash" severity="danger" @click="isOpen = true" />
    <Dialog
      v-model:visible="isOpen"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span
          >Are you sure you want to delete this selected <b>Ledger</b>?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          severity="danger"
          text
          size="small"
          @click="isOpen = false"
        />
        <Button
          size="small"
          label="Yes"
          :loading="store.isLoading"
          @click="onDelete"
        />
      </template>
    </Dialog>
  </div>
</template>
