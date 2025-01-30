<script setup lang="ts">
	import { useRoute } from 'vue-router';

	const route = useRoute();
	console.log(route.params.uid);
</script>

<template>
	<div>uid: {{ route.params.uid }}</div>
</template>
