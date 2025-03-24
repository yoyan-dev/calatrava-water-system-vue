<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Reminder } from "@/types/reminder";
import { formatDate } from "@/composables/formatDate";

const visible = ref(false);

const props = defineProps<{ reminder: Reminder }>();
</script>

<template>
  <Button
    icon="pi pi-angle-right"
    size="small"
    @click="visible = true"
    text
    color="orange"
  />
  <Dialog
    v-model:visible="visible"
    header="Reminder"
    modal
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div
      class="flex flex-col gap-4 md:min-w-96 text-sm bg-orange-100 p-4 rounded-lg"
    >
      <div>
        <span class="capitalize font-semibold text-lg">{{
          reminder.name
        }}</span>
      </div>
      <div>
        <span class="text-gray- text-sm">Content:</span>
        <div>
          <span class="text-dark">{{ reminder.content }}</span>
        </div>
      </div>
      <div class="text-end">
        Expiration date: {{ formatDate(reminder.dueDate) }}
      </div>
    </div>
  </Dialog>
</template>
