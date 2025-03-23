<script setup lang="ts">
import { ref, inject, onMounted, reactive } from "vue";
import { useResidentStore } from "@/stores/resident";
import { validateForm } from "../../_composables/validate";
import type { Resident } from "@/types/resident";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const dialogRef = inject<any>("dialogRef");
const resident = ref<Resident>({});

onMounted(() => {
  resident.value = dialogRef.value.data.user;
});

const store = useResidentStore();
const isSubmitted = ref(false);

const isLoading = ref(false);
async function onSubmit() {
  isLoading.value = true;
  isSubmitted.value = true;

  const result = validateForm(resident.value);
  if (result.error) {
    isLoading.value = false;
    return;
  }
  const res = await store.updateResident(
    { fullname: resident.value.fullname, book: resident.value.book },
    resident.value.uid!
  );
  toast.add({
    severity: res.status,
    summary: res.statusMessage,
    detail: res.message,
    life: 3000,
  });
  dialogRef.value.close();
  isLoading.value = false;
}

function onClose() {
  dialogRef.value.close();
}
</script>

<template>
  <div>
    <div class="inline-flex items-center justify-center gap-2">
      <Avatar icon="pi pi-user" class="mr-2" size="normal" />
      <span class="font-bold whitespace-nowrap">{{ resident.fullname }}</span>
    </div>
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Update resident information.</span
    >
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <!-- <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" /> -->
        <div class="flex flex-wrap gap-5">
          <div class="flex-auto">
            <label for="name" class="block mb-3">Fullname</label>
            <InputText
              id="name"
              v-model.trim="resident.fullname"
              autofocus
              :invalid="isSubmitted && !resident.fullname"
              fluid
            />
            <small v-if="isSubmitted && !resident.fullname" class="text-red-500"
              >Fullname is required.</small
            >
          </div>
        </div>
        <div>
          <label for="name" class="block mb-3">Book</label>
          <InputText
            id="name"
            v-model.trim="resident.book"
            autofocus
            :invalid="isSubmitted && !resident.book"
            fluid
          />
          <small v-if="isSubmitted && !resident.book" class="text-red-500"
            >Book is required.</small
          >
        </div>
      </div>

      <div class="w-full flex justify-end gap-4">
        <Button label="Cancel" severity="danger" text @click="onClose" />
        <Button label="Save" type="submit" :loading="isLoading" />
      </div>
    </form>
  </div>
</template>
