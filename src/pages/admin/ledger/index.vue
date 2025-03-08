<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import Header from "@/pages/admin/ledger/_components/header.vue";
import { useLedgerStore } from "@/stores/ledger";
import ImportModal from "./_components/modals/import-modal.vue";

const store = useLedgerStore();
// const selectedCollection = ref([]);
const menu = ref<any[]>([]);

function onToggled(event: Event, index: number) {
  menu.value[index].toggle(event);
}

onMounted(() => {
  store.fetchLedgers();
});
</script>

<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg"
  >
    <Header :totalLedgers="store.totalLedgers" />
    <div class="flex flex-col gap-3">
      <div>
        <div class="flex gap-5 flex-wrap items-start">
          <div class="flex-1">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="store.searchQuery" placeholder="Search..." />
            </IconField>
          </div>
          <div class="flex gap-3 justify-start md:justify-end w-full flex-1">
            <FloatLabel variant="on">
              <DatePicker
                v-model:modelValue="store.month"
                inputId="on_label"
                view="month"
                dateFormat="MM yy"
                showIcon
                iconDisplay="input"
              />
              <label for="on_label">Select month</label>
            </FloatLabel>
            <ImportModal />
          </div>
        </div>
      </div>
      <div class="border rounded-md">
        <DataTable
          :value="store.ledgers"
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
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
          ></Column>
          <Column header="Account No." field="accountno"> </Column>
          <Column header="Transaction Date" field="trans_date"> </Column>
          <Column field="ref_cod" header="Ref Code"></Column>
          <Column field="ref_no" header="Ref No."> </Column>
          <Column field="amount" header="Amount">
            <template #body="slotProps">
              <span class="rounded-md text-primary">
                <i name="pi pi-money-bill"></i
                >{{ `₱ ${slotProps.data.amount}` }}
              </span>
            </template>
          </Column>
          <Column field="tag" header="Tag"></Column>
          <Column field="reading" header="Reading"></Column>
          <Column field="consumption" header="Consumption"></Column>
          <Column field="sequence" header="Sequence"></Column>
          <Column field="custno" header="Custno"></Column>
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
