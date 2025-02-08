<script setup lang="ts">
	import { onMounted } from 'vue';
	import ResidentTable from './_components/resident-table.vue';
	import { useResidentStore } from '@/stores/resident';
	import Header from './_components/header.vue';

	const store = useResidentStore();
	onMounted(() => {
		store.fetchResidents();
		store.fetchTotalResidents();
	});
</script>

<template>
	<div class="bg-surface-0 dark:bg-surface-900 p-6 border rounded-lg">
		<Header :totalResident="store.residents.length"/>
		<ResidentTable :residents="store.residents"/>
	</div>
</template>
