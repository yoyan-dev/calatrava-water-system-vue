<script setup lang="ts">
import { computed, ref } from "vue";
import { onMounted } from "vue";
import { useConcernStore } from "@/stores/concern";
import { format } from "date-fns";
import { useToast } from "primevue/usetoast";

const formatDate = (timestamp: any) => {
  if (timestamp && timestamp.toDate) {
    return format(timestamp.toDate(), "MMMM d, yyyy hh:mm a");
  }
  return "";
};

const areas = ref<any>([]);
const store = useConcernStore();
const selectedArea = ref();
const toast = useToast();
const status = ref("pending");
const statusOptions = ref([
  { label: "Pending", value: "pending" },
  { label: "Resolved", value: "resolved" },
]);

onMounted(async () => {
  await store.fetchConcerns();
  store.concerns.map((item: any) => {
    const findItem = areas.value.find((row: any) => row === item.area);
    if (findItem) return;
    areas.value.push(item.area);
  });
});

const filteredConcern = computed(() => {
  if (!selectedArea.value)
    return store.concerns.filter(
      (item: any) =>
        item.status === status.value ||
        (!item.status && status.value === "pending")
    );
  return store.concerns.filter(
    (item: any) =>
      item.area === selectedArea.value &&
      (item.status === status.value ||
        (!item.status && status.value === "pending"))
  );
});

async function markAsResolved(concern: any) {
  const response = await store.updateConcern(concern.uid, {
    ...concern,
    status: "resolved",
  });
  toast.add({
    severity: response.status,
    summary: response.statusMessage,
    detail: response.message,
    life: 3000,
  });
}
</script>

<template>
  <div
    class="flex flex-col gap-4 p-4 md:p-6"
  >
    <!-- Header Section -->
    <div class="flex justify-between items-center flex-wrap gap-4">
      <h1 class="text-xl font-semibold text-surface-900 dark:text-surface-50">
        Concerns
      </h1>
      <div v-if="selectedArea" class="flex items-center gap-2">
        <span
          class="capitalize bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 rounded-lg px-3 py-1"
        >
          {{ selectedArea }}
        </span>
        <span class="text-surface-600 dark:text-surface-300">
          has {{ filteredConcern.length }}
          {{ filteredConcern.length === 1 ? "concern" : "concerns" }}
        </span>
      </div>
    </div>

    <!-- Filter Section -->
    <div
      class="flex items-center justify-between flex-wrap gap-4 border-b border-surface-200 dark:border-surface-700 pb-4"
    >
      <div class="flex items-center gap-2">
        <Select
          v-model="status"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select Status"
          class="w-full mr-2 md:w-40"
          :highlightOnSelect="false"
          checkmark
          size="small"
        />
        <Badge :value="filteredConcern.length" severity="primary" />
      </div>
      <Select
        :options="areas"
        placeholder="Select Area"
        checkmark
        size="small"
        v-model="selectedArea"
        :highlightOnSelect="false"
        class="w-full md:w-56"
        showClear
      />
    </div>

    <!-- Concerns List -->
    <!-- Concerns List -->
    <div v-if="!store.isLoading" class="flex flex-col gap-4">
      <div
        v-if="filteredConcern.length === 0"
        class="text-center text-surface-600 dark:text-surface-400 py-8 bg-surface-0 dark:bg-surface-950 rounded-lg shadow-sm"
      >
        No concerns found.
      </div>
      <div v-else class="flex flex-col gap-4">
        <div v-for="concern in filteredConcern" :key="concern.uid">
          <div
            class="p-4 rounded-xl bg-white dark:bg-surface-800 shadow-md border transition-all duration-200 hover:shadow-lg"
            :class="{
              'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20 opacity-80':
                concern.status === 'resolved',
              'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800':
                !concern.status || concern.status === 'pending',
            }"
          >
            <div class="flex flex-col gap-4">
              <!-- Header: Name and Area -->
              <div class="flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center"
                  >
                    <span class="text-xl font-bold">{{
                      concern.name?.charAt(0).toUpperCase()
                    }}</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <h3
                      class="text-lg font-semibold capitalize text-surface-900 dark:text-surface-50"
                    >
                      {{ concern.name }}
                    </h3>
                    <div class="flex items-center gap-2">
                      <span
                        class="text-blue-600 dark:text-blue-400 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-xs font-medium rounded-full capitalize"
                      >
                        {{ concern.area }}
                      </span>
                      <span
                        class="text-gray-500 dark:text-gray-400 text-xs font-medium"
                      >
                        Account: {{ concern.accountNumber }}
                      </span>
                    </div>
                  </div>
                </div>
                <!-- Status Badge -->
                <Badge
                  :value="concern.status || 'pending'"
                  :severity="
                    concern.status === 'resolved' ? 'success' : 'warning'
                  "
                  class="capitalize"
                />
              </div>

              <!-- Content and Action -->
              <div class="flex flex-col md:flex-row gap-4 items-start">
                <div class="flex-1 rounded-lg p-4">
                  <p class="text-sm text-surface-600 dark:text-surface-300">
                    {{ concern.content }}
                  </p>
                </div>
                <Button
                  v-if="concern.status === 'pending' || !concern.status"
                  severity="success"
                  size="small"
                  outlined
                  @click="markAsResolved(concern)"
                  label="Mark as Resolved"
                  class="hover:bg-green-100 dark:hover:bg-green-900/50 min-w-[120px]"
                />
              </div>

              <!-- Footer: Created At -->
              <div
                class="text-end text-xs text-surface-500 dark:text-surface-400"
              >
                {{ formatDate(concern.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="h-96 flex justify-center items-center">
      <i
        class="pi pi-spin pi-spinner text-primary-500"
        style="font-size: 2rem"
      ></i>
    </div>
  </div>
</template>
