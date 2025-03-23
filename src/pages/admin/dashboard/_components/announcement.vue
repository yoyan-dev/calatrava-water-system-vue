<script setup lang="ts">
import { ref } from "vue";
import type { Announcement } from "@/types/announcement";

const props = defineProps<{ announcement: Announcement[] }>();

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
    v-if="props.announcement.length > 1"
    :value="props.announcement"
    :numVisible="1"
    :numScroll="1"
    :responsiveOptions="responsiveOptions"
    circular
    :autoplayInterval="5000"
  >
    <template #item="slotProps">
      <div class="flex items-center w-full h-full">
        <Message class="flex-1">
          <div>
            <h1 class="flex items-center gap-2">
              <i class="pi pi-bell"></i> Announcement!
              {{ slotProps.data.type }}.
            </h1>
            <span class="font-normal">{{ slotProps.data.content }}</span>
          </div>
        </Message>
      </div>
    </template>
  </Carousel>
  <div class="p-2" v-else>
    <Message v-for="announce in props.announcement" :key="announce.uid">
      <div>
        <h1 class="flex items-center gap-2">
          <i class="pi pi-bell"></i> Announcement! {{ announce.type }}.
        </h1>
        <span class="font-normal">{{ announce.content }}</span>
      </div>
    </Message>
  </div>
</template>
