<script setup lang="ts">
import { ref } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import CreateModal from "./modals/create-modal.vue";
import DeleteModal from "./modals/delete-modal.vue";
import DeleteSelectedModal from "./modals/delete-selected-modal.vue";
import UpdateModal from "./modals/update-modal.vue";
import type { Reader } from "@/types/reader";

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const selectedReaders = ref([]);

const props = defineProps<{
  readers: Reader[];
}>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <Toolbar>
      <template #start>
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText
            v-model="filters['global'].value"
            placeholder="Search..."
          />
        </IconField>
      </template>
      <template #end>
        <CreateModal />
        <DeleteSelectedModal
          :selectedReaders="selectedReaders"
          v-if="selectedReaders && selectedReaders.length"
        />
      </template>
    </Toolbar>
    <div class="card border rounded-md">
      <DataTable
        :value="props.readers"
        v-model:selection="selectedReaders"
        size="small"
        dataKey="uid"
        scrollable
        scrollHeight="450px"
        :filters="filters"
      >
        <template #empty>
          <div class="flex items-center justify-center p-4">
            No readers found.
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
          field="uid"
          header="UID"
        >
        </Column>
        <Column
          class="whitespace-nowrap text-ellipsis"
          header="Name"
          field="name"
        >
          <template #body="slotProps">
            <div class="font-semibold">
              <Avatar
                icon="pi pi-user"
                class="mr-2 bg-primary text-white"
                size="normal"
              />
              {{ slotProps.data.name }}
            </div>
          </template>
        </Column>
        <Column
          class="whitespace-nowrap text-ellipsis"
          field="area"
          header="Area"
        >
          <template #body="slotProps">
            <span class="bg-green-200 pb-1 px-4 rounded-lg text-green-800">{{
              slotProps.data.area
            }}</span>
          </template>
        </Column>
        <Column
          class="whitespace-nowrap text-ellipsis"
          :exportable="false"
          header="Actions"
        >
          <template #body="slotProps">
            <div class="flex">
              <UpdateModal v-bind="slotProps.data" />
              <DeleteModal :uid="slotProps.data.uid" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <!-- <Paginator
			:rows="10"
			:totalRecords="store.totalReaders"
			:rowsPerPageOptions="[10, 20, 30]"
			@page="store.onPageChange"
			template="PrevPageLink CurrentPageReport NextPageLink  RowsPerPageDropdown"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" /> -->
  </div>
</template>
