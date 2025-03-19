<script setup lang="ts">
import {
  ref,
  onMounted,
  watchEffect,
  nextTick,
  defineAsyncComponent,
} from "vue";
import Header from "@/pages/admin/billing/_components/header.vue";
import DeleteSelected from "@/pages/admin/billing/_components/modals/delete-selected-modal.vue";
import { useBillingStore } from "@/stores/billing";
import ImportModal from "./_components/modals/import-modal.vue";
import { getSeverity } from "@/composables/getSeverity";
import { useDialog } from "primevue";
import type { Billing } from "@/types/billing";

const ViewReciept = defineAsyncComponent(
  () => import("@/pages/admin/billing/_components/modals/view-reciept.vue")
);

const deleteBilling = defineAsyncComponent(
  () => import("@/pages/admin/billing/_components/modals/delete-modal.vue")
);

const store = useBillingStore();
const dialog = useDialog();
const selectedWaterBill = ref([]);
const expandedRows = ref({});
const op = ref();
const selectedBill = ref<Billing | null>();

function onToggled(event: Event, billing: Billing) {
  op.value.hide();

  if (selectedBill.value?.uid === billing.uid) {
    selectedBill.value = null;
  } else {
    selectedBill.value = billing;

    nextTick(() => {
      op.value.show(event);
    });
  }
}

function hidePopover() {
  op.value.hide();
}

onMounted(() => {
  store.fetchBillings();
});

watchEffect(() => console.log(store.billings));
</script>

<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg"
  >
    <Header :totalBillings="store.totalBillings" />
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
            <DeleteSelected
              :selectedBills="selectedWaterBill"
              v-if="selectedWaterBill.length"
            />
          </div>
        </div>
      </div>
      <div class="border rounded-md">
        <DataTable
          v-model:expandedRows="expandedRows"
          :value="store.billings"
          :loading="store.isLoading"
          v-model:selection="selectedWaterBill"
          dataKey="billNo"
          size="small"
          :rows="10"
        >
          <template #empty>
            <div class="flex items-center justify-center p-4">
              No billing found.
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
            expander
            style="width: 5rem"
          />
          <Column
            class="whitespace-nowrap text-ellipsis"
            header="Bill No."
            field="billNo"
          >
          </Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="accountno"
            header="AccountNumber"
          ></Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="billDate"
            header="Billing Date"
          >
          </Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="waterBill"
            header="Water Bill"
          >
            <template #body="slotProps">
              <span class="rounded-md text-primary">
                <i name="pi pi-money-bill"></i
                >{{ `₱ ${slotProps.data.totalBill}` }}
              </span>
            </template>
          </Column>
          <Column
            class="whitespace-nowrap text-ellipsis"
            field="address"
            header="Area"
          ></Column>
          <Column class="whitespace-nowrap text-ellipsis" header="Status">
            <template #body="slotProps">
              <Tag
                :severity="getSeverity(slotProps.data.status)"
                :value="slotProps.data.status"
              ></Tag>
            </template>
          </Column>
          <Column class="whitespace-nowrap text-ellipsis" header="Actions">
            <template #body="slotProps">
              <Button
                type="button"
                severity="secondary"
                icon="pi pi-ellipsis-v"
                @click="onToggled($event, slotProps.data)"
                text
              />
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-4">
              <h5 class="font-semibold">Bill#{{ slotProps.data.billNo }}</h5>
              <div class="flex gap-5 justify-between">
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Account No.:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.accountno
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Address:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.address
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Arrears:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.arrears
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Average use:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.averageuse
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Bill Date:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.billDate
                    }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Bill No.:
                    <span class="text-gray-500">{{
                      slotProps.data.billNo
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Route No.:
                    <span class="text-gray-500">{{
                      slotProps.data.cRouteNo
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Statdesc:
                    <span class="text-gray-500">{{
                      slotProps.data.cStatdesc
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    c_type:
                    <span class="text-gray-500">{{
                      slotProps.data.cType
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Disconnection Date:
                    <span class="text-gray-500">{{
                      slotProps.data.disconDat
                    }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Due Date:
                    <span class="text-gray-500">{{
                      slotProps.data.dueDate
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Install Fee:
                    <span class="text-gray-500">{{
                      slotProps.data.installfee
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Meter Code:
                    <span class="text-gray-500">{{
                      slotProps.data.metercode
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Mrrf:
                    <span class="text-gray-500">{{ slotProps.data.mrrf }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Meter No.:
                    <span class="text-gray-500">{{
                      slotProps.data.mtrNo
                    }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Pre Reading:
                    <span class="text-gray-500">{{
                      slotProps.data.prereading
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Prorated:
                    <span class="text-gray-500">{{
                      slotProps.data.prorated
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Prvmr_date:
                    <span class="text-gray-500">{{
                      slotProps.data.prvmrDate
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between items-end gap-3">
                    Res2:
                    <span class="text-gray-500">{{ slotProps.data.res2 }}</span>
                  </div>
                </div>
              </div>
              <!-- <DataTable :value="slotProps.data.orders">
								<Column class="whitespace-nowrap text-ellipsis" field="id" header="Id" sortable></Column>
								<Column class="whitespace-nowrap text-ellipsis" field="customer" header="Customer" sortable></Column>
								<Column class="whitespace-nowrap text-ellipsis" field="date" header="Date" sortable></Column>
							</DataTable> -->
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
          :totalRecords="store.totalBillings"
        >
        </Paginator>
      </div>
    </div>
  </div>
  <Popover ref="op">
    <div class="flex flex-col items-start">
      <Button
        icon="pi pi-wallet"
        severity="secondary"
        label="View Receipt"
        size="small"
        @click="
          () => {
            dialog.open(ViewReciept, {
              props: {
                header: 'View Reciept',
                style: {
                  width: '50vw',
                },
                breakpoints: {
                  '960px': '75vw',
                  '640px': '90vw',
                },
                modal: true,
              },
              data: {
                user: selectedBill,
              },
            });
            hidePopover();
          }
        "
        text
      />

      <Button
        icon="pi pi-check"
        severity="success"
        size="small"
        label="mark as paid"
        text
      />

      <Button
        icon="pi pi-trash"
        severity="danger"
        label="delete"
        size="small"
        text
        @click="
          () => {
            dialog.open(deleteBilling, {
              props: {
                header: 'Confirm',
                style: {
                  width: '50vw',
                },
                breakpoints: {
                  '960px': '75vw',
                  '640px': '90vw',
                },
                modal: true,
              },
              data: {
                uid: selectedBill?.uid,
                accountno: selectedBill?.accountno,
              },
            });
            hidePopover();
          }
        "
      />
    </div>
  </Popover>
</template>
