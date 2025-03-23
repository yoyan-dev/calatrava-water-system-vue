<script setup lang="ts">
import { ref } from "vue";
import type { Reminder } from "@/types/reminder";

const props = defineProps<{ reminders: Reminder[] }>();

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
  <Carousel
    v-if="props.reminders.length > 1"
    :value="props.reminders"
    :numVisible="1"
    :numScroll="1"
    :responsiveOptions="responsiveOptions"
    circular
    :autoplayInterval="5000"
  >
    <template #item="slotProps">
      <div class="flex items-center w-full h-full">
        <Message class="flex-1" severity="warn">
          <div>
            <h1 class="flex items-center gap-2 capitalize">
              <i class="pi pi-bell"></i> Reminder! {{ slotProps.data.name }}.
            </h1>
            <span class="font-normal">{{ slotProps.data.content }}</span>
          </div>
        </Message>
      </div>
    </template>
  </Carousel>
  <div class="p-2" v-else>
    <Message
      v-for="reminder in props.reminders"
      :key="reminder.uid"
      severity="warn"
    >
      <div>
        <h1 class="flex items-center gap-2 capitalize">
          <i class="pi pi-bell"></i> Reminder! {{ reminder.name }}.
        </h1>
        <span class="font-normal">{{ reminder.content }}</span>
      </div>
    </Message>
  </div>
</template>
