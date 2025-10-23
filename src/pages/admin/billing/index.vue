<script setup lang="ts">
	import Header from './_components/header.vue';
	import BillingTable from './_components/billing-table.vue';
	import ImportModal from './_components/modals/import-modal.vue';
</script>
<template>
	<div class="p-4 md:p-6">
		<Header />
		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap justify-end">
				<ImportModal />
			</div>

			<div>
				<BillingTable />
			</div>
		</div>
	</div>
</template>
