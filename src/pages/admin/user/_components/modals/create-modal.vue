<script setup>
import { ref } from 'vue';

const isOpen = ref(false)

const user = {
    name: '',
}

function onSubmit () {
    toast.add({severity:'success', summary: 'Successful', detail: 'user Updated', life: 3000});

};

</script>
<template>
    <div>
        <Button label="New" icon="pi pi-plus" class="mr-2" @click="isOpen = true;" />
        <Dialog v-model:visible="isOpen" :style="{ width: '450px' }" header="user Details" :modal="true">
            <div class="flex flex-col gap-6">
                <!-- <img v-if="user.image" :src="`https://primefaces.org/cdn/primevue/images/user/${user.image}`" :alt="user.image" class="block m-auto pb-4" /> -->
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="user.name" required="true" autofocus :invalid="submitted && !user.name" fluid />
                    <!-- <small v-if="submitted && !user.name" class="text-red-500">Name is required.</small> -->
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="user.description" required="true" rows="3" cols="20" fluid />
                </div>
                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                    <Select id="inventoryStatus" v-model="user.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
                </div>
    
                <div>
                    <span class="block font-bold mb-4">Category</span>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category1" v-model="user.category" name="category" value="Accessories" />
                            <label for="category1">Accessories</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category2" v-model="user.category" name="category" value="Clothing" />
                            <label for="category2">Clothing</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category3" v-model="user.category" name="category" value="Electronics" />
                            <label for="category3">Electronics</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category4" v-model="user.category" name="category" value="Fitness" />
                            <label for="category4">Fitness</label>
                        </div>
                    </div>
                </div>
    
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Price</label>
                        <InputNumber id="price" v-model="user.price" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Quantity</label>
                        <InputNumber id="quantity" v-model="user.quantity" integeronly fluid />
                    </div>
                </div>
            </div>
    
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="isOpen = false" />
                <Button label="Save" icon="pi pi-check" @click="onSubmit" />
            </template>
        </Dialog>
    </div>
</template>