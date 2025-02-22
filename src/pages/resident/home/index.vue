<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import WaterBill from "./_components/water-bill.vue";
import PayBillModal from "./_components/modals/pay-bill-modal.vue";
import { useCurrentUser } from "vuefire";
import { useResidentStore } from "@/stores/resident";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useResidentStore();

onMounted(async () => {
  const user = useCurrentUser() as any;
  if (!user.value) {
    console.log("No user is signed in.");
    router.push("/");
  }
  const residentId = user.value.uid;
  await store.fetchResident(residentId);

  console.log(store.resident);
});
</script>

<template>
  <div class="h-screen flex justify-center items-center" v-if="store.isLoading">
    <i class="pi pi-spin pi-spinner text-primary" style="font-size: 2rem"></i>
  </div>
  <div class="p-2 md:p-4 lg:p-5" v-else>
    <div class="p-0 md:p-3 lg:p-6 flex flex-col bg-white border rounded-lg">
      <div class="lg:flex-1 md:flex-1 flex flex-col gap-5 p-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center"
            >
              <span class="text-lg font-bold">{{
                store.resident.fullname?.charAt(0).toUpperCase()
              }}</span>
            </div>
            <div>
              <h2 class="text-lg font-semibold capitalize">
                {{ store.resident.fullname }}
              </h2>
              <p class="text-sm text-gray-500">
                {{ store.resident.accountNumber }}
              </p>
            </div>
          </div>
          <span class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
            >Resident</span
          >
        </div>
        <div>
          <div>
            <h2 class="text-lg font-semibold">Analytics</h2>
            <div
              class="max-w-96 flex flex-col gap-3 border border-primary rounded-md p-3 mt-3"
            >
              <div class="text-lg">Current total bill</div>
              <div class="flex justify-between items-end">
                <span class="text-xl font-bold text-surface-500">{{
                  `₱ ${store.resident.billings?.[0].totalBill}`
                }}</span>
                <div class="text-red-500">
                  <span
                    ><i class="pi pi-sort-amount-up"></i>
                    bill increase by 10%
                  </span>
                </div>
              </div>
            </div>
            <div
              class="max-w-96 flex flex-col gap-3 border border-primary rounded-md p-3 mt-3"
            >
              <div class="text-lg">Current total bill</div>
              <div class="flex justify-between items-end">
                <span class="text-xl font-bold text-surface-500">{{
                  `₱ ${store.resident.billings?.[0].totalBill}`
                }}</span>
                <div class="text-green-500">
                  <span
                    ><i class="pi pi-sort-amount-down"></i> bill decrease by
                    10%</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="lg:flex-1 md:flex-1 bg-gray-50 rounded-md p-1 md:p-3 lg:p-5 flex flex-col gap-5"
      >
        <div class="card bg-white border rounded-md">
          <div>
            <h1 class="text-xl text-center">Current bill</h1>
          </div>
        </div>
        <div v-if="!store.resident.billings">
          <div class="flex justify-center items-center h-96">
            <div class="text-center">
              <i class="pi pi-exclamation-triangle text-4xl text-slate-500"></i>
              <h1 class="text-xl text-slate-500">No bill found</h1>
              <p class="text-slate-500">
                You have no bill for this period. Please check back later.
              </p>
            </div>
          </div>
        </div>
        <WaterBill :resident="store.resident" v-else />
        <div class="flex justify-end">
          <PayBillModal />
        </div>
      </div>
    </div>
  </div>
</template>
