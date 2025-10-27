<template>
	<div>
		<Message
			class="mb-1"
			size="small"
			severity="secondary"
			variant="simple"
			>Enter bill no., account no., or customer name to search.</Message
		>
		<IconField>
			<InputIcon>
				<i class="pi pi-search" />
			</InputIcon>
			<InputText
				v-model="store.searchQuery"
				placeholder="Search keywords" />
		</IconField>
	</div>
</template>
<script setup lang="ts">
	import { useBillingStore } from '@/stores/billing';
	import { debounceFilter, watchWithFilter } from '@vueuse/core';

	const store = useBillingStore();

	watchWithFilter(
		() => store.searchQuery,
		() => {
			if (!store.searchQuery) {
				store.fetchPaginateBillings({
					limit: 10,
					offset: 0,
				});
				return;
			}

			store.fetchSearchBillings(store.searchQuery);
		},
		{
			eventFilter: debounceFilter(500, { maxWait: 1000 }),
		},
	);
</script>
