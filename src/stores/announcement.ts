import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useAnnouncementStore = defineStore("announcement", () => {
  const isLoading = ref(false);

  async function addAnnouncement(payload: any) {
    console.log(payload);
  }

  return {
    isLoading,
    addAnnouncement,
  };
});
