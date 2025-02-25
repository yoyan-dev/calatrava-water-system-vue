<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const reminder = ref({
  message: "",
});

function submit() {}
</script>
<template>
  <Button
    severity="primary"
    label="Send Reminder"
    size="small"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    modal
    header="Send Reminder"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <form @submit.prevent="submit">
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
        />
      </div>
    </form>
  </Dialog>
</template>
