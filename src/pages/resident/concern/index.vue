<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import ConcernList from './_components/concern-list.vue';
    import { useConcernStore } from "@/stores/concern";

    const store = useConcernStore();
    const concernMessage = ref('');
    const concernName = ref('');

    onMounted(() => {
        store.getConcerns();
    });

    function submitConcern() {
        const newConcern = {
            id: Date.now().toString(),
            name: concernName.value,
            message: concernMessage.value
        };
        store.addConcern(newConcern);
        concernName.value = '';
        concernMessage.value = '';
    }
</script>
<template>
    <div class="p-2 md:p-4 lg:p-5">
		<div class="flex flex-col gap-5 shadow rounded-border ">
            <div class="shadow rounded-border p-2 md:p-3 lg:p-6  bg-white ">
                <div
                    class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
                    Send a concern
                </div>
                <div class="mb-2">
                    <InputText v-model="concernName" class="w-full" placeholder="Enter your name"/>
                </div>
                <div>
                    <Textarea
                        v-model="concernMessage"
                        rows="5"
                        class="bg-gray-100 w-full"
                        placeholder="Enter your concern here..."
                    />
                </div>
                <div class="flex justify-end mt-2">
                    <Button label="Send" severity="primary" icon="pi pi-send" iconPos="right" @click="submitConcern"/>
                </div>
            </div>
            <div class="shadow rounded-border p-2 md:p-3 lg:p-6  bg-white ">
                <div
                    class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
                    List of concerns
                </div><hr/>
                <ConcernList :concerns="store.concerns"/>
            </div>
        </div>
    </div>
</template>
