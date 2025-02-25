<script setup lang="ts">
import { useRoute, useRouter, RouterLink } from "vue-router";
import { ref } from "vue";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const route = useRoute();
const router = useRouter();
const visible = ref(false);

const logoutUser = async () => {
  try {
    await signOut(auth);
    router.push("/admin");
    console.log("User logged out successfully");
  } catch (err) {
    console.error("Error logging out:", err);
  }
};

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
]);
</script>

<template>
  <main class="flex h-screen w-full text-surface-600">
    <aside class="w-64 h-full transition-transform border-r hidden lg:block">
      <div
        class="h-full p-4 overflow-y-auto flex flex-col bg-white dark:bg-gray-800"
      >
        <a class="flex items-center justify-center ps-2.5 mb-3">
          <span
            class="self-center flex items-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            ><Avatar
              image="/logo.png"
              class="mr-2"
              size="xlarge"
              shape="circle"
            />
          </span>
        </a>
        <hr />
        <ul class="space-y-2 font-medium grow">
          <li>
            <RouterLink
              to="/admin/dashboard"
              :class="
                route.name == 'admin-dashboard'
                  ? 'bg-primary-100 text-primary'
                  : ''
              "
              class="flex items-center px-2 rounded-lg font-normal hover:text-white cursor-pointer hover:bg-primary-400"
            >
              <i class="pi pi-chart-bar"></i>
              <a
                class="flex items-center p-2 rounded-lg hover:text-white cursor-pointer hover:bg-primary-400"
              >
                <span>Dashboard</span>
              </a>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/users"
              :class="
                route.name == 'admin-users' || route.name == 'admin-user'
                  ? 'bg-primary-100 text-primary'
                  : ''
              "
              class="flex items-center px-2 rounded-lg font-normal hover:text-white cursor-pointer hover:bg-primary-400"
            >
              <i class="pi pi-user"></i>
              <a
                class="flex items-center p-2 rounded-lg hover:text-white cursor-pointer hover:bg-primary-400"
              >
                <span>Users</span>
              </a>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/billings"
              :class="
                route.name == 'admin-billings' ||
                route.name == 'admin-billing' ||
                route.name == 'admin-billing-create' ||
                route.name == 'admin-billing-update'
                  ? 'bg-primary-100 text-primary'
                  : ''
              "
              class="flex items-center px-2 rounded-lg font-normal hover:text-white cursor-pointer hover:bg-primary-400"
            >
              <i class="pi pi-book"></i>
              <a
                class="flex items-center p-2 rounded-lg hover:text-white cursor-pointer hover:bg-primary-400"
              >
                <span>Billings</span>
              </a>
            </RouterLink>
          </li>
        </ul>
        <Button @click="logoutUser" icon="pi pi-sign-out" label="Sign Out" />
      </div>
    </aside>
    <div class="w-full flex flex-col gap-5 bg-gray-50 overflow-auto">
      <nav class="bg-white">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-3">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Button
                icon="pi pi-align-center"
                @click="visible = true"
                text
                class="visible lg:invisible xl:invisible"
              />
            </div>
            <div
              class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
            >
              <div class="flex shrink-0 items-center">
                <img class="h-8 w-auto" src="/logo.png" alt="Water System" />
              </div>
              <div class="text-xl">CALATRAVA WATER SYSTEM</div>
            </div>
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
            >
              <div class="relative ml-3">
                <div>
                  <button
                    type="button"
                    class="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:outline-hidden"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <img
                      class="size-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
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
      <div class="px-0 md:px-3">
        <slot />
      </div>
    </div>
  </main>
</template>
