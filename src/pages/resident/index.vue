<script setup lang="ts">
import ResidentLayout from "@/layouts/resident-layout.vue";
import { RouterView } from "vue-router";
import { Toast } from "primevue";
</script>

<template>
  <ResidentLayout>
    <Toast position="bottom-right" />
    <div class="p-5">
      <Message closable>
        <div>
          <h1>Reminder! Upcomming due date.</h1>
          <span>Hapit na imong due date.</span>
        </div>
      </Message>
    </div>
    <RouterView />
  </ResidentLayout>
</template>
