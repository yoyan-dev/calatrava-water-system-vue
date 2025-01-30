<script setup>
import { ref, onMounted } from "vue";

</script>
<template>
    <div>
        <div class="bg-white p-5 rounded-md flex flex-col gap-3">
            <h1 class="font-semibold text-xl">263623-32732</h1>
            <hr>
            <div class="flex justify-between">
                <div>
                    <label class="text-surface-500">Name</label><br>
                    <span>Jerryme Maglinte</span>
                </div>
                <div>
                    <label class="text-surface-500">Class Type</label><br>
                    <span>Residential</span>
                </div>
            </div>
            <div>
                <label class="text-surface-500">Bill Period</label><br>
                <span>January 01, 2025 - January 31, 2025</span>
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
                    <span>Unpaid</span>
                </div>
            </div>

        </div>
    </div>
</template>

