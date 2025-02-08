
<template>
    <Button
        icon="pi pi-wallet"
        severity="secondary"
        label="view reciept"
        size="small"
        @click="visible = true"
        text />
    <Dialog v-model:visible="visible"  modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p class="m-0">
            Reciept here
        </p>
    </Dialog>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>
