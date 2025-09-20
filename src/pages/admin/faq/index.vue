<script setup lang="ts">
	import FaqList from './_components/faq-list.vue';
	import CreateModal from './_components/modals/create-modal.vue';
</script>
<template>
	<div
		class="p-4 md:p-6">
		<div class="flex justify-between items-center">
			<h1 class="text-xl font-bold text-surface-900 dark:text-surface-0">
				FAQ
				<span class="text-sm font-light"
					>(Frequently Asked Questions)</span
				>
			</h1>

			<CreateModal />
		</div>
		<FaqList />
	</div>
</template>
