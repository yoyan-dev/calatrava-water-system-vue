<script setup lang="ts">
import { ref } from 'vue';

const waterBillDialog = ref(false);

const props = defineProps({
    waterBill: Object,
})

function onSubmit () {
    // toast.add({severity:'success', summary: 'Successful', detail: 'Water Bill Updated', life: 3000});

    // if (waterBill?.value.name?.trim()) {
    //     if (waterBill.value.id) {
    //         waterBill.value.inventoryStatus = waterBill.value.inventoryStatus.value ? waterBill.value.inventoryStatus.value : waterBill.value.inventoryStatus;
    //         waterBills.value[findIndexById(waterBill.value.id)] = waterBill.value;
    //     }
    //     else {
    //         waterBill.value.id = createId();
    //         waterBill.value.code = createId();
    //         waterBill.value.image = 'waterBill-placeholder.svg';
    //         waterBill.value.inventoryStatus = waterBill.value.inventoryStatus ? waterBill.value.inventoryStatus.value : 'INSTOCK';
    //         waterBills.value.push(waterBill.value);
    //         toast.add({severity:'success', summary: 'Successful', detail: 'waterBill Created', life: 3000});
    //     }

    //     waterBillDialog.value = false;
    //     waterBill.value = {};
    // }
};

</script>
<template>
    <div>
        <Button icon="pi pi-pencil" class="mr-2" text severity="success" @click="waterBillDialog = true;" />
        <Dialog v-model:visible="waterBillDialog" :style="{ width: '450px' }" header="waterBill Details" :modal="true">
            <div class="flex flex-col gap-6">
                <img v-if="waterBill.image" :src="`https://primefaces.org/cdn/primevue/images/product/${waterBill.image}`" :alt="waterBill.image" class="block m-auto pb-4" />
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="waterBill.name" required="true" autofocus :invalid="submitted && !waterBill.name" fluid />
                    <small v-if="!waterBill.name" class="text-red-500">Name is required.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="waterBill.description" required="true" rows="3" cols="20" fluid />
                </div>
                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                    <Select id="inventoryStatus" v-model="waterBill.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
                </div>
    
                <div>
                    <span class="block font-bold mb-4">Category</span>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category1" v-model="waterBill.category" name="category" value="Accessories" />
                            <label for="category1">Accessories</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category2" v-model="waterBill.category" name="category" value="Clothing" />
                            <label for="category2">Clothing</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category3" v-model="waterBill.category" name="category" value="Electronics" />
                            <label for="category3">Electronics</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category4" v-model="waterBill.category" name="category" value="Fitness" />
                            <label for="category4">Fitness</label>
                        </div>
                    </div>
                </div>
    
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Price</label>
                        <InputNumber id="price" v-model="waterBill.price" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Quantity</label>
                        <InputNumber id="quantity" v-model="waterBill.quantity" integeronly fluid />
                    </div>
                </div>
            </div>
    
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="waterBillDialog = false;" />
                <Button label="Save" icon="pi pi-check" @click="onSubmit" />
            </template>
        </Dialog>
    </div>
</template>