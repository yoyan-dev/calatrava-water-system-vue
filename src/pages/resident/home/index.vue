<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { ProductService } from '@/service/ProductService';
	import WaterBill from './_components/water-bill.vue';
	import { useCurrentUser } from 'vuefire';

	const user = useCurrentUser();

	onMounted(() => {
		ProductService.getProductsMini().then(
			(data: any) => (products.value = data),
		);
	});

	const products = ref();

	const value = ref('Current');
	const options = ref(['Current', 'Previous']);
</script>

<template>
	<div class="p-2 md:p-4 lg:p-5">
		<div
			class="p-0 md:p-3 lg:p-6 flex flex-col md:flex-row lg:flex-row bg-white border rounded-lg">
			<div class="lg:flex-1 md:flex-1 flex flex-col gap-5 p-5">
				<div class="flex justify-between items-center">
					<div
						class="text-2xl font-medium text-surface-900 dark:text-surface-0 mb-2">
						Bill Details
					</div>
					<Tag
						severity="secondary"
						value="January 01, 2025"></Tag>
				</div>
				<div class="flex justify-between items-center">
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
					<Button
						label="Pay Bill"
						size="small"
						severity="primary"
						icon="pi pi-money-bill" />
				</div>
			</div>
			<div
				class="lg:flex-1 md:flex-1 bg-gray-50 rounded-md p-5 flex flex-col gap-5">
				<div class="card">
					<Toolbar>
						<template #start>
							<div>
								<h1 class="text-xl">Current Bill</h1>
							</div>
						</template>
						<template #end>
							<Button
								icon="pi pi-chevron-left"
								label="current"
								class="mr-2"
								severity="primary"
								text />
							<Button
								icon="pi pi-chevron-right"
								iconPos="right"
								label="previous"
								severity="primary"
								text />
						</template>
					</Toolbar>
				</div>
				<WaterBill />
			</div>
		</div>
	</div>
</template>
