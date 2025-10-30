<template>
	<div>
		<Message
			class="mb-1"
			size="small"
			severity="secondary"
			variant="simple"
			>Enter account no., or reference no. to search.</Message
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
	import { useLedgerStore } from '@/stores/ledger';
	import { debounceFilter, watchWithFilter } from '@vueuse/core';

	const store = useLedgerStore();

	watchWithFilter(
		() => store.searchQuery,
		() => {
			if (!store.searchQuery) {
				store.fetchPaginateLedgers({
					limit: 10,
					offset: 0,
				});
				return;
			}

			store.fetchSearchLedgers(store.searchQuery);
		},
		{
			eventFilter: debounceFilter(500, { maxWait: 1000 }),
		},
	);
</script>
