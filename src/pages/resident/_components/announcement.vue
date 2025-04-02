<script setup lang="ts">
import { ref } from "vue";
import type { Announcement } from "@/types/announcement";
import ViewAnnouncement from "./modals/view-modal.vue";

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
    v-if="props.announcement?.length > 1"
    :value="props.announcement"
    :numVisible="1"
    :numScroll="1"
    :responsiveOptions="responsiveOptions"
    circular
    :autoplayInterval="5000"
  >
    <template #item="slotProps">
      <ViewAnnouncement :announcement="slotProps.data" />
    </template>
  </Carousel>
  <div class="p-2" v-else>
    <div v-for="announce in props.announcement" :key="announce.uid">
      <Message>
        <div>
          <h1 class="flex items-center gap-2">
            <i class="pi pi-bell"></i> Announcement! {{ announce.type }}.
          </h1>
          <span class="font-normal">{{
            announce.content?.substring(0, 10)
          }}</span>
        </div>
      </Message>
    </div>
  </div>
</template>
