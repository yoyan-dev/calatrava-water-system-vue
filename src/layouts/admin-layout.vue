<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { useAdminStore } from "@/stores/admin";
import type { Admin } from "@/types/admin";
import Notification from "./components/notification.vue";
import ThemeToggle from "./components/theme-toggle.vue";
import Button from "primevue/button";
import Drawer from "primevue/drawer";
import Avatar from "primevue/avatar";
import Menu from "primevue/menu";

const route = useRoute();
const router = useRouter();
const visible = ref(false);
const auth = useFirebaseAuth()!;
const store = useAdminStore();

const items = ref([
  {
    label: "Dashboard",
    name: "admin-dashboard",
    icon: "pi pi-chart-bar",
    route: "/admin/dashboard",
  },
  {
    label: "Users",
    name: "admin-users",
    icon: "pi pi-user",
    route: "/admin/users",
  },
  {
    label: "Billings",
    name: "admin-billings",
    icon: "pi pi-book",
    route: "/admin/billings",
  },
  {
    label: "Collection",
    name: "admin-collection",
    icon: "pi pi-money-bill",
    route: "/admin/collection",
  },
  {
    label: "Ledger",
    name: "admin-ledger",
    icon: "pi pi-credit-card",
    route: "/admin/ledger",
  },
  {
    label: "Concerns",
    name: "admin-concerns",
    icon: "pi pi-inbox",
    route: "/admin/concerns",
  },
  {
    label: "FAQs",
    name: "admin-faq",
    icon: "pi pi-question-circle",
    route: "/admin/faq",
  },
  {
    label: "Setting",
    name: "admin-setting",
    icon: "pi pi-cog",
    route: "/admin/setting",
  },
]);

const admin = ref<Admin>(store.admin);

const logoutUser = async () => {
  try {
    await signOut(auth);
    router.push("/auth/admin");
    console.log("User logged out successfully");
  } catch (err) {
    console.error("Error logging out:", err);
  }
};
</script>

<template>
  <main class="flex h-screen w-full text-surface-600 dark:text-surface-200">
    <div class="w-full flex flex-col gap-4">
      <nav class="border-b border-surface-200 dark:border-surface-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-3">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center gap-2 justify-start">
              <div class="flex items-center lg:hidden">
                <Button
                  icon="pi pi-align-justify"
                  @click="visible = true"
                  text
                  severity="secondary"
                />
              </div>
              <div class="flex gap-1 items-center">
                <div class="flex shrink-0 items-center">
                  <img class="h-8 w-auto" src="/logo.png" alt="Calatrava Water System Logo" />
                </div>
                <div class="text-md md:text-xl font-bold text-surface-900 dark:text-surface-50">
                  <span class="hidden md:block">CALATRAVA WATER SYSTEM</span>
                  <span class="md:hidden">CWS</span>
                </div>
              </div>
            </div>
            <div
              class="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >
              <div class="mt-2 flex items-center gap-2">
                <ThemeToggle />
                <Notification />
              </div>
              <div class="relative ml-3">
                <div>
                  <RouterLink
                    to="/admin/setting"
                    class="relative flex rounded-full bg-surface-100 dark:bg-surface-700 text-sm focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-50 dark:focus:ring-offset-surface-900 focus:outline-none"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <img
                      class="size-8 rounded-full"
                      :src="admin.photoURL"
                      alt="Admin Avatar"
                    />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Drawer v-model:visible="visible" class="dark:inset-x-0">
        <template #header>
          <div class="flex items-center">
            <Avatar
              :image="admin.photoURL"
              class="mr-2"
              size="large"
              shape="circle"
            />
            <div class="text-xl text-center font-bold text-surface-900 dark:text-surface-50">CWS Admin</div>
          </div>
        </template>

        <Menu :model="items">
          <template #item="{ item }">
            <RouterLink
              v-slot="{ navigate }"
              :to="item.route"
              custom
              :class="
                route.name == item.name ? 'bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-300' : ''
              "
            >
              <div
                @click="
                  () => {
                    visible = false;
                    navigate();
                  }
                "
                :class="[
                  'flex items-center px-2 py-2 rounded-lg cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-800/30 hover:text-primary dark:hover:text-primary-300 transition-colors',
                  route.name === item.name ? 'bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-300' : '',
                ]"
              >
                <i :class="item.icon" class="mr-2"></i>
                <span>{{ item.label }}</span>
              </div>
            </RouterLink>
          </template>
        </Menu>
        <template #footer>
          <Button
            size="small"
            @click="logoutUser"
            icon="pi pi-sign-out"
            label="Sign Out"
            severity="secondary"
            class="w-full mt-4"
          />
        </template>
      </Drawer>

      <div class="flex gap-5 px-0 md:px-5 h-[calc(100vh-4rem)] overflow-hidden">
        <aside class="w-64 h-full transition-transform hidden lg:block">
          <div
            class="h-full p-4 overflow-y-auto flex flex-col bg-surface-0 dark:bg-surface-900 rounded-lg border border-surface-200 dark:border-surface-700 shadow-sm"
          >
            <div class="flex items-center mb-3">
              <Avatar :image="admin.photoURL" class="mr-2" size="large" shape="circle" />
              <div>
                <div class="font-semibold text-surface-900 dark:text-surface-50">{{ admin.displayName }}</div>
                <span class="text-sm text-surface-500 dark:text-surface-400">Admin</span>
              </div>
            </div>
            <hr class="border-surface-200 dark:border-surface-700 mb-3" />
            <ul class="space-y-2 font-medium flex-grow">
              <li v-for="item in items" :key="item.name">
                <RouterLink
                  :to="item.route"
                  :class="[
                    'flex items-center px-2 py-2 rounded-lg font-normal hover:bg-primary-100 dark:hover:bg-primary-800/30 hover:text-primary dark:hover:text-primary-300 transition-colors',
                    route.name == item.name ? 'bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-300' : ''
                  ]"
                >
                  <i :class="item.icon" class="mr-2 flex-shrink-0"></i>
                  <span class="flex-1">{{ item.label }}</span>
                </RouterLink>
              </li>
            </ul>
            <Button
              size="small"
              @click="logoutUser"
              icon="pi pi-sign-out"
              label="Sign Out"
              severity="secondary"
              class="mt-auto w-full"
            />
          </div>
        </aside>
        <div class="px-0 border border-surface-200 dark:border-surface-800 rounded-lg flex-1 overflow-y-auto bg-surface-0 dark:bg-surface-900">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Custom styles for better dark mode transitions if needed */
.router-link-active {
  background-color: var(--p-primary-50);
  color: var(--p-primary-color);
}

.dark .router-link-active {
  background-color: color-mix(in srgb, var(--p-primary-900), transparent 80%);
  color: var(--p-primary-300);
}
</style>