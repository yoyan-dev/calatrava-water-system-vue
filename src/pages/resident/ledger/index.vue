<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import Header from "./_components/header.vue";
import { useResidentStore } from "@/stores/resident";
import { useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";

const store = useResidentStore();
// const selectedCollection = ref([]);
const user = useCurrentUser() as any;
const router = useRouter();

onMounted(async () => {
  if (!user.value) {
    console.log("No user is signed in.");
    router.push("/");
    return;
  }
  const residentId = user.value.uid;
  await store.fetchResident(residentId as string);
});
</script>

<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg"
  >
    <Header :totalLedgers="store.resident?.ledgers?.length" />
    <div class="flex flex-col gap-3">
      <div class="border rounded-md">
        <DataTable
          :value="store.resident?.ledgers"
          :loading="store.isLoading"
          dataKey="uid"
          size="small"
          :rows="10"
        >
          <template #empty>
            <div class="flex items-center justify-center p-4">
              No ledger found.
            </div>
          </template>
          <Column
            class="whitespace-nowrap text-ellipsis"
            header="Account No."
            field="accountno"
          >
          </Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            header="Transaction Date"
            field="transDate"
          >
          </Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="refCode"
            header="Ref Code"
          ></Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="refNo"
            header="Ref No."
          >
          </Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="amount"
            header="Amount"
          >
            <template #body="slotProps">
              <span class="rounded-md text-primary">
                <i name="pi pi-money-bill"></i
                >{{ `₱ ${slotProps.data.amount}` }}
              </span>
            </template>
          </Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="tag"
            header="Tag"
          ></Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="reading"
            header="Reading"
          ></Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="consumption"
            header="Consumption"
          ></Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="sequence"
            header="Sequence"
          ></Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="custno"
            header="Custno"
          ></Column>
        </DataTable>
        <Paginator
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px':
              'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px':
              'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default:
              'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink ',
          }"
          :rows="10"
          @page="(e) => (store.page = e.page + 1)"
          :totalRecords="store.totalLedgers"
        >
        </Paginator>
      </div>
    </div>
  </div>
</template>
