<script setup lang="ts">
	import Header from './_components/header.vue';
	import BillingTable from './_components/billing-table.vue';
	import ImportModal from './_components/modals/import-modal.vue';
	import SearchInput from './_components/search-input.vue';

	const onSelected = (data: Array<any>) => {
		console.log([...data]);
	};
</script>
<template>
	<div class="p-4 md:p-6">
		<Header />
		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap justify-between items-center gap-4">
				<SearchInput />
				<ImportModal />
			</div>

			<div>
				<BillingTable @selected="onSelected" />
			</div>
		</div>
	</div>
</template>
