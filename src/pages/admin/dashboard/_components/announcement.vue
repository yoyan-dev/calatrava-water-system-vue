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
    :value="props.announcement"
    :numVisible="1"
    :numScroll="1"
    :responsiveOptions="responsiveOptions"
    circular
    :autoplayInterval="5000"
  >
    <template #item="slotProps">
      <Message>
        <div>
          <h1 class="flex items-center gap-2">
            <i class="pi pi-bell"></i> Announcement! {{ slotProps.data.type }}.
          </h1>
          <span class="font-normal">{{ slotProps.data.content }}</span>
        </div>
      </Message>
    </template>
  </Carousel>
</template>
