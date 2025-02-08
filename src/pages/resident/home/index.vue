<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import WaterBill from './_components/water-bill.vue';
	import PayBillModal from './_components/modals/pay-bill-modal.vue';
	import { useCurrentUser } from 'vuefire';

	const user = useCurrentUser();
	const billShowed = ref('current');

</script>

<template>
	<div class="p-2 md:p-4 lg:p-5">
		<div
			class="p-0 md:p-3 lg:p-6 flex flex-col md:flex-row lg:flex-row bg-white border rounded-lg">
			<div class="lg:flex-1 md:flex-1 flex flex-col gap-5 p-5">
				<div class="flex justify-between items-center">
					<div
						class="text-2xl  font-medium text-surface-900 dark:text-surface-0 mb-2">
						Bill Details
					</div>
					<span class="text-slate-500">January 01, 2025</span>
				</div>
				<div >
					<div
						class="flex items-center gap-4 px-3 pr-7 shadow-sm border rounded-md">
						<Avatar
							icon="pi pi-user"
							style="background-color: #dee9fc; color: #1a2551"
							shape="circle" />
						<div>
							<h1 class="font-semibold">Nenwell Era</h1>
							<span class="text-gray-400">0234-1823</span>
						</div>
					</div>
				</div>
				<div>
					<div>
						<h2 class="text-lg font-semibold">Analytics</h2>
						<div class="flex justify-between items-center mt-4">
							<div class="flex items-center gap-2">
								<i class="pi pi-arrow-up text-green-500"></i>
								<p class="text-green-500">Your current usage is lower than the previous period by 15%.</p>
							</div>
						</div>
						<div class="flex justify-between items-center mt-4">
							<div class="flex items-center gap-2">
								<i class="pi pi-arrow-down text-red-500"></i>
								<p class="text-red-500">Your current usage is higher than to the previous period by 10%.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				class="lg:flex-1 md:flex-1 bg-gray-50 rounded-md p-1 md:p-3 lg:p-5 flex flex-col gap-5">
				<div class="card bg-white border rounded-md">
					<div>
						<h1 class="text-xl text-center">{{ billShowed }} bill</h1>
					</div>
					<div class="flex justify-center">
						<Button
							icon="pi pi-chevron-left"
							label="current"
							class="mr-2"
							severity="primary"
							@click="billShowed = 'current'"
							:disabled="billShowed === 'current'"
							size="small"
							text />
						<Button
							icon="pi pi-chevron-right"
							iconPos="right"
							label="previous"
							severity="primary"
							size="small"
							@click="billShowed = 'previous'"
							:disabled="billShowed === 'previous'"
							text />
					</div>
				</div>
				<WaterBill />
				<PayBillModal/>
			</div>
		</div>
	</div>
</template>
