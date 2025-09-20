<script setup lang="ts">
const props = defineProps<{
  totalResident: number;
}>();
</script>
<template>
  <div class="flex items-center  gap-4 mb-4">
    <div class="text-xl">
      Residents
    </div>
    <div class="text-xl text-primary font-semibold">
      {{ totalResident }}
    </div>
  </div>
</template>
