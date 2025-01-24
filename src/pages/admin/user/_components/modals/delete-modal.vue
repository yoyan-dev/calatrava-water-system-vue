<script setup lang="ts">
import { ref } from 'vue';
import { useResidentStore } from '@/stores/residentStore';
import { useToast } from 'primevue/usetoast';

const toast = useToast()
const residentStore = useResidentStore()

const deleteResidentDialog = ref(false);
const props = defineProps({
    resident: Object
})

function deleteResident () {
    residentStore.deleteResident(props.resident.id)
    console.log(props.resident.id)
    toast.add({severity:'success', summary: 'Successful', detail: 'Resident Deleted', life: 3000});
    deleteResidentDialog.value = false;
};

</script>
<template>
    <div>
        <Button icon="pi pi-trash" text  severity="danger" @click="deleteResidentDialog = true" />
        <Dialog v-model:visible="deleteResidentDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="resident"
                    >Are you sure you want to delete <b>{{ props.resident.firstName }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteResidentDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteResident" />
            </template>
        </Dialog>
    </div>
</template>