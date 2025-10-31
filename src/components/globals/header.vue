<script setup lang="ts">
	const props = defineProps<{
		pageTitle: string;
		entityCount?: number | null;
	}>();
</script>
<template>
	<div class="flex justify-between items-center gap-4 mb-4">
		<div class="text-xl">{{ pageTitle }}</div>
		<div v-if="entityCount">
			<span class="mr-2">Records:</span>
			<span class="text-primary font-semibold">{{ entityCount }}</span>
		</div>
	</div>
</template>
