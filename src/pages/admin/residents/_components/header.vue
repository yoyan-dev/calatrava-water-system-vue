<script setup lang="ts">
const props = defineProps<{
  totalResident: number;
}>();
</script>
<template>
  <div class="flex justify-between items-center gap-4 mb-4">
    <div class="text-xl">Residents</div>
    <div>
      <span class="mr-2">Records:</span>
      <span class="text-primary font-semibold">{{ totalResident }}</span>
    </div>
  </div>
</template>
