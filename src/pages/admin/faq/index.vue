<script setup lang="ts">
	import FaqList from './_components/faq-list.vue';
	import CreateModal from './_components/modals/create-modal.vue';
</script>
<template>
	<div
		class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg">
		<div class="flex justify-between items-center">
			FAQ (Frequently Asked Questions)
			<CreateModal />
		</div>
		<FaqList />
	</div>
</template>
