<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import Header from "@/pages/admin/collection/_components/header.vue";
import { useCollectionStore } from "@/stores/collection";
import ImportModal from "./_components/modals/import-modal.vue";

const store = useCollectionStore();
// const selectedCollection = ref([]);
const menu = ref<any[]>([]);
const expandedRows = ref({});

function onToggled(event: Event, index: number) {
  menu.value[index].toggle(event);
}

onMounted(() => {
  store.fetchCollections();
});
</script>

<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 mx-5 p-4 py-6 md:p-6 border rounded-lg"
  >
    <Header :totalCollections="store.totalCollections" />
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
          v-model:expandedRows="expandedRows"
          :value="store.collections"
          :loading="store.isLoading"
          dataKey="uid"
          size="small"
          :rows="10"
        >
          <template #empty>
            <div class="flex items-center justify-center p-4">
              No collection payment found.
            </div>
          </template>
          <Column
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
          ></Column>
          <Column expander style="width: 5rem" />
          <Column header="Account No." field="accountno"> </Column>
          <Column header="Reciept No." field="receiptno"> </Column>
          <Column field="receipttype" header="Receipt Type"></Column>
          <Column field="pymtdate" header="Payment Date"> </Column>
          <Column field="waterbill" header="Water Bill">
            <template #body="slotProps">
              <span class="rounded-md text-primary">
                <i name="pi pi-money-bill"></i
                >{{ `₱ ${slotProps.data.waterill}` }}
              </span>
            </template>
          </Column>
          <Column field="pymtmethod" header="Payment Method"></Column>
          <!-- <Column header="Actions">
            <template #body="slotProps">
              <Button
                type="button"
                severity="secondary"
                icon="pi pi-ellipsis-v"
                @click="onToggled($event, slotProps.index)"
                text
              />

              <Popover :ref="(el) => (menu[slotProps.index] = el)">
                <div class="flex flex-col">
                  <RouterLink to="">
                    <ViewReciept
                      :paymentReceipt="slotProps.data.paymentReceipt"
                    />
                  </RouterLink>
                  <RouterLink to="">
                    <Button
                      icon="pi pi-check"
                      severity="success"
                      size="small"
                      label="mark as paid"
                      text
                    />
                  </RouterLink>
                  <DeleteModal :uid="slotProps.data.residentUid" />
                </div>
              </Popover>
            </template>
          </Column> -->
          <template #expansion="slotProps">
            <div class="p-4">
              <h5 class="font-semibold">
                Receipt#{{ slotProps.data.receiptno }}
              </h5>
              <div class="flex gap-5 justify-between">
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Account No.:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.accountno
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Bill No.:
                    <span class="text-gray-500">{{
                      slotProps.data.billNo
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    SYS No.:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.sysno
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Receipt Type:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.receipttype
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Payment Date:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.pymtdate
                    }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Payment Method:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.pymtmethod
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Cash:
                    <span class="text-gray-500">{{ slotProps.data.cash }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Check:
                    <span class="text-gray-500">{{
                      slotProps.data.check
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Check No.:
                    <span class="text-gray-500">{{
                      slotProps.data.checkno
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Bank ID:
                    <span class="text-gray-500">{{
                      slotProps.data.bankid
                    }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Branch:
                    <span class="text-gray-500">{{
                      slotProps.data.branch
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Receipt Status:
                    <span class="text-gray-500">{{
                      slotProps.data.receiptstatus
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Teller:
                    <span class="text-gray-500">{{
                      slotProps.data.teller
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Pay Arrears:
                    <span class="text-gray-500">{{
                      slotProps.data.payarrears
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Bank Group:
                    <span class="text-gray-500">{{
                      slotProps.data.bankgroup
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Bank Online:
                    <span class="text-gray-500">{{
                      slotProps.data.bankonline
                    }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Full Name:
                    <span class="text-gray-500">{{
                      slotProps.data.fullname
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Online Ref:
                    <span class="text-gray-500">{{
                      slotProps.data.onlineref
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Batch No.:
                    <span class="text-gray-500">{{
                      slotProps.data.batchno
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Payment Amount:
                    <span class="text-gray-500">{{
                      slotProps.data.papyamnt
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Payment Amount (Corrected):
                    <span class="text-gray-500">{{
                      slotProps.data.pacyamnt
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    MRR Fee Amount:
                    <span class="text-gray-500">{{
                      slotProps.data.pmrrfamnt
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    CMRR Fee Amount:
                    <span class="text-gray-500">{{
                      slotProps.data.cmrrfamnt
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Discount Amount:
                    <span class="text-gray-500">{{
                      slotProps.data.pdiscamnt
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Penalty Amount:
                    <span class="text-gray-500">{{
                      slotProps.data.penamnt
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Track Date:
                    <span class="text-gray-500">{{
                      slotProps.data.trackdt
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Running Balance:
                    <span class="text-gray-500">{{
                      slotProps.data.runbalance
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Customer No.:
                    <span class="text-gray-500">{{
                      slotProps.data.custno
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Other Income:
                    <span class="text-gray-500">{{
                      slotProps.data.othrincome
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Arrears (Environment):
                    <span class="text-gray-500">{{
                      slotProps.data.arrearsenv
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Arrears Amount:
                    <span class="text-gray-500">{{
                      slotProps.data.arrearsamt
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Environment Fee:
                    <span class="text-gray-500">{{
                      slotProps.data.envfee
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Water Bill:
                    <span class="text-gray-500">{{
                      slotProps.data.waterbill
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Amortize:
                    <span class="text-gray-500">{{
                      slotProps.data.amortize
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Check Date:
                    <span class="text-gray-500">{{
                      slotProps.data.checkdate
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Other Apply:
                    <span class="text-gray-500">{{
                      slotProps.data.othrapply
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Other Reconnection:
                    <span class="text-gray-500">{{
                      slotProps.data.othrreconn
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
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
          :totalRecords="store.totalCollections"
        >
        </Paginator>
      </div>
    </div>
  </div>
</template>
