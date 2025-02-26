<script setup lang="ts">
import { onMounted } from "vue";
import { useConcernStore } from "@/stores/concern";

const store = useConcernStore();

onMounted(async () => {
  await store.fetchConcerns();
  console.log(store.concerns[0].concern.name);
});
</script>
<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 mx-5 p-4 py-6 md:p-6 border rounded-lg"
  >
    <div class="py-2 border-b text-xl">List of Concerns</div>
    <div v-if="!store.isLoading" class="overflow-auto">
      <div
        class="p-2 border-b"
        v-for="concern in store.concerns"
        :key="concern.uid"
      >
        <div>
          <div class="flex items-start space-x-4">
            <div
              class="w-10 h-10 min-w-10 min-h-10 bg-primary text-white rounded-full flex items-center justify-center"
            >
              <span class="text-lg font-bold">{{
                concern.concern.name?.charAt(0).toUpperCase()
              }}</span>
            </div>
            <div class="flex-1">
              <div class="flex justify-between w-full">
                <h2 class="text-lg font-semibold capitalize">
                  {{ concern.concern.name }}
                </h2>
                <span
                  class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
                  >Resident</span
                >
              </div>
              <p class="text-sm text-gray-500">
                {{ concern.concern.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-96 flex justify-center items-center" v-else>
      <i class="pi pi-spin pi-spinner text-primary" style="font-size: 2rem"></i>
    </div>
  </div>
</template>
