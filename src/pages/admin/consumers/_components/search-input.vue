<template>
	<div>
		<Message
			class="mb-1"
			size="small"
			severity="secondary"
			variant="simple"
			>Enter receipt no., account no., or customer name to search.</Message
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
	import { useConsumerStore } from '@/stores/consumer';
	import { debounceFilter, watchWithFilter } from '@vueuse/core';

	const store = useConsumerStore();

	watchWithFilter(
		() => store.searchQuery,
		() => {
			if (!store.searchQuery) {
				store.fetchPaginateConsumers({
					limit: 10,
					offset: 0,
				});
				return;
			}

			store.fetchSearchConsumers(store.searchQuery);
		},
		{
			eventFilter: debounceFilter(500, { maxWait: 1000 }),
		},
	);
</script>
