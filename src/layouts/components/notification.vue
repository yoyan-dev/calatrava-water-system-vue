<template>
  <div class="card flex justify-center">
    <OverlayBadge
      @click="toggle"
      :value="
        notifications.filter((notification) => notification.unread).length
      "
      :severity="hasUnread ? 'danger' : ''"
      size="small"
      class="cursor-pointer"
    >
      <i class="pi pi-bell text-lg" />
    </OverlayBadge>
    <Popover ref="op">
      <div class="flex flex-col gap-4 min-w-64">
        <div>
          <span class="font-medium block mb-2">Notifications</span>
          <ul class="list-none p-0 m-0 flex flex-col max-h-96 overflow-y-auto">
            <li
              v-for="notification in notifications"
              :key="notification.name"
              class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
              :class="notification.unread ? 'bg-emphasis' : ''"
            >
              <i class="pi pi-receipt p-2 bg-gray-100 rounded-md"></i>
              <div>
                <span class="font-medium">{{ notification.name }}</span>
                <div class="text-sm text-surface-500 dark:text-surface-400">
                  send receipt
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const op = ref();
const notifications = ref([
  {
    name: "Amy Elsner",
    unread: true,
  },
  {
    name: "Bernardo Dominic",
    unread: false,
  },
  {
    name: "Ioni Bowcher",
    unread: false,
  },
]);

const hasUnread = computed(() => {
  return notifications.value.some((notification) => notification.unread);
});

const toggle = (event) => {
  op.value.toggle(event);
  readTheUnread();
};

function readTheUnread() {
  notifications.value.forEach((notification) => {
    notification.unread = false;
  });
}
</script>
