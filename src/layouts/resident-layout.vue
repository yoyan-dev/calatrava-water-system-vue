<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";

const route = useRoute();
const visible = ref(false);
const items = ref([
  {
    label: "Home",
    name: "resident-home",
    icon: "pi pi-money-bill",
    route: "/resident",
  },
  {
    label: "Bills",
    name: "resident-bills",
    icon: "pi pi-book",
    route: "/resident/bills",
  },
  {
    label: "Concern",
    name: "resident-concen",
    icon: "pi pi-question-circle",
    route: "/resident/concern",
  },
]);
</script>
<template>
  <main class="relative bg-white h-screen">
    <div class="sticky top-0 z-10">
      <Toolbar>
        <template #start>
          <div class="flex items-center gap-2 font-semibold">
            <div class="flex items-center">
              <Button
                icon="pi pi-align-center"
                @click="visible = true"
                class="visible md:invisible lg:invisible xl:invisible"
                text
              />
              <Avatar
                image="/logo.png"
                class="mr-2"
                size="large"
                shape="circle"
              />
              <div class="text-lG md:text-xl">CALATRAVA WATER SYSTEM</div>
            </div>
          </div>
        </template>

        <template #end>
          <Drawer v-model:visible="visible">
            <template #header>
              <div>
                <div class="text-lG md:text-xl">CALATRAVA WATER SYSTEM</div>
              </div>
            </template>
            <Menu :model="items">
              <template #item="{ item, props }">
                <RouterLink
                  v-slot="{ href, navigate }"
                  :to="item.route"
                  custom
                  :class="route.name == item.name ? 'text-primary-500' : ''"
                >
                  <a
                    v-ripple
                    :href="href"
                    v-bind="props.action"
                    @click="navigate"
                  >
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                  </a>
                </RouterLink>
              </template>
              <Button label="log out" icon="pi pi-sin-out" size="small" />
            </Menu>
          </Drawer>
          <div class="flex gap-5" :class="visible ? 'px-5' : ''">
            <RouterLink
              v-for="item in items"
              :key="item.name"
              :to="item.route"
              :class="route.name == item.name ? 'text-primary-500' : ''"
              class="hidden md:block lg:block"
              >{{ item.label }}</RouterLink
            >
            <Button
              label="log out"
              icon="pi pi-sin-out"
              size="small"
              class="hidden md:block lg:block"
            />
          </div>
        </template>
      </Toolbar>
    </div>
    <slot />
  </main>
</template>
