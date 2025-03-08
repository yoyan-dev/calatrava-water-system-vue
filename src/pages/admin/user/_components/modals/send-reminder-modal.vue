<script setup lang="ts">
import { ref } from "vue";
import { useReminderStore } from "@/stores/reminder";

const store = useReminderStore();
const visible = ref(false);
const reminder = ref({
  message: "",
});

function submit(payload: any) {
  store.addReminder(payload);
}
</script>
<template>
  <Button
    severity="primary"
    icons="pi pi-send"
    label="reminder"
    size="small"
    @click="visible = true"
    text
  />
  <Dialog
    v-model:visible="visible"
    modal
    header="Send Reminder"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <form @submit.prevent="submit(reminder)">
      <div>
        <Textarea
          v-model="reminder.message"
          rows="5"
          class="bg-gray-100 w-full"
          placeholder="Enter your content here..."
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
