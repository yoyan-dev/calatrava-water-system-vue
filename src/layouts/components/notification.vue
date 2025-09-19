<script setup>
import { ref, onMounted } from "vue";
import { useNotificationStore } from "@/stores/notification";
import { formatDateTimestamp } from "@/composables/formatDate";
import Badge from "primevue/badge";
import Button from "primevue/button";
import Popover from "primevue/popover";
import Avatar from "primevue/avatar";
import Listbox from "primevue/listbox";
import ProgressSpinner from "primevue/progressspinner";
import Tag from "primevue/tag";

const store = useNotificationStore();
const op = ref();

onMounted(() => {
  store.fetchNotifications();
});

const toggle = (event) => {
  op.value.toggle(event);
  if (store.totalNotification > 0 && !store.isLoading) {
    store.totalNotification = 0;
    store.markAsAllRead();
  }
};
</script>

<template>
  <div class="relative">
    <Badge
      v-if="store.totalNotification > 0"
      :value="store.totalNotification"
      severity="danger"
      size="small"
      class="absolute -top-1 -right-1"
    >
      <Button
        icon="pi pi-bell"
        text
        rounded
        severity="secondary"
        class="p-2"
        @click="toggle"
      />
    </Badge>
    <Button
      v-else
      icon="pi pi-bell"
      text
      rounded
      severity="secondary"
      class="p-2"
      @click="toggle"
    />

    <Popover ref="op" class="w-90">
      <div>
        <div class="flex items-center justify-between">
          <span class="font-semibold text-lg">Notifications</span>
          <Button
            label="Clear All"
            text
            size="small"
            severity="secondary"
            @click="store.markAsAllRead"
            :disabled="store.notifications.length === 0"
          />
        </div>

        <ProgressSpinner
          v-if="store.isLoading"
          style="width: 24px; height: 24px"
          strokeWidth="4"
          class="mx-auto block"
        />

        <div
          v-else-if="store.notifications.length === 0"
          class="text-sm text-gray-500 text-center"
        >
          No notifications found.
        </div>

        <Listbox
          v-else
          :options="store.notifications"
          option-label="name"
          class="w-full border-0 max-h-96"
          list-style="overflow-y: auto;"
        >
          <template #option="slotProps">
            <div
              class="flex items-center gap-2 rounded-lg"
              :class="{ 'bg-blue-50': !slotProps.option.isRead }"
            >
              <Avatar icon="pi pi-user" size="medium" class="mr-2" />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="font-medium capitalize">
                    {{ slotProps.option.name ?? "No name" }}
                  </span>
                  <Tag
                    :value="slotProps.option.isRead ? 'Read' : 'Unread'"
                    :severity="slotProps.option.isRead ? 'success' : 'info'"
                    class="text-xs"
                  />
                </div>
                <div class="text-sm text-gray-500">
                  {{ slotProps.option.content ? "Sent concern on" : "Sent receipt on" }}
                  {{ formatDateTimestamp(slotProps.option.createdAt) }}
                </div>
              </div>
            </div>
          </template>
        </Listbox>
      </div>
    </Popover>
  </div>
</template>

<style scoped>
:deep(.p-listbox .p-listbox-list) {
  padding: 0;
  border: none;
}
:deep(.p-listbox .p-listbox-item) {
  padding: 0;
}
</style>