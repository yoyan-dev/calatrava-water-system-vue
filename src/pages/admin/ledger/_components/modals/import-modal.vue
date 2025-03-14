<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue";
import { useLedgerStore } from "@/stores/ledger";

const toast = useToast();
const store = useLedgerStore();
const isOpen = ref(false);
const selectedFile = ref<File | null>(null);
const isUploading = ref(false);

async function onSubmit() {
  if (!selectedFile.value) {
    toast.add({
      severity: "warn",
      summary: "No File Selected",
      detail: "Please select a CSV file before uploading.",
      life: 3000,
    });
    return;
  }

  isUploading.value = true;
  const res = await store.addLedgers(selectedFile.value);
  toast.add({
    severity: res.status,
    summary: res.statusMessage || "Upload Status",
    detail: res.message,
    life: 3000,
  });
  isOpen.value = false;
}

function onFileSelect(event: any) {
  selectedFile.value = event.files?.[0] || null;
}
</script>

<template>
  <Button icon="pi pi-file-import" @click="isOpen = true" />
  <Dialog
    v-model:visible="isOpen"
    :style="{ width: '450px' }"
    header="Import ledger csv"
    :modal="true"
  >
    <FileUpload
      :pt="{
        root: 'justify-start border rounded-lg border-gray-300',
      }"
      mode="basic"
      @select="onFileSelect"
      customUpload
      accept=".csv"
      severity="secondary"
    />
    <p class="text-sm text-gray-500 mt-2">
      Note: Please ensure the CSV file has no more than 2000 rows.
    </p>
    <template #footer>
      <Button
        label="Cancel"
        severity="danger"
        variant="outlined"
        size="small"
        @click="isOpen = false"
      />
      <Button
        size="small"
        :loading="store.isLoading"
        label="Upload"
        @click="onSubmit"
      />
    </template>
  </Dialog>
</template>
