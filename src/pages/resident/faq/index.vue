<script setup lang="ts">
	import FaqList from './_components/faq-list.vue';
</script>
<template>
	<div
		class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0">
				FAQ
				<span class="text-sm text-gray-600 font-light"
					>(Frequently Asked Questions)</span
				>
			</h1>
		</div>
		<FaqList />
	</div>
</template>
