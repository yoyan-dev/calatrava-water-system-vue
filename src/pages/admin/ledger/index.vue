<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import Header from "@/pages/admin/ledger/_components/header.vue";
import { useLedgerStore } from "@/stores/ledger";
import ImportModal from "./_components/modals/import-modal.vue";
import DeleteSelected from "./_components/modals/delete-selected-modal.vue";

const store = useLedgerStore();
const selectedLedgers = ref([]);
const menu = ref<any[]>([]);

function onToggled(event: Event, index: number) {
  menu.value[index].toggle(event);
}

onMounted(() => {
  store.fetchLedgers();
});
</script>

<template>
  <div class="p-4 md:p-6">
    <Header :totalLedgers="store.totalLedgers" />
    <div class="flex flex-col gap-4">
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
            <DeleteSelected
              :selectedLedgers="selectedLedgers"
              v-if="selectedLedgers.length"
            />
          </div>
        </div>
      </div>
      <div>
        <DataTable
          :value="store.ledgers"
          :loading="store.isLoading"
          v-model:selection="selectedLedgers"
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
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
          ></Column>
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
