<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import WaterBill from "./_components/water-bill.vue";
import { getCurrentUser, useCurrentUser } from "vuefire";
import { useResidentStore } from "@/stores/resident";
import { useRouter } from "vue-router";

const store = useResidentStore();
const billIncreasePercentage = ref(0);
const router = useRouter();

onMounted(async () => {
  store.isLoading = true;
  const user = await getCurrentUser();
  if (!user) {
    router.replace("/auth");
  }

  store.fetchResident(user?.uid ?? "");

  if (store.resident?.billings && store.resident?.billings?.length > 1) {
    const currentBill = store.resident?.billings[0].totalBill
      ? store.resident?.billings[0].totalBill
      : 0;
    const previousBill = store.resident?.billings[1].totalBill
      ? store.resident?.billings[1].totalBill
      : 0;
    billIncreasePercentage.value =
      ((currentBill - previousBill) / previousBill) * 100;
  }
});

watchEffect(() => {
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
                store.resident?.fullname?.charAt(0).toUpperCase() ?? ""
              }}</span>
            </div>
            <div>
              <h2 class="text-lg font-semibold capitalize">
                {{ store.resident?.fullname }}
              </h2>
              <p class="text-sm text-gray-500">
                {{ store.resident?.uid }}
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
              class="max-w-96 flex flex-col gap-3 border border-primary rounded-md p-3 mt-3 bg-gradient-to-b from-primary-800 to-primary-500"
            >
              <div class="text-lg text-white">Current total bill</div>
              <div class="flex justify-between items-end">
                <span class="text-xl font-bold text-surface-200">{{
                  `₱ ${store.resident?.billings?.[0].totalBill}`
                }}</span>
                <div
                  :class="{
                    'text-red-200': billIncreasePercentage > 0,
                    'text-green-200': billIncreasePercentage <= 0,
                  }"
                >
                  <span>
                    <i
                      :class="{
                        'pi pi-sort-amount-up': billIncreasePercentage > 0,
                        'pi pi-sort-amount-down': billIncreasePercentage <= 0,
                      }"
                    ></i>
                    {{
                      billIncreasePercentage > 0
                        ? `bill increase by ${billIncreasePercentage}%`
                        : `bill decrease by ${Math.abs(
                            billIncreasePercentage
                          )}%`
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="lg:flex-1 md:flex-1 bg-gray-50 rounded-md p-1 md:p-3 lg:p-5 flex flex-col gap-5"
      >
        <div v-if="!store.resident?.billings">
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
      </div>
    </div>
  </div>
</template>
