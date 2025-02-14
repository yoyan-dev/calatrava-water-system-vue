<script setup lang="ts">
	import { onMounted } from 'vue';
	import ReaderTable from './_components/reader-table.vue';
	import { useResidentStore } from '@/stores/resident';
	import { useReaderStore } from '@/stores/reader';
	import Header from './_components/header.vue';

	const store = useReaderStore();
	onMounted(() => {
		store.fetchReaders();
	});
</script>

<template>
	<div class="bg-surface-0 dark:bg-surface-900 p-6 border rounded-lg">
		<Header :totalReaders="store.readers.value.length" />
		<ReaderTable :readers="store.readers.value" />
	</div>
</template>
