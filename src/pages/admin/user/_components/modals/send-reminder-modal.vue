<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { useReminderStore } from "@/stores/reminder";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const store = useReminderStore();
const dialogRef = inject<any>("dialogRef");
const data = ref();

onMounted(() => {
  data.value = dialogRef.value.data;
});

const reminder = ref({
  message: "",
});

function submit(payload: any) {
  store.addReminder(payload);
}
</script>
<template>
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
</template>
