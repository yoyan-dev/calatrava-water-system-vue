<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/pages/admin/billing/_components/header.vue";
import { useResidentStore } from "@/stores/resident";
import { useRoute, useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";
import { getSeverity } from "@/composables/getSeverity";

const router = useRouter();
const user = useCurrentUser() as any;
const store = useResidentStore();
const expandedRows = ref({});

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
  <div class="h-screen flex justify-center items-center" v-if="store.isLoading">
    <i class="pi pi-spin pi-spinner text-primary" style="font-size: 2rem"></i>
  </div>
  <div
    class="bg-surface-0 dark:bg-surface-900 m-5 p-4 py-6 md:p-6 border rounded-lg"
    v-else
  >
    <Header :totatBillings="store.resident?.billings?.length" />
    <div class="flex flex-col gap-3">
      <div>
        <div class="w-full">
          <!-- <FloatLabel variant="on">
							<DatePicker
								inputId="on_label"
								view="month"
								dateFormat="MM yy"
								showIcon
								fluid
								iconDisplay="input" />
							<label for="on_label">Select month</label>
						</FloatLabel> -->
        </div>
      </div>
      <div class="border rounded-md">
        <DataTable
          v-model:expandedRows="expandedRows"
          :value="store.resident?.billings"
          :loading="store.isLoading"
          dataKey="bill_no"
          size="small"
          :rows="10"
        >
          <template #empty>
            <div class="flex items-center justify-center p-4">
              No billing found.
            </div>
          </template>
          <Column expander style="width: 5rem" />
          <Column header="Bill No." field="billNo"> </Column>
          <Column field="billDate" header="Billing Date"> </Column>
          <Column field="waterBill" header="Water Bill">
            <template #body="slotProps">
              <span class="rounded-md text-primary">
                <i name="pi pi-money-bill"></i
                >{{
                  `₱ ${slotProps.data.totalBill ? slotProps.data.totalBill : 0}`
                }}
              </span>
            </template>
          </Column>
          <Column header="Status">
            <template #body="slotProps">
              <Tag
                :severity="getSeverity(slotProps.data.status as string)"
                :value="slotProps.data.status"
              ></Tag>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-4">
              <h5 class="font-semibold">Bill#{{ slotProps.data.billNo }}</h5>
              <div class="flex gap-5 justify-between">
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between gap-3">
                    Account No.:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.accountno
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Address:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.address
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Arrears:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.arrears
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Average use:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.averageuse
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Bill Date:
                    <span class="text-gray-500 text-left">{{
                      slotProps.data.billDate
                    }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between gap-3">
                    Bill No.:
                    <span class="text-gray-500">{{
                      slotProps.data.billNo
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Route No.:
                    <span class="text-gray-500">{{
                      slotProps.data.cRouteNo
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Statdesc:
                    <span class="text-gray-500">{{
                      slotProps.data.cStatdesc
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    c_type:
                    <span class="text-gray-500">{{
                      slotProps.data.cType
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3 items-end">
                    Disconnection Date:
                    <span class="text-gray-500">{{
                      slotProps.data.disconDat
                    }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between gap-3">
                    Due Date:
                    <span class="text-gray-500">{{
                      slotProps.data.dueDate
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Install Fee:
                    <span class="text-gray-500">{{
                      slotProps.data.installfee
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Meter Code:
                    <span class="text-gray-500">{{
                      slotProps.data.metercode
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Mrrf:
                    <span class="text-gray-500">{{ slotProps.data.mrrf }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3 items-end">
                    Meter No.:
                    <span class="text-gray-500">{{
                      slotProps.data.mtrNo
                    }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col p-3 border rounded-md">
                  <div class="flex-1 flex justify-between gap-3">
                    Pre Reading:
                    <span class="text-gray-500">{{
                      slotProps.data.prereading
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Prorated:
                    <span class="text-gray-500">{{
                      slotProps.data.prorated
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Prvmr_date:
                    <span class="text-gray-500">{{
                      slotProps.data.prvmrDate
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Reminders:
                    <span class="text-gray-500">{{
                      slotProps.data.reminders
                    }}</span>
                  </div>
                  <div class="flex-1 flex justify-between gap-3">
                    Res2:
                    <span class="text-gray-500">{{ slotProps.data.res2 }}</span>
                  </div>
                </div>
              </div>
              <!-- <DataTable :value="slotProps.data.orders">
									<Column field="id" header="Id" sortable></Column>
									<Column field="customer" header="Customer" sortable></Column>
									<Column field="date" header="Date" sortable></Column>
								</DataTable> -->
            </div>
          </template>
        </DataTable>
        <!-- <Paginator
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
					</Paginator> -->
      </div>
    </div>
  </div>
</template>
