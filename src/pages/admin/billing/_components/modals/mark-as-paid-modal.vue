<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
const dialogRef = inject<any>("dialogRef");

const data = ref();

onMounted(() => {
  data.value = dialogRef.value.data.user;
  console.log(data.value);
});

function onClose() {
  dialogRef.value.close();
}
</script>
<template>
  <div v-if="data">
    <div v-if="data.paymentReceipt">
      <div class="card flex justify-center">
        <Image :src="data.paymentReceipt" alt="Image" width="250" preview />
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <Button label="Yes" />
      <Button label="Cancel" @click="onClose" severity="danger" />
    </div>
  </div>
</template>
