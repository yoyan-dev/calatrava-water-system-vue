<script setup>
import { ref } from 'vue';

const deleteProductDialog = ref(false);
const props = defineProps({
    user: Object
})

const deleteProduct = () => {
    // products.value = products.value.filter(val => val.id !== product.value.id);
    // deleteProductDialog.value = false;
    // product.value = {};
    // toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};

</script>
<template>
    <div>
        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteProductDialog = true" />
        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ props.product.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>
    </div>
</template>