<script setup lang="ts">
import { ref } from 'vue';

const deleteWaterBillDialog = ref(false);
const props = defineProps({
    waterBill: Object
})

function deleteWaterBill () {
    // waterBills.value = waterBills.value.filter(val => val.id !== waterBill.value.id);
    // deleteWaterBillDialog.value = false;
    // waterBill.value = {};
    // toast.add({severity:'success', summary: 'Successful', detail: 'waterBill Deleted', life: 3000});
};

</script>
<template>
    <div>
        <Button icon="pi pi-trash" severity="danger" text @click="deleteWaterBillDialog = true" />
        <Dialog v-model:visible="deleteWaterBillDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="waterBill"
                    >Are you sure you want to delete <b>{{ props.waterBill.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteWaterBillDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteWaterBill" />
            </template>
        </Dialog>
    </div>
</template>