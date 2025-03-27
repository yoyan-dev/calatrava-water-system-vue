<script setup lang="ts">
import { ref } from "vue";
import type { Reminder } from "@/types/reminder";
import ViewReminder from "@/pages/admin/dashboard/_components/modals/view-reminder-modal.vue";

const props = defineProps<{ reminders: Reminder[] }>();
</script>
<template>
  <div class="p-4 border rounded-lg">
    <span class="text-lg font-semibold">Reminders</span>
    <div class="max-h-96 overflow-auto">
      <div
        v-for="reminder in props.reminders"
        :key="reminder.uid"
        class="flex items-start gap-2 bg-orange-100 p-4 rounded-lg my-2"
      >
        <OverlayBadge severity="danger"> </OverlayBadge>
        <div class="flex justify-between items-center flex-1">
          <div>
            <span class="text-sm text-gray-500">{{ reminder.dueDate }}</span>
            <div class="font-semibold capitalize">{{ reminder.name }}</div>
          </div>
          <ViewReminder :reminder="reminder" />
        </div>
      </div>
    </div>
  </div>
</template>
