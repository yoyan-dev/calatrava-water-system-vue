<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { useResidentStore } from "@/stores/resident";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const store = useResidentStore();
const dialogRef = inject<any>("dialogRef");
const uid = ref();

onMounted(() => {
  uid.value = dialogRef.value.data.uid;
});

async function deleteResident() {
  const res = await store.deleteResident(uid.value!);
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  });
}

function onClose() {
  dialogRef.value.close();
}
</script>
<template>
  <form class="flex flex-col gap-4" @submit.prevent="deleteResident">
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle text-3xl!" />
      <span>Are you sure you want to delete resident?</span>
    </div>
    <div class="w-full flex gap-4 justify-end items-center">
      <Button
        label="No"
        icon="pi pi-times"
        severity="danger"
        text
        @click="onClose"
      />
      <Button label="Yes" icon="pi pi-check" type="submit" />
    </div>
  </form>
</template>
