<template>
	<div class="p-4 md:p-6">
		<Header page-title="Surveys" />
	</div>
</template>
<script setup lang="ts">
	import Header from '@/components/globals/header.vue';
	import { useSurveyStore } from '@/stores/survey';

	const store = useSurveyStore();
</script>
