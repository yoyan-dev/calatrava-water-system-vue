<script setup lang="ts">
	import BarChart from './_components/bar-chart.vue';
	import LineChart from './_components/line-chart.vue';

	const barData = [
		{ x: 1, y: 10, y1: 20, y2: 30 },
		{ x: 2, y: 20, y1: 30, y2: 40 },
		{ x: 3, y: 30, y1: 40, y2: 50 },
		{ x: 4, y: 40, y1: 50, y2: 60 },
		{ x: 5, y: 50, y1: 60, y2: 70 },
	];

	const lineData = [
		{ x: 0, y: 0 },
		{ x: 1, y: 2 },
		{ x: 2, y: 1 },
	];
</script>

<template>
	<div>Dashboard</div>
	<BarChart :data="barData" />
	<LineChart :data="lineData" />
</template>
