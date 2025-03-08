<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import ResidentTable from "./_components/resident-table.vue";
import { useResidentStore } from "@/stores/resident";
import Header from "./_components/header.vue";

const store = useResidentStore();
onMounted(() => {
  store.fetchResidents();
});
</script>

<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg"
  >
    <Header :totalResident="store.totalResidents" />
    <ResidentTable :residents="store.residents" />
  </div>
</template>
