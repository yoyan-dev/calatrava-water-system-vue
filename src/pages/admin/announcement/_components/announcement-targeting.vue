<template>
	<div>
		<label class="block text-sm font-medium mb-2">
			Target Zones (Optional)
			<span class="text-xs text-surface-500 ml-2"
				>(Leave empty = send to all)</span
			>
		</label>
		<MultiSelect
			v-model="local"
			:options="options"
			optionLabel="name"
			optionValue="id"
			filter
			:loading="loading"
			display="chip"
			placeholder="Select zones..."
			class="w-full" />
	</div>
</template>

<script setup lang="ts">
	import { MultiSelect } from 'primevue';
	import { useAreaStore } from '@/stores/area';
	import { computed, onMounted, ref } from 'vue';

	const store = useAreaStore();
	const local = defineModel<string[] | null>('targetZones');
	const loading = ref(true);
	const options = computed(() => store.areas);

	onMounted(async () => {
		await store.fetchActiveAreas();
		loading.value = false;
	});
</script>
