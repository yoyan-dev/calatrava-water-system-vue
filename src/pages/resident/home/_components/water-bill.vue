<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import ViewWaterBillModal from "@/pages/resident/home/_components/modals/view-bill-modal.vue";

</script>
<template>
    <div>
        <div class="bg-white p-5 border rounded-lg flex flex-col gap-3">
            <div class="flex justify-between">
                <h1 class="font-semibold text-xl">263623-32732</h1>
                <ViewWaterBillModal/>
            </div>
            <hr>
            <div class="flex justify-between">
                <div>
                    <label class="text-surface-500">Name</label><br>
                    <Tag severity="secondary" value="Nenwell Era"></Tag>
                </div>
                <div>
                    <label class="text-surface-500">Class Type</label><br>
                    <Tag severity="secondary" value="Residential"></Tag>
                </div>
            </div>
            <div>
                <label class="text-surface-500">Bill Period</label><br>
                <span>January 01, 2025 - January 31, 2025"</span>
            </div>
            <div class="flex justify-between">
                <div>
                    <label class="text-surface-500">Due Date</label><br>
                    <span>February 15, 2025</span>
                </div>
                <div>
                    <label class="text-surface-500">Amount</label><br>
                    <span>P 100.00</span>
                </div>
            </div>
            <div class="flex justify-end">
                <div>
                    <label class="text-surface-500">Status</label><br>
                    <Tag severity="danger" value="Unpaid"></Tag>
                </div>
            </div>

        </div>
    </div>
</template>

