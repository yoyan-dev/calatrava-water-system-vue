import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useReminderStore = defineStore("reminder", () => {
  const isLoading = ref(false);

  async function addReminder(payload: any) {
    console.log(payload);
  }

  return {
    isLoading,
    addReminder,
  };
});
