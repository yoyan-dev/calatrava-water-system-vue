<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAnnouncementStore } from "@/stores/announcement";
import ResidentLayout from "@/layouts/resident-layout.vue";
import { RouterView } from "vue-router";
import { Toast } from "primevue";
import Announcement from "./_components/announcement.vue";
import { isTargetDate } from "@/composables/targetDate";

const store = useAnnouncementStore();

onMounted(async () => {
  await store.fetchAnnouncements();
});

const filteredAnnouncement = computed(() => {
  return store.announcement?.filter((announce: any) => {
    return isTargetDate(announce.dueDate) && announce.dueDate;
  });
});
</script>

<template>
  <ResidentLayout>
    <div class="bg-gray-50 h-screen">
      <Toast position="bottom-right" />
      <div v-if="filteredAnnouncement?.length > 0" class="pt-2">
        <Announcement :announcement="filteredAnnouncement" />
      </div>
      <RouterView />
    </div>
  </ResidentLayout>
</template>
