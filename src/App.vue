<script setup lang="ts">
import { RouterView } from "vue-router";
import DynamicDialog from "primevue/dynamicdialog";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onMounted } from "vue";

const messaging = getMessaging();
onMounted(async () => {
  await getToken(messaging, {
    vapidKey:
      "BG9_5A9rSusMQuyCl0GGFNKDMc4qt7BA0vgDadYrhntzK0XN5jvHOwPez3uyBRqvDRK6fuVOAgVMM8F9qYUoWFY",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
});
</script>

<template>
  <RouterView />
  <DynamicDialog />
</template>
