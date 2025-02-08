
<template>
    <Button
        icon="pi pi-money-bill"
        severity="primary"
        label="Pay Bill"
        size="small"
        @click="visible = true" />
    <Dialog v-model:visible="visible"  modal header="Pay Bill"  :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p class="m-0">
            Pay
        </p>
    </Dialog>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>
