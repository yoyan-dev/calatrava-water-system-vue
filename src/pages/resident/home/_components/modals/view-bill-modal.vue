
<template>
    <Button
        icon="pi pi-money-bill"
        severity="primary"
        label="View bill"
        size="small"
        @click="visible = true" 
        text/>
    <Dialog v-model:visible="visible" header="Bill Details"  modal  :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="flex gap-3 items-center pb-5">
            <Avatar image="./logo.jpeg" size="xlarge" shape="circle" />
            <div class="text-cente">
                <h1 class="text-xl font-semibold md:text-2xl lg:text-2xl">Calatrava Water System</h1>
                <span class="text-sm text-slate-500">Calatrava, Negros Occidental</span>
            </div>
        </div>
        <div class="flex flex-col gap-1 px-5">
            <span>Account Number: 2616352</span>
            <span>Name:           Nenwell Era</span>
            <span>Bill Number:    2616352</span>
            <span>Address:        Calatrava</span>
            <span>Meter No:       2616352</span>
            <span>Stub out:       2616352</span>
            <span>Class type:     Residential</span>
            <span>Billing Month:      January 01, 2025</span>
            <span>Billing Period:     January 01, 2025 to January 30, 2025</span>
            <span>Reading Date:       January 01, 2025</span>
            <span>Due Date:           January 01, 2025</span>
            <span>Disconnection Date: January 01, 2025</span>
            <div class="flex flex-col gap-1">
                <h1 class="font-semibold">Reading</h1>
                <span>Previous Reading ---- 3536</span>
                <span>Current Reading ----- 3536</span>
                <span>consumption --------- 3536</span>
                <hr>
                <span>Current Charge ------------- 3536</span>
                <span>Environmental Fee ---------- 3536</span>
                <span>Water Bill Arrears --------- 3536</span>
                <span>Env. fee Arrears ----------- 3536</span>
                <span>Amortization --------------- 3536</span>
                <span>Total Amount Due ----------- 3536</span>
                <span>UNTIL DUE date ------------- 3536</span>
            </div>
            <span>Meter Reader: Joselito B. Rodriguez</span>
            <div class="text-center py-5">
                *Please pay your water bill on or befor due date. <br>
                Water service will be disconnected if payment<br>
                is not made three (3) days before due date*<br>

            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>
