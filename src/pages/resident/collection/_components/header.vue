<script setup lang="ts">
const props = defineProps<{
  totalCollections: number;
}>();
</script>
<template>
  <div class="flex justify-between mb-2">
    <div>
      <div
        class="text-xl md:text-3xl text-surface-900 dark:text-surface-0 mb-2"
      >
        Your Payment Collection
      </div>
    </div>
    <div>
      <div class="text-sm px-3 py-2 text-slate-600 bg-gray-50 rounded-full">
        {{ totalCollections }} payments
      </div>
    </div>
  </div>
</template>
