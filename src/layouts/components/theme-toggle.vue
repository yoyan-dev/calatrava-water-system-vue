<script setup>
import { ref, onMounted } from "vue";
import Button from "primevue/button";

const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const html = document.documentElement;
  if (isDarkMode.value) {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  }
});
</script>

<template>
  <Button
    :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
    rounded
    text
    severity="secondary"
    class="p-2"
    @click="toggleTheme"
    aria-label="Toggle theme"
  />
</template>

<style scoped>
:deep(.p-button) {
  background-color: #e5e7eb;
  color: #1f2937;
}
:deep(.p-button:hover) {
  background-color: #d1d5db;
}
.dark :deep(.p-button) {
  background-color: #4b5563;
  color: #e5e7eb;
}
.dark :deep(.p-button:hover) {
  background-color: #6b7280;
}
</style>