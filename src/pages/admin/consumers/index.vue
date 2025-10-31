<template>
	<div class="p-4 md:p-6">
		<Header page-title="Consumers" />
		<ConsumersTable />
	</div>
</template>
<script setup lang="ts">
	import Header from '@/components/globals/header.vue';
	import ConsumersTable from './_components/consumers-table.vue';
</script>
