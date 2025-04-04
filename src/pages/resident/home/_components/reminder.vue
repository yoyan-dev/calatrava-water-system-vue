<script setup lang="ts">
import type { Reminder } from "@/types/reminder";
import { ref } from "vue";

const props = defineProps<{ reminder: Reminder[] }>();
const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>
<template>
  <div class="p-2">
    <Message
      severity="warn"
      v-for="reminder in props.reminder"
      :key="reminder.uid"
    >
      <div>
        <h1 class="flex items-center gap-2">
          <i class="pi pi-bell"></i> Reminder!.
        </h1>
        <span class="font-normal">{{ reminder.content }}</span>
      </div>
    </Message>
  </div>
</template>
