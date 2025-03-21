<script setup lang="ts">
import { ref, inject, onMounted, reactive } from "vue";
import { useReminderStore } from "@/stores/reminder";
import { useToast } from "primevue/usetoast";
import type { Reminder } from "@/types/reminder";

const toast = useToast();
const store = useReminderStore();
const dialogRef = inject<any>("dialogRef");
const data = ref();

const reminder = reactive<Reminder>({});

onMounted(() => {
  data.value = dialogRef.value.data.user;
  reminder.residentUid = data.value.uid;
  reminder.name = data.value.fullname;
});

onMounted(async () => {
  await store.fetchReminders(data.value.uid);
  console.log(store.reminders);
});

async function submit(payload: any) {
  const res = await store.addReminder(payload);
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  });
}
</script>
<template>
  <form @submit.prevent="submit(reminder)">
    <div class="capitalize">Send to: {{ data?.fullname }}</div>
    <div class="flex flex-col gap-3">
      <div class="flex-auto">
        <label for="date" class="font-bold block mb-2"> Due Date </label>
        <DatePicker
          id="date"
          v-model="reminder.dueDate"
          showIcon
          fluid
          :showOnFocus="false"
        />
      </div>
      <div>
        <Textarea
          v-model="reminder.content"
          rows="5"
          class="bg-gray-100 w-full"
          placeholder="Enter your content here..."
        />
      </div>
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
</template>
