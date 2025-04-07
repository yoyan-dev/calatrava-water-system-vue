<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { useAdminStore } from "@/stores/admin";
import type { Admin } from "@/types/admin";
import Notification from "./components/notification.vue";

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
  <main class="flex h-screen w-full text-surface-600">
    <div class="w-full flex flex-col gap-5 bg-gray-50">
      <nav class="bg-white">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-3">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-start">
              <div class="flex shrink-0 items-center">
                <img class="h-8 w-auto" src="/logo.png" alt="Water System" />
              </div>
              <div class="flex items-center lg:hidden">
                <Button
                  icon="pi pi-align-center"
                  @click="visible = true"
                  text
                />
              </div>
              <div class="text-md md:text-xl">CALATRAVA WATER SYSTEM</div>
            </div>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >
              <div class="mt-2">
                <Notification />
              </div>
              <div class="relative ml-3">
                <div>
                  <RouterLink
                    to="/admin/setting"
                    class="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:outline-hidden"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <img
                      class="size-8 rounded-full"
                      :src="admin.photoURL"
                      alt=""
                    />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Drawer v-model:visible="visible">
        <div class="flex flex-col items-center">
          <Avatar image="/logo.png" class="mr-2" size="xlarge" shape="circle" />
          <div class="text-lg text-center font-semibold">
            CALATRAVA WATER SYSTEM
          </div>
        </div>
        <Menu :model="items">
          <template #item="{ item, props }">
            <RouterLink
              v-slot="{ href, navigate }"
              :to="item.route"
              custom
              :class="
                route.name == item.name ? 'bg-primary-100 text-primary' : ''
              "
            >
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </RouterLink>
          </template>
        </Menu>
        <template #footer>
          <Button @click="logoutUser" icon="pi pi-sign-out" label="Sign Out" />
        </template>
      </Drawer>
      <div class="flex gap-5 px-0 md:px-5 h-screen overflow-auto">
        <aside class="w-64 h-full transition-transform hidden lg:block">
          <div
            class="h-full p-4 overflow-y-auto flex flex-col bg-white rounded-lg dark:bg-gray-800"
          >
            <div class="flex items-center mb-3">
              <span
                class="self-center flex items-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                ><Avatar :image="admin.photoURL" class="mr-2" size="large" />
              </span>
              <div>
                <div class="font-semibold">{{ admin.displayName }}</div>
                <span class="text-center w-full text-sm text-surface-400"
                  >admin</span
                >
              </div>
            </div>
            <hr />
            <ul class="space-y-2 font-medium grow">
              <li v-for="item in items" :key="item.name">
                <RouterLink
                  :to="item.route"
                  :class="
                    route.name == item.name ? 'bg-primary-100 text-primary' : ''
                  "
                  class="flex items-center px-2 rounded-lg font-normal hover:text-white cursor-pointer hover:bg-primary-400"
                >
                  <i :class="item.icon"></i>
                  <a
                    class="flex items-center p-2 rounded-lg hover:text-white cursor-pointer hover:bg-primary-400"
                  >
                    <span>{{ item.label }}</span>
                  </a>
                </RouterLink>
              </li>
            </ul>
            <Button
              @click="logoutUser"
              icon="pi pi-sign-out"
              label="Sign Out"
            />
          </div>
        </aside>
        <div class="px-0 flex-1 overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>
