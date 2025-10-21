<script setup lang="ts">
	import { useBillingStore } from '@/stores/billing';
	import Header from './_components/header.vue';
	import BillingTable from './_components/billing-table.vue';
	import { onMounted } from 'vue';

	const store = useBillingStore();
	const onToggled = (event: Event, data: any) => {
		// Your toggle logic here
	};

	onMounted(() => {
		store.fetchBillings();
	});
</script>
<template>
	<div class="p-4 md:p-6">
		<Header />
		<div class="flex flex-col gap-4">
			<div>
				<BillingTable
					:value="store.billings"
					:loading="store.isLoading"
					:totalRecords="store.totalBillings"
					:rows="10"
					@page="(e: any) => (store.page = e.page + 1)"
					@toggle="onToggled" />
			</div>
		</div>
	</div>
</template>
