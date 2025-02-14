<script setup lang="ts">
	import { ref, onMounted, computed } from 'vue';
	import WaterBill from './_components/water-bill.vue';
	import PayBillModal from './_components/modals/pay-bill-modal.vue';
	import { useCurrentUser } from 'vuefire';
	import { useResidentStore } from '@/stores/resident';
	import type { Resident } from '@/types/resident';
	import type { Billing } from '@/types/billing';
	import { useBillingStore } from '@/stores/billing';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const residentStore = useResidentStore();
	const billingStore = useBillingStore();
	const billShowed = ref('Current');
	const resident = ref({} as Resident);
	const previousBilling = ref<Billing>();
	const currentBilling = ref<Billing>();

	const billing = computed(() => {
		const showing = billShowed.value;
		if (showing.toLowerCase() === 'current') {
			return currentBilling.value;
		} else if (showing.toLowerCase() === 'previous') {
			return previousBilling.value;
		}
	});

	// onMounted(async () => {
	//   const user = useCurrentUser() as any;
	//   if (user.value) {
	//     const residentId = user.value.uid;
	//     await residentStore.fetchResident(residentId);
	//     resident.value = residentStore.resident;

	//     await billingStore.fetchBillingsByAccountNumber(
	//       residentStore.resident.accountNumber as number
	//     );
	//     currentBilling.value = billingStore.billings[0];
	//     previousBilling.value = billingStore.billings[1];

	//     console.log(billingStore.billings);
	//   } else {
	//     console.log("No user is signed in.");
	//     router.push("/");
	//   }
	// });
</script>

<template>
	<div
		class="p-2 md:p-4 lg:p-5"
		v-if="residentStore.isLoading && billingStore.isLoading">
		...Loading
	</div>
	<div
		class="p-2 md:p-4 lg:p-5"
		v-else>
		<div class="p-0 md:p-3 lg:p-6 flex flex-col bg-white border rounded-lg">
			<div class="lg:flex-1 md:flex-1 flex flex-col gap-5 p-5">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-4">
						<div
							class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
							<span class="text-lg font-bold"
								>{{ resident.firstName?.charAt(0).toUpperCase()
								}}{{ resident.lastName?.charAt(0).toUpperCase() }}</span
							>
						</div>
						<div>
							<h2 class="text-lg font-semibold">
								{{ resident.firstName }} {{ resident.middleName }}
								{{ resident.lastName }}
							</h2>
							<p class="text-sm text-gray-500">{{ resident.accountNumber }}</p>
						</div>
					</div>
					<span class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
						>Resident</span
					>
				</div>
				<div>
					<div>
						<h2 class="text-lg font-semibold">Analytics</h2>
						<div class="flex justify-between items-center mt-4">
							<div class="flex items-center gap-2">
								<i class="pi pi-arrow-up text-green-500"></i>
								<p class="text-green-500">
									Your current usage is lower than the previous period by 15%.
								</p>
							</div>
						</div>
						<div class="flex justify-between items-center mt-4">
							<div class="flex items-center gap-2">
								<i class="pi pi-arrow-down text-red-500"></i>
								<p class="text-red-500">
									Your current usage is higher than to the previous period by
									10%.
								</p>
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
							@click="billShowed = 'Current'"
							:disabled="billShowed.toLowerCase() === 'current'"
							size="small"
							text />
						<Button
							icon="pi pi-chevron-right"
							iconPos="right"
							label="previous"
							severity="primary"
							size="small"
							@click="billShowed = 'Previous'"
							:disabled="billShowed.toLowerCase() === 'previous'"
							text />
					</div>
				</div>
				<div v-if="!billing">
					<div class="flex justify-center items-center h-96">
						<div class="text-center">
							<i class="pi pi-exclamation-triangle text-4xl text-slate-500"></i>
							<h1 class="text-xl text-slate-500">No bill found</h1>
							<p class="text-slate-500">
								You have no bill for this period. Please check back later.
							</p>
						</div>
					</div>
				</div>
				<WaterBill
					:billing="billing"
					:resident="resident"
					v-else />
				<div class="flex justify-end">
					<PayBillModal />
				</div>
			</div>
		</div>
	</div>
</template>
