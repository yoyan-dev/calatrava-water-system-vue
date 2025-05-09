<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useResidentStore } from "@/stores/resident";
import { getSeverity } from "@/composables/getSeverity";
import { formatToPeso } from "@/composables/currencyFormat";

const store = useResidentStore();
const expandedRows = ref({});

const props = defineProps<{
  uid: any;
}>();

onMounted(() => {
  console.log(props.uid);
  store.fetchResident(props.uid);
});
</script>

<template>
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
            >{{ formatToPeso(slotProps.data.billamnt) }}
          </span>
        </template>
      </Column>
      <Column class="whitespace-nowrap text-ellipsis" header="Status">
        <template #body="slotProps">
          <Tag
            :severity="getSeverity(slotProps.data.bStatus)"
            :value="slotProps.data.bStatus"
          ></Tag>
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="p-4">
          <h5 class="font-semibold">Bill#{{ slotProps.data.billNo }}</h5>
          <div class="flex gap-5">
            <div class="flex-1 flex flex-col p-3 border rounded-md">
              <h5 class="font-semibold mb-3">Billing Details</h5>
              <div class="flex justify-between items-end gap-3">
                <span>Bill No.:</span>
                <span class="text-gray-500">{{ slotProps.data.billNo }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Account No.:</span>
                <span class="text-gray-500">{{
                  slotProps.data.accountno
                }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Book:</span>
                <span class="text-gray-500">{{ slotProps.data.book }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Billing Date:</span>
                <span class="text-gray-500">{{ slotProps.data.billDate }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Due Date:</span>
                <span class="text-gray-500">{{ slotProps.data.dueDate }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Disconnection Date:</span>
                <span class="text-gray-500">{{
                  slotProps.data.disconDate
                }}</span>
              </div>
            </div>
            <div class="flex-1 flex flex-col p-3 border rounded-md">
              <h5 class="font-semibold mb-3">Charges</h5>
              <div class="flex justify-between items-end gap-3">
                <span>Water Bill:</span>
                <span class="text-gray-500">{{ slotProps.data.billamnt }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Arrears Amount:</span>
                <span class="text-gray-500">{{
                  slotProps.data.arrearsamt
                }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Arrears Env:</span>
                <span class="text-gray-500">{{
                  slotProps.data.arrearsenv
                }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Due Penalty:</span>
                <span class="text-gray-500">{{
                  slotProps.data.duePenalty
                }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Meter Penalty:</span>
                <span class="text-gray-500">{{ slotProps.data.mPenalty }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Discount:</span>
                <span class="text-gray-500">{{ slotProps.data.discount }}</span>
              </div>
            </div>
            <div class="flex-1 flex flex-col p-3 border rounded-md">
              <h5 class="font-semibold mb-3">Meter Details</h5>
              <div class="flex justify-between items-end gap-3">
                <span>Meter No.:</span>
                <span class="text-gray-500">{{ slotProps.data.mtrNo }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Current Reading:</span>
                <span class="text-gray-500">{{
                  slotProps.data.curreading
                }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Previous Reading:</span>
                <span class="text-gray-500">{{
                  slotProps.data.prereading
                }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Water Usage:</span>
                <span class="text-gray-500">{{
                  slotProps.data.waterusage
                }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Previous Usage:</span>
                <span class="text-gray-500">{{ slotProps.data.prevused }}</span>
              </div>
            </div>
            <div class="flex-1 flex flex-col p-3 border rounded-md">
              <h5 class="font-semibold mb-3">Additional Information</h5>
              <div class="flex justify-between items-end gap-3">
                <span>Class Type:</span>
                <span class="text-gray-500">{{
                  slotProps.data.classtype
                }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Barangay:</span>
                <span class="text-gray-500">{{ slotProps.data.billbrgy }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Purok:</span>
                <span class="text-gray-500">{{
                  slotProps.data.billpurok
                }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Verified:</span>
                <span class="text-gray-500">{{ slotProps.data.verified }}</span>
              </div>
              <div class="flex justify-between items-end gap-3">
                <span>Paid:</span>
                <span class="text-gray-500">{{ slotProps.data.paid }}</span>
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
</template>
