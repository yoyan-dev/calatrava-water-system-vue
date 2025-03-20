<script setup lang="ts">
import { onMounted } from "vue";
import { useAnnouncementStore } from "@/stores/announcement";
import ResidentLayout from "@/layouts/resident-layout.vue";
import { RouterView } from "vue-router";
import { Toast } from "primevue";
import Announcement from "./_components/announcement.vue";

const store = useAnnouncementStore();

onMounted(() => {
  store.fetchAnnouncements();
});
</script>

<template>
  <ResidentLayout>
    <div class="bg-gray-50 h-screen">
      <Toast position="bottom-right" />
      <div
        v-if="!store.isLoading && store.announcement?.length > 0"
        class="pt-2"
      >
        <Announcement :announcement="store.announcement" />
      </div>
      <RouterView />
    </div>
  </ResidentLayout>
</template>
