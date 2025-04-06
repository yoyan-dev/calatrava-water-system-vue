<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { usePaymentStore } from "@/stores/payment";

const props = defineProps<{
  uid: string;
  billingUid: string;
}>();

const store = usePaymentStore();
const toast = useToast();
const visible = ref(false);
const uploading = ref(false);
const downloadURL = ref();

const file = ref();

async function onFileSelected(event: any) {
  file.value = event;
  if (!file.value) return;
}

async function onUpload() {
  const res = await store.addPayment({
    uid: props.uid,
    billUid: props.billingUid,
    event: file.value,
  });

  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  });
  res.status === "success" ? (visible.value = false) : null;
}
</script>
<template>
  <Button
    icon="pi pi-money-bill"
    severity="primary"
    label="Pay Current Bill"
    size="small"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    modal
    header="Pay Bill"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div>
      <div class="flex justify-center">
        <Image src="/gcash.jpg" alt="Gcash qr" width="300" preview />
      </div>
      <span class="text-surface-500 dark:text-surface-400 block mb-2 mt-5">
        Upload your receipt.
      </span>
      <FileUpload
        @select="onFileSelected"
        :multiple="false"
        accept="image/*"
        :maxFileSize="1000000"
      >
        <template
          #header="{ chooseCallback, uploadCallback, clearCallback, files }"
        >
          <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
            <div class="flex gap-2">
              <Button
                @click="chooseCallback()"
                icon="pi pi-images"
                rounded
                outlined
                severity="secondary"
              ></Button>
              <Button
                @click="onUpload"
                icon="pi pi-cloud-upload"
                label="upload"
                rounded
                outlined
                severity="success"
                :disabled="!files || files.length === 0"
              ></Button>
              <Button
                @click="clearCallback()"
                icon="pi pi-times"
                rounded
                outlined
                severity="danger"
                :disabled="!files || files.length === 0"
              ></Button>
            </div>
          </div>
        </template>
        <template #empty>
          <span>Drag and drop files here to upload.</span>
        </template>
      </FileUpload>
      <div v-if="uploading" class="text-center mt-3">Uploading...</div>
      <div v-if="downloadURL" class="text-center mt-3">
        <a :href="downloadURL" target="_blank" class="text-blue-500 underline">
          View uploaded receipt
        </a>
      </div>
    </div>
  </Dialog>
</template>
