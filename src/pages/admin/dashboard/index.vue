<script setup lang="ts">
import { ref, onMounted } from "vue";
import BarChart from "./_components/bar-chart.vue";
import LineChart from "./_components/line-chart.vue";
import { useFetch } from "@vueuse/core";

const barData = [
  { x: 1, y: 10, y1: 20, y2: 30 },
  { x: 2, y: 20, y1: 30, y2: 40 },
  { x: 3, y: 30, y1: 40, y2: 50 },
  { x: 4, y: 40, y1: 50, y2: 60 },
  { x: 5, y: 50, y1: 60, y2: 70 },
];

const lineData = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];

const totals = ref();
const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  const { data: response } = await useFetch(
    `${import.meta.env.VITE_API_URL}/api/analytics/total`,
    {
      method: "GET",
    }
  ).json();
  totals.value = response.value?.data;
  console.log(totals.value);
  isLoading.value = false;
});
</script>

<template>
  <div class="p-5 bg-white rounded-md flex flex-col gap-5">
    <div class="text-2xl">Welcome! Admin</div>
    <div class="text-lg">Dashboard</div>
    <div class="flex flex-col flex-wrap lg:flex-row gap-5 w-full">
      <div class="grid md:grid-cols-2 gap-5 flex-1">
        <div
          class="bg-white p-5 shadow-sm border border-primary rounded-md relative flex-1"
        >
          <div
            class="text-lg text-surface-900 dark:text-surface-0 mb-2 flex justify-between"
          >
            Total Concessionaires
            <i class="pi pi-users text-primary text-3xl"></i>
          </div>
          <div
            class="text-2xl font-semibold text-surface-600 dark:text-primary-400"
          >
            {{ totals?.residents }}
          </div>
        </div>
        <div
          class="bg-white p-5 shadow-sm border border-primary rounded-md relative flex-1"
        >
          <div
            class="text-lg text-surface-900 dark:text-surface-0 mb-2 flex justify-between"
          >
            Total Income
            <i class="pi pi-money-bill text-primary text-3xl"></i>
          </div>
          <div
            class="text-2xl font-semibold text-surface-600 dark:text-primary-400"
          >
            {{ totals?.bills }}
          </div>
        </div>
        <div
          class="bg-white p-5 shadow-sm border border-primary rounded-md relative flex-1"
        >
          <div
            class="text-lg text-surface-900 dark:text-surface-0 mb-2 flex justify-between"
          >
            Pending Payments
            <i class="pi pi-money-bill text-primary text-3xl"></i>
          </div>
          <div
            class="text-2xl font-semibold text-surface-600 dark:text-primary-400"
          >
            100
          </div>
          <div class="text-sm text-gray-400 dark:text-gray-500">
            Total amount of pending payments
          </div>
        </div>
      </div>
      <div class="p-5 bg-white rounded-md border flex-1">
        <span class="py-2 font-semibold text-lg">Reminders</span>
        <hr />
        <div class="max-h-56 overflow-auto">
          <div class="flex justify-between items-center py-2 border-b">
            <div>
              <h2 class="font-semibold">Nenwell Era Due date</h2>
              <span>March 1 - 5, 2025</span>
            </div>
            <Tag value="upcomming" severity="warn" />
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <div>
              <h2 class="font-semibold">Nenwell Era Due date</h2>
              <span>March 1 - 5, 2025</span>
            </div>
            <Tag value="upcomming" severity="warn" />
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <div>
              <h2 class="font-semibold">Nenwell Era Due date</h2>
              <span>March 1 - 5, 2025</span>
            </div>
            <Tag value="upcomming" severity="warn" />
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <div>
              <h2 class="font-semibold">Nenwell Era Due date</h2>
              <span>March 1 - 5, 2025</span>
            </div>
            <Tag value="upcomming" severity="warn" />
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <div>
              <h2 class="font-semibold">Nenwell Era Due date</h2>
              <span>March 1 - 5, 2025</span>
            </div>
            <Tag value="upcomming" severity="warn" />
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <div>
              <h2 class="font-semibold">Nenwell Era Due date</h2>
              <span>March 1 - 5, 2025</span>
            </div>
            <Tag value="upcomming" severity="warn" />
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <div>
              <h2 class="font-semibold">Nenwell Era Due date</h2>
              <span>March 1 - 5, 2025</span>
            </div>
            <Tag value="upcomming" severity="warn" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-10">
      <div class="flex-1 shadow-sm border rounded-md p-5 bg-white">
        <BarChart :data="barData" />
      </div>
      <div class="flex-1 shadow-sm border rounded-md p-5 bg-white">
        <LineChart :data="lineData" />
      </div>
    </div>
  </div>
</template>
