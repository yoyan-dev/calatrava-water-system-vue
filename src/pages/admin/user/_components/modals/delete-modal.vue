<script setup>
import { ref } from 'vue';

const deleteUsersDialog = ref(false);
const props = defineProps({
    user: Object
})

function deleteUser () {
    // products.value = products.value.filter(val => val.id !== product.value.id);
    // deleteUsersDialog.value = false;
    // product.value = {};
    // toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};

</script>
<template>
    <div>
        <Button icon="pi pi-trash" text  severity="danger" @click="deleteUsersDialog = true" />
        <Dialog v-model:visible="deleteUsersDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ props.product.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteUsersDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteUser" />
            </template>
        </Dialog>
    </div>
</template>