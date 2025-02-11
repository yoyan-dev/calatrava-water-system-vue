<template>
  <Button
    icon="pi pi-money-bill"
    severity="primary"
    label="Pay Current Bill"
    size="small"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    modal
    header="Pay Bill"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div>
        <div class="flex justify-center">
            <Image src="https://businessmaker-academy.com/cms/wp-content/uploads/2022/04/Gcash-BMA-QRcode.jpg" alt="Image" width="300" preview />
        </div>
        <span class="text-surface-500 dark:text-surface-400 block mb-2 mt-5">Upload your reciept.</span>
        <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="false" accept="image/*" :maxFileSize="1000000">
            <template #empty>
                <span>Drag and drop files to here to upload.</span>
            </template>
        </FileUpload>
    </div>
  </Dialog>
</template>

<script setup>
    import { ref } from "vue";
    import { useToast } from "primevue/usetoast";
    import { Image } from "primevue";
    const toast = useToast();

    const visible = ref(false);

    const onAdvancedUpload = () => {
        toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };
    
</script>
