<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import type { Concern } from "@/types/concern";
import { useConcernStore } from "@/stores/concern";
import { useCurrentUser } from "vuefire";
import { useResidentStore } from "@/stores/resident";
import { useRouter } from "vue-router";
import { useToast } from "primevue";

const router = useRouter();
const toast = useToast();
const residentStore = useResidentStore();
const concernStore = useConcernStore();

const concern = reactive<Concern>({});

onMounted(async () => {
  const user = useCurrentUser() as any;
  if (!user.value) {
    console.log("No user is signed in.");
    router.push("/");
  }
  const residentId = user.value.uid;
  await residentStore.fetchResident(residentId);
  concern.name = residentStore.resident.fullname;
  concern.uid = residentId;
  concern.accountNumber = residentId;
});

async function submitConcern(payload: Concern) {
  const response = await concernStore.addConcern(payload);
  toast.add({
    severity: response.status,
    summary: response.statusMessage,
    detail: response.message,
    life: 3000,
  });
}
</script>
<template>
  <div
    class="h-screen flex justify-center items-center"
    v-if="residentStore.isLoading"
  >
    <i class="pi pi-spin pi-spinner text-primary" style="font-size: 2rem"></i>
  </div>
  <div class="p-2 md:p-4 lg:p-5">
    <div class="flex flex-col gap-5 shadow rounded-border">
      <form
        @submit.prevent="submitConcern(concern)"
        class="shadow rounded-border p-2 md:p-3 lg:p-6 bg-white"
      >
        <div
          class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2"
        >
          Send a concern
        </div>
        <div>
          <Textarea
            v-model="concern.content"
            rows="5"
            class="bg-gray-100 w-full"
            placeholder="Enter your concern here..."
          />
        </div>
        <div class="flex justify-end mt-2">
          <Button
            label="Send"
            severity="primary"
            icon="pi pi-send"
            iconPos="right"
            type="submit"
            :loading="concernStore.isLoading"
          />
        </div>
      </form>
      <!-- <div class="shadow rounded-border p-2 md:p-3 lg:p-6  bg-white ">
                <div
                    class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
                    List of concerns
                </div><hr/>
                <ConcernList :concerns="store.concerns"/>
            </div> -->
    </div>
  </div>
</template>
