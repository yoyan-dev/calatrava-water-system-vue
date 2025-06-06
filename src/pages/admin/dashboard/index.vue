<script setup lang="ts">
	import { onMounted } from 'vue';
	import BarChart from './_components/bar-chart.vue';
	import LineChart from './_components/line-chart.vue';
	import { useAnalyticStore } from '@/stores/analytic';
	import { formatToPeso } from '@/composables/currencyFormat';
	import { useAnnouncementStore } from '@/stores/announcement';
	import Announcement from './_components/announcement.vue';
	import Reminders from './_components/reminders.vue';
	import { formatNumberWithCommas } from '@/composables/formatNumber';
	import { useReminderStore } from '@/stores/reminder';
	import type { Line } from '@/types/line';
	import GeoTagMap from './_components/geoTagMap.vue';

	const analyticStore = useAnalyticStore();
	const announcementStore = useAnnouncementStore();
	const reminderStore = useReminderStore();

	onMounted(() => {
		analyticStore.fetchTotals();
		announcementStore.fetchAnnouncements();
		reminderStore.fetchReminders();
		analyticStore.fetchLineData();
	});
</script>

<template>
	<div class="p-5 bg-white rounded-md flex flex-col gap-5">
		<div class="text-2xl">Welcome! Admin</div>
		<div class="text-lg">Dashboard</div>
		<div class="flex flex-col flex-wrap lg:flex-row gap-5 w-full">
			<div class="grid md:grid-cols-3 gap-5 flex-1">
				<div
					class="bg-gradient-to-r from-primary-800 to-primary-500 p-3 shadow-sm border border-primary rounded-md relative flex-1">
					<div
						class="text-lg text-slate-200 dark:text-surface-0 mb-2 flex justify-between">
						Total Concessionaires
						<i class="pi pi-users text-slate-300 text-3xl"></i>
					</div>
					<i
						v-if="analyticStore.isLoading"
						class="pi pi-spin pi-spinner text-primary"
						style="font-size: 1rem"></i>
					<div
						class="text-2xl text-surface-300"
						v-else>
						{{ formatNumberWithCommas(analyticStore.totals?.residents || 0) }}
					</div>
				</div>
				<div
					class="bg-gradient-to-r from-primary-800 to-primary-500 p-3 shadow-sm border border-primary rounded-md relative flex-1">
					<div
						class="text-lg text-slate-200 dark:text-surface-0 mb-2 flex justify-between">
						Total Income
						<i class="pi pi-money-bill text-slate-300 text-3xl"></i>
					</div>
					<i
						v-if="analyticStore.isLoading"
						class="pi pi-spin pi-spinner text-primary"
						style="font-size: 1rem"></i>
					<div
						class="text-2xl text-surface-300"
						v-else>
						{{ formatToPeso(analyticStore.totals?.totalIncome || 0) }}
					</div>
				</div>
				<div
					class="bg-gradient-to-r from-primary-800 to-primary-500 p-3 shadow-sm border border-primary rounded-md relative flex-1">
					<div
						class="text-lg text-slate-200 dark:text-surface-0 mb-2 flex justify-between">
						Current month Income
						<i class="pi pi-money-bill text-slate-300 text-3xl"></i>
					</div>
					<i
						v-if="analyticStore.isLoading"
						class="pi pi-spin pi-spinner text-primary"
						style="font-size: 1rem"></i>
					<div
						class="text-2xl text-surface-300"
						v-else>
						{{ formatToPeso(analyticStore.totals?.currentMonthIncome || 0) }}
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="flex flex-wrap gap-4">
      <div class="p-5 bg-white rounded-md border flex-1">
        <span class="py-2 font-semibold text-lg">Reminders</span>
        <hr />
        <div class="overflow-auto">
          <div
            class="py-2 border-b"
            v-for="reminder in reminderStore.reminders"
            :key="reminder.uid"
          >
            <div>
              <div class="flex justify-between items-start">
                <h2 class="font-semibold capitalize">{{ reminder.name }}</h2>
                <div
                  class="px-1 text-red-600 text-sm rounded-lg bg-red-200 text-end"
                >
                  due: {{ formatDate(reminder.dueDate) }}
                </div>
              </div>
              <span class="text-sm text-gray-500">{{ reminder.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
		<div class="flex flex-wrap gap-4">
			<div
				class="flex-1 w-screen md:w-auto shadow-sm border rounded-md p-5 bg-white">
				<LineChart :data="analyticStore.lineData" />
			</div>
		</div>
		<div class="flex flex-wrap gap-4">
			<div
				class="flex-1 w-screen md:w-auto"
				v-if="
					!announcementStore.isLoading &&
					announcementStore.announcement?.length > 0
				">
				<Announcement :announcement="announcementStore.announcement" />
			</div>
			<div
				class="flex-1 w-screen md:w-auto"
				v-if="!reminderStore.isLoading && reminderStore.reminders?.length > 0">
				<Reminders :reminders="reminderStore.reminders" />
			</div>
		</div>
		<div>
			<GeoTagMap />
		</div>
	</div>
</template>
