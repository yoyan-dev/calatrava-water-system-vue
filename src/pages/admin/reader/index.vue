<script setup lang="ts">
	import { onMounted } from 'vue';
	import ReaderTable from './_components/reader-table.vue';
	import { useResidentStore } from '@/stores/resident';
	import { useReaderStore } from '@/stores/reader';
	import Header from './_components/header.vue';

	const readerStore = useReaderStore()
	const store = useResidentStore();
	onMounted(() => {
		readerStore.fetchReaders()
		store.fetchResidents();
		store.fetchTotalResidents();
	});
</script>

<template>
	<div class="bg-surface-0 dark:bg-surface-900 p-6 border rounded-lg">
		<Header :totalReaders="readerStore.readers.length"/>
		<ReaderTable :readers="store.residents"/>
	</div>
</template>
