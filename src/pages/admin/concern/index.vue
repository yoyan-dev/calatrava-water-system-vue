<script setup lang="ts">
import { computed, ref } from "vue";
import { onMounted } from "vue";
import { useConcernStore } from "@/stores/concern";
import { format } from "date-fns";

const formatDate = (timestamp: any) => {
  if (timestamp && timestamp.toDate) {
    return format(timestamp.toDate(), "MMMM d, yyyy hh:mm a");
  }
  return "";
};

const areas = ref([]);
const store = useConcernStore();
const selectedArea = ref();

onMounted(async () => {
  await store.fetchConcerns();
  store.concerns.map((item: any) => {
    const findItem = areas.value.find((row) => row === item.area);
    if (findItem) return;
    areas.value.push(item.area);
  });
});

const filteredConcern = computed(() => {
  if (!selectedArea.value) return store.concerns;
  return store.concerns.filter((item: any) => item.area === selectedArea.value);
});
</script>
<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg"
  >
    <div class="flex justify-between flex-wrap items-center py-2">
      <div class="py-2 text-xl">List of Concerns</div>
      <div v-if="selectedArea">
        <span class="capitalize bg-primary-200 rounded-lg px-2">{{
          selectedArea
        }}</span>
        has
        {{
          filteredConcern.length > 1
            ? `${filteredConcern.length} concerns`
            : `${filteredConcern.length} concern`
        }}
      </div>
      <Select
        :options="areas"
        placeholder="Select Area"
        checkmark
        v-model="selectedArea"
        :highlightOnSelect="false"
        class="w-full md:w-56"
        showClear
      />
    </div>
    <div class="border-b pb-2">
      Total concerns: {{ filteredConcern.length }}
    </div>
    <div v-if="!store.isLoading">
      <div v-if="filteredConcern.length === 0">No concern found.</div>
      <div v-else class="overflow-auto max-h-screen">
        <div
          class="p-2 border-b"
          v-for="concern in filteredConcern"
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
    </div>
    <div class="h-96 flex justify-center items-center" v-else>
      <i class="pi pi-spin pi-spinner text-primary" style="font-size: 2rem"></i>
    </div>
  </div>
</template>
