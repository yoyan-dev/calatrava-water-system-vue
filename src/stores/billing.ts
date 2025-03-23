import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { Billing } from "@/types/billing";
import type { StoreResponse } from "@/types/store-response";
import { watchDebounced } from "@vueuse/core";
import { format } from "date-fns";
import { billingRepository } from "@/repositories/billingRepository";

export const useBillingStore = defineStore("billing", () => {
  // State
  const billings = ref<Billing[]>([]);
  const billing = ref<Billing>();
  const isLoading = ref(false);
  const month = ref(new Date());
  const searchQuery = ref("");
  const totalBillings = ref(0);
  const page = ref(0);

  // getters
  const offset = computed(() => page.value * 10);
  const formattedDate = computed(() => format(month.value, "yyyy-M"));

  // Actions
  async function fetchBillings() {
    isLoading.value = true;
    const response = await billingRepository.fetchBillings({
      q: searchQuery.value,
      month: formattedDate.value,
      offset: offset.value,
    });

    billings.value = response?.data || [];
    totalBillings.value = response?.total || 0;
    isLoading.value = false;
    console.log(billings.value);
  }

  async function fetchBilling(uid: string) {
    isLoading.value = true;
    const response = await billingRepository.fetchBilling(uid);
    billing.value = response?.data;
    isLoading.value = false;
  }

  async function addBillings(payload: File): Promise<StoreResponse> {
    isLoading.value = true;
    const formData = new FormData();
    formData.append("file", payload);
    const response = await billingRepository.addBillings(formData);
    if (response?.statusCode == 200) {
      await fetchBillings();
      return {
        status: "success",
        message: response.message,
        statusMessage: response.statusMessage ?? "",
      };
    }
    isLoading.value = false;
    return {
      status: "error",
      message: response?.message,
      statusMessage: response?.statusMessage ?? "",
    };
  }

  async function deleteBilling({
    accountno,
    uid,
  }: {
    accountno: string;
    uid: string;
  }): Promise<StoreResponse> {
    const response = await billingRepository.deleteBilling({ uid, accountno });
    if (response?.statusCode == 200) {
      await fetchBillings();
      return {
        status: "success",
        message: response.message,
        statusMessage: response.statusMessage ?? "",
      };
    }
    return {
      status: "error",
      message: response?.message,
      statusMessage: response?.statusMessage ?? "",
    };
  }

  async function deleteBillings(payload: Billing[]): Promise<StoreResponse> {
    const response = await billingRepository.deleteBillings(payload);
    if (response?.statusCode == 200) {
      await fetchBillings();
      return {
        status: "success",
        message: response.message,
        statusMessage: response.statusMessage ?? "",
      };
    }
    return {
      status: "error",
      message: response?.message,
      statusMessage: response?.statusMessage ?? "",
    };
  }

  async function updateBilling(billing: Billing, uid: string) {
    const response = await billingRepository.updateBilling({ uid, billing });
    if (response?.statusCode == 200) {
      await fetchBillings();
      return {
        status: "success",
        message: response.message,
        statusMessage: response.statusMessage ?? "",
      };
    }
    return {
      status: "error",
      message: response?.message,
      statusMessage: response?.statusMessage ?? "",
    };
  }

  watchDebounced(
    [searchQuery, formattedDate, offset],
    (newQuery) => {
      fetchBillings();
    },
    { debounce: 300 }
  );

  return {
    billings,
    billing,
    isLoading,
    month,
    searchQuery,
    page,
    totalBillings,
    fetchBilling,
    fetchBillings,
    addBillings,
    updateBilling,
    deleteBilling,
    deleteBillings,
  };
});
