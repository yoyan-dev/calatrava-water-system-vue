<script setup lang="ts">

const props = defineProps<{
	totalBilling: number;
}>();

</script>
<template>
	<div class=" md:text-2xl text-xl text-surface-900 dark:text-surface-0 mb-2">
		Billings
	</div>
	<div>
		<div class="text-sm px-3 py-2 text-slate-600 bg-gray-50 rounded-full">
			{{ totalBilling }} bills
		</div>
	</div>
</template>
