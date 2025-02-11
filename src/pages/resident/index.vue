<script setup lang="ts">
	import ResidentLayout from '@/layouts/resident-layout.vue';
	import { RouterView } from 'vue-router';
	import { Toast } from 'primevue';
</script>

<template>
	<ResidentLayout>
		<Toast position="bottom-right" />
		<RouterView />
	</ResidentLayout>
</template>
