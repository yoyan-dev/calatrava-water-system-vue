<script setup lang="ts">
import { ref } from "vue";
import { useAnnouncementStore } from "@/stores/announcement";

const store = useAnnouncementStore();
const visible = ref(false);
const announcement = ref({
  message: "",
});

function submit(payload: any) {
  store.addAnnouncement(payload);
}
</script>
<template>
  <Button
    severity="primary"
    icon="pi pi-send"
    label="Announcement"
    size="small"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    modal
    header="Create Announcement"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <form @submit.prevent="submit(announcement)">
      <div>
        <Textarea
          v-model="announcement.message"
          rows="5"
          class="bg-gray-100 w-full"
          placeholder="Enter your message here..."
        />
      </div>
      <div class="flex justify-end mt-2">
        <Button
          label="Send"
          severity="primary"
          icon="pi pi-send"
          iconPos="right"
          type="submit"
          :loading="store.isLoading"
        />
      </div>
    </form>
  </Dialog>
</template>
