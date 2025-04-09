<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
const dialogRef = inject<any>("dialogRef");

const data = ref();

onMounted(() => {
  data.value = dialogRef.value.data.user;
  console.log(data.value);
});
</script>
<template>
  <div v-if="data">
    <p class="m-0" v-if="!data.paymentReceipt">no reciept</p>
    <div class="card flex justify-center" v-else>
      <Image :src="data.paymentReceipt" alt="Image" width="250" preview />
    </div>
  </div>
</template>
