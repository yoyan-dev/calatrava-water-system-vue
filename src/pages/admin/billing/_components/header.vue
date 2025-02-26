<script setup lang="ts">
import CreateReminderModal from "@/pages/admin/billing/_components/modals/create-reminder-modal.vue";
</script>

<template>
  <div class="flex justify-between items-end py-2">
    <div class="md:text-2xl text-xl text-surface-900 dark:text-surface-0 mb-2">
      Billings
    </div>
    <div>
      <CreateReminderModal />
    </div>
  </div>
</template>
