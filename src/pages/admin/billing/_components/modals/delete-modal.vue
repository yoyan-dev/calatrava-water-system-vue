<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import { useBillingStore } from "@/stores/billing";
import { useToast } from "primevue/usetoast";

const dialogRef = inject<any>("dialogRef");
const data = ref();
const toast = useToast();
const store = useBillingStore();

onMounted(() => {
  data.value = dialogRef.value.data;
});

async function onDelete({
  uid,
  accountno,
}: {
  uid: string;
  accountno: string;
}) {
  const res = await store.deleteBilling({ uid, accountno });
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  });
  dialogRef.value.close();
}

function onClose() {
  dialogRef.value.close();
}
</script>
<template>
  <div>
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="data?.uid"
        >Are you sure you want to delete <b>Water Bill</b>?</span
      >
    </div>
    <div class="flex justify-end gap-5">
      <Button label="No" severity="danger" size="small" text @click="onClose" />
      <Button
        label="Yes"
        size="small"
        @click="onDelete({ uid: data?.uid, accountno: data?.accountno })"
      />
    </div>
  </div>
</template>
