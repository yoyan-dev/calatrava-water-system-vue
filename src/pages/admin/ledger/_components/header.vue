<script setup lang="ts">
const props = defineProps<{
  totalLedgers: number;
}>();
</script>
<template>
  <div class="flex justify-between items-center gap-4 mb-4">
    <div class="text-xl">Ledger</div>
    <div>
      <span class="mr-2">Records:</span>
      <span class="text-primary font-semibold">{{ totalLedgers }}</span>
    </div>
  </div>
</template>