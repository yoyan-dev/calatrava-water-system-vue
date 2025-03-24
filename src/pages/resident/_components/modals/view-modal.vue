<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Announcement } from "@/types/announcement";
import { formatDate } from "@/composables/formatDate";

const visible = ref(false);

const props = defineProps<{ announcement: Announcement }>();
function truncateText(text: any, limit = 160) {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}
</script>

<template>
  <Button @click="visible = true" text fluid>
    <div class="flex items-center w-full h-full">
      <Message class="flex-1">
        <div>
          <h1 class="flex items-center gap-2">
            <i class="pi pi-bell"></i> Announcement! {{ announcement.type }}.
          </h1>
          <span class="font-normal">{{
            truncateText(announcement.content)
          }}</span>
        </div>
      </Message>
    </div>
  </Button>
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
    </div>
  </Dialog>
</template>
