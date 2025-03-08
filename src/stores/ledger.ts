import { ledgerRepository } from "@/repositories/ledgerRepository";
import type { Ledger } from "@/types/ledger";
import { watchDebounced } from "@vueuse/core";
import { format } from "date-fns";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLedgerStore = defineStore("ledger", () => {
  const ledgers = ref<Ledger[]>([]);
  const totalLedgers = ref(0);
  const isLoading = ref(false);
  const searchQuery = ref("");
  const month = ref(new Date());
  const page = ref(0);

  // Getters
  const offset = computed(() => page.value * 10);
  const formattedDate = computed(() => format(month.value, "yyyy-M"));

  // Actions
  async function fetchLedgers() {
    isLoading.value = true;
    const response = await ledgerRepository.fetchLedgers({
      q: searchQuery.value,
      month: formattedDate.value,
      offset: offset.value,
    });

    ledgers.value = response?.data || [];
    totalLedgers.value = response?.total || 0;
    isLoading.value = false;
  }

  watchDebounced([searchQuery, formattedDate, offset], () => fetchLedgers(), {
    debounce: 300,
  });

  async function addLedgers(payload: any[]) {
    isLoading.value = true;
    const response = await ledgerRepository.addLedgers(payload);
    if (response?.statusCode == 200) {
      await fetchLedgers();
      isLoading.value = false;
      return { success: true, message: response.message };
    }
    isLoading.value = false;
    return { success: false, message: response?.message };
  }

  return {
    isLoading,
    month,
    page,
    searchQuery,
    ledgers,
    totalLedgers,
    fetchLedgers,
    addLedgers,
  };
});
