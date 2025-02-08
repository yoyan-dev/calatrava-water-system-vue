<script setup lang="ts">

const props = defineProps<{
	totalResident: number;
}>();

</script>
<template>
	<div class="flex justify-between">
		<div>
			<div class="text-3xl text-surface-900 dark:text-surface-0 mb-2">
				Residents
			</div>
			<div class="font-medium text-surface-500 dark:text-surface-300 mb-4">
				Manage Resident List
			</div>
		</div>
		<div>
			<div class="text-sm px-3 py-2 text-slate-600 bg-gray-50 rounded-full">
				{{ totalResident }} Residents
			</div>
		</div>
	</div>
</template>
