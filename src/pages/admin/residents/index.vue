<script setup lang="ts">
	import { onMounted, watchEffect } from 'vue';
	import ResidentTable from './_components/resident-table.vue';
	import { useResidentStore } from '@/stores/resident';
	import Header from './_components/header.vue';

	const store = useResidentStore();
	onMounted(() => {
		store.fetchResidents();
	});
</script>

<template>
	<div
		class="p-4 md:p-6">
		<Header :totalResident="store.totalResidents" />
		<ResidentTable :residents="store.residents" />
	</div>
</template>
