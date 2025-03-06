<script setup lang="ts">
import { onMounted } from "vue";
import { useConcernStore } from "@/stores/concern";
import { format } from "date-fns";

const formatDate = (timestamp: any) => {
  if (timestamp && timestamp.toDate) {
    return format(timestamp.toDate(), "MMMM d, yyyy hh:mm a");
  }
  return "";
};

const store = useConcernStore();

onMounted(async () => {
  await store.fetchConcerns();
  console.log(store.concerns[0]);
});
</script>
<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 mx-5 p-4 py-6 md:p-6 border rounded-lg"
  >
    <div class="flex justify-between items-center border-b py-2">
      <div class="py-2 text-xl">List of Concerns</div>
      <Select
        :options="['Area 1', 'Area 2', 'Area 3']"
        placeholder="Select Area"
        checkmark
        :highlightOnSelect="false"
        class="w-full md:w-56"
      />
    </div>
    <div v-if="!store.isLoading" class="overflow-auto max-h-screen">
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
                concern.name?.charAt(0).toUpperCase()
              }}</span>
            </div>
            <div class="flex-1">
              <div class="flex justify-between w-full items-start">
                <div>
                  <h2 class="text-lg font-semibold capitalize">
                    {{ concern.name }}
                  </h2>
                </div>
                <span
                  class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded capitalize"
                  >{{ concern.area }}</span
                >
              </div>
              <p class="text-sm text-gray-500">
                {{ concern.content }}
              </p>
              <div class="text-end text-sm text-gray-400">
                <span> {{ formatDate(concern.createdAt) }}</span>
              </div>
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
