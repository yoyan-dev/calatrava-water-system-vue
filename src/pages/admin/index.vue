<script setup lang="ts">
	import AdminLayout from '@/layouts/admin-layout.vue';
	import { Toast } from 'primevue';
</script>

<template>
	<AdminLayout>
		<Toast position="bottom-right" />
		<RouterView />
	</AdminLayout>
</template>
