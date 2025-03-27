<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Announcement } from "@/types/announcement";
import { formatDate } from "@/composables/formatDate";

const visible = ref(false);

const props = defineProps<{ announcement: Announcement }>();
</script>

<template>
  <Button icon="pi pi-angle-right" size="small" @click="visible = true" text />
  <Dialog
    v-model:visible="visible"
    header="Announcement"
    modal
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div
      class="flex flex-col gap-4 md:min-w-96 text-sm bg-primary-100 p-4 rounded-lg"
    >
      <div>
        <span class="capitalize font-semibold text-lg">{{
          announcement.type
        }}</span>
      </div>
      <div>
        <span class="text-gray- text-sm">Content:</span>
        <div>
          <span class="text-dark">{{ announcement.content }}</span>
        </div>
      </div>
      <div class="text-end">
        Expiration date: {{ formatDate(announcement.dueDate) }}
      </div>
    </div>
  </Dialog>
</template>
