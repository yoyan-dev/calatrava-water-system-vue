<script setup lang="ts">
import { ref } from 'vue';
import { Resident } from '@/types/resident';
import { useResidentStore } from '@/stores/residentStore';

const residentStore = useResidentStore()
const isOpen = ref(false)
const isSubmitted = ref(false)

const resident = ref<Resident>({})

function onSubmit () {
    isSubmitted.value = true
    residentStore.createResident(resident.value)
    isOpen.value = false
    resident.value = {}
    isSubmitted.value = false
}

</script>
<template>
    <div>
        <Button label="New" icon="pi pi-plus" class="mr-2" @click="isOpen = true;" />
        <Dialog v-model:visible="isOpen" :style="{ width: '450px' }" header="resident Details" :modal="true">
            <div class="flex flex-col gap-6">
                <!-- <img v-if="resident.image" :src="`https://primefaces.org/cdn/primevue/images/resident/${resident.image}`" :alt="resident.image" class="block m-auto pb-4" /> -->
                <div>
                    <label for="name" class="block font-bold mb-3">Firstname</label>
                    <InputText id="name" v-model.trim="resident.firstName" required="true" autofocus :invalid="isSubmitted && !resident.firstName" fluid />
                    <small v-if="isSubmitted && !resident.firstName" class="text-red-500">firstname is required.</small>
                </div>
                <div>
                    <label for="name" class="block font-bold mb-3">Middle name</label>
                    <InputText id="name" v-model.trim="resident.middleName" required="true" autofocus :invalid="isSubmitted && !resident.middleName" fluid />
                    <small v-if="isSubmitted && !resident.middleName" class="text-red-500">Middle name is required.</small>
                </div>
                <div>
                    <label for="name" class="block font-bold mb-3">Lastname</label>
                    <InputText id="name" v-model.trim="resident.lastName" required="true" autofocus :invalid="isSubmitted && !resident.lastName" fluid />
                    <small v-if="isSubmitted && !resident.lastName" class="text-red-500">Last name is required.</small>
                </div>
                <div>
                    <label for="name" class="block font-bold mb-3">Address</label>
                    <InputText id="name" v-model.trim="resident.address" required="true" autofocus :invalid="isSubmitted && !resident.address" fluid />
                    <small v-if="isSubmitted && !resident.address" class="text-red-500">Address is required.</small>
                </div>
                <div>
                    <label for="name" class="block font-bold mb-3">Classification</label>
                    <InputText id="name" v-model.trim="resident.classification" required="true" autofocus :invalid="isSubmitted && !resident.classification" fluid />
                    <small v-if="isSubmitted && !resident.classification" class="text-red-500">Classification is required.</small>
                </div>
                <!-- <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                    <Select id="inventoryStatus" v-model="resident.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
                </div> -->
            </div>
    
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="isOpen = false" />
                <Button label="Save" icon="pi pi-check" @click="onSubmit" />
            </template>
        </Dialog>
    </div>
</template>