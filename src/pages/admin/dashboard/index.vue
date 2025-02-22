<script setup lang="ts">
import { ref, onMounted } from "vue";
import BarChart from "./_components/bar-chart.vue";
import LineChart from "./_components/line-chart.vue";
import ConcernList from "./_components/concern-list.vue";
import { useConcernStore } from "@/stores/concern";

const store = useConcernStore();
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
</script>

<template>
  <div class="p-5 bg-white rounded-md flex flex-col gap-5">
    <div class="text-lg">Dashboard</div>
    <div class="flex flex-col md:flex-row flex-wrap gap-5">
      <div class="bg-white p-5 shadow-sm border rounded-md relative flex-1">
        <div
          class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2"
        >
          Total Residents
        </div>
        <div
          class="text-4xl font-semibold text-primary-500 dark:text-primary-400"
        >
          100
        </div>
        <div class="absolute top-2 right-2">
          <i class="pi pi-users text-gray-400 text-5xl"></i>
        </div>
      </div>
      <div class="bg-white p-5 shadow-sm border rounded-md relative flex-1">
        <div
          class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2"
        >
          Total Billings
        </div>
        <div
          class="text-4xl font-semibold text-primary-500 dark:text-primary-400"
        >
          100
        </div>
        <div class="absolute top-2 right-2">
          <i class="pi pi-money-bill text-gray-400 text-5xl"></i>
        </div>
      </div>
      <div class="bg-white p-5 shadow-sm border rounded-md relative flex-1">
        <div
          class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2"
        >
          Total Payments
        </div>
        <div
          class="text-4xl font-semibold text-primary-500 dark:text-primary-400"
        >
          100
        </div>
        <div class="text-sm text-gray-400 dark:text-gray-500">
          Total amount of payments
        </div>
        <div class="absolute top-2 right-2">
          <i class="pi pi-money-bill text-gray-400 text-5xl"></i>
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
