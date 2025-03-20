<script setup lang="ts">
import { ref, onMounted } from "vue";
import BarChart from "./_components/bar-chart.vue";
import LineChart from "./_components/line-chart.vue";
import { useAnalyticStore } from "@/stores/analytic";
import { formatToPeso } from "@/composables/currencyFormat";
import { useAnnouncementStore } from "@/stores/announcement";
import Announcement from "./_components/announcement.vue";

const analyticStore = useAnalyticStore();
const announcementStore = useAnnouncementStore();

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

onMounted(() => {
  analyticStore.fetchTotals();
  announcementStore.fetchAnnouncements();
});
</script>

<template>
  <div
    v-if="
      !announcementStore.isLoading && announcementStore.announcement?.length > 0
    "
  >
    <Announcement :announcement="announcementStore.announcement" />
  </div>
  <div class="p-5 bg-white rounded-md flex flex-col gap-5">
    <div class="text-2xl">Welcome! Admin</div>
    <div class="text-lg">Dashboard</div>
    <div class="flex flex-col flex-wrap lg:flex-row gap-5 w-full">
      <div class="grid md:grid-cols-3 gap-5 flex-1">
        <div
          class="bg-gradient-to-r from-primary-800 to-primary-500 p-3 shadow-sm border border-primary rounded-md relative flex-1"
        >
          <div
            class="text-lg text-slate-200 dark:text-surface-0 mb-2 flex justify-between"
          >
            Total Concessionaires
            <i class="pi pi-users text-slate-300 text-3xl"></i>
          </div>
          <i
            v-if="analyticStore.isLoading"
            class="pi pi-spin pi-spinner text-primary"
            style="font-size: 1rem"
          ></i>
          <div class="text-2xl text-surface-300" v-else>
            {{ analyticStore.totals?.residents }}
          </div>
        </div>
        <div
          class="bg-gradient-to-r from-primary-800 to-primary-500 p-3 shadow-sm border border-primary rounded-md relative flex-1"
        >
          <div
            class="text-lg text-slate-200 dark:text-surface-0 mb-2 flex justify-between"
          >
            Total Income
            <i class="pi pi-money-bill text-slate-300 text-3xl"></i>
          </div>
          <i
            v-if="analyticStore.isLoading"
            class="pi pi-spin pi-spinner text-primary"
            style="font-size: 1rem"
          ></i>
          <div class="text-2xl text-surface-300" v-else>
            ₱ {{ analyticStore.totals?.totalIncome }}
          </div>
        </div>
        <div
          class="bg-gradient-to-r from-primary-800 to-primary-500 p-3 shadow-sm border border-primary rounded-md relative flex-1"
        >
          <div
            class="text-lg text-slate-200 dark:text-surface-0 mb-2 flex justify-between"
          >
            Current month Income
            <i class="pi pi-money-bill text-slate-300 text-3xl"></i>
          </div>
          <i
            v-if="analyticStore.isLoading"
            class="pi pi-spin pi-spinner text-primary"
            style="font-size: 1rem"
          ></i>
          <div class="text-2xl text-surface-300" v-else>
            ₱ {{ analyticStore.totals?.currentMonthIncome }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-10">
      <div class="p-5 bg-white rounded-md border flex-1">
        <span class="py-2 font-semibold text-lg">Reminders</span>
        <hr />
        <div class="overflow-auto">
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
      <div class="flex flex-col gap-10 flex-1">
        <div class="flex-1 shadow-sm border rounded-md p-5 bg-white">
          <BarChart :data="barData" />
        </div>
        <div class="flex-1 shadow-sm border rounded-md p-5 bg-white">
          <LineChart :data="lineData" />
        </div>
      </div>
    </div>
  </div>
</template>
