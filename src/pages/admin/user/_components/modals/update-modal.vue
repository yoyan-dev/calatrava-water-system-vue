<script setup lang="ts">
import { ref } from 'vue';
import { useResidentStore } from '@/stores/residentStore';
import type { Resident } from '@/types/resident';

const residentStore = useResidentStore()
const isOpen = ref(false);
const isSubmitted = ref(false);

const props = defineProps({
    resident: Object,
})

const residentData = ref<Resident>(props.resident)

function hideDialog () {
    isOpen.value = false;
    isSubmitted.value = false;
};

function onSubmit () {
    isSubmitted.value = true;
    residentStore.updateResident(residentData.value)
    isOpen.value = false
};

</script>
<template>
    <div>
        <Button icon="pi pi-pencil" text class="mr-2" @click="isOpen = true;" />
        <Dialog v-model:visible="isOpen" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <div class="flex flex-col gap-6">
                <!-- <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" /> -->
                <div>
                    <label for="name" class="block font-bold mb-3">Firstname</label>
                    <InputText id="name" v-model.trim="residentData.firstName" required="true" autofocus :invalid="isSubmitted && !residentData.firstName" fluid />
                    <small v-if="isSubmitted && !residentData.firstName" class="text-red-500">firstname is required.</small>
                </div>
                <div>
                    <label for="name" class="block font-bold mb-3">Middle name</label>
                    <InputText id="name" v-model.trim="residentData.middleName" required="true" autofocus :invalid="isSubmitted && !residentData.middleName" fluid />
                    <small v-if="isSubmitted && !residentData.middleName" class="text-red-500">Middle name is required.</small>
                </div>
                <div>
                    <label for="name" class="block font-bold mb-3">Lastname</label>
                    <InputText id="name" v-model.trim="residentData.lastName" required="true" autofocus :invalid="isSubmitted && !residentData.lastName" fluid />
                    <small v-if="isSubmitted && !residentData.lastName" class="text-red-500">Last name is required.</small>
                </div>
            </div>
    
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="onSubmit" />
            </template>
        </Dialog>
    </div>
</template>