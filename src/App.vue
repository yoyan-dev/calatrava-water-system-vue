<script setup lang="ts">
	import { RouterView } from 'vue-router';

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/firebase-messaging-sw.js')
			.then((registration) => {
				console.log(
					'Service Worker registered with scope:',
					registration.scope,
				);
			})
			.catch((error) => {
				console.error('Service Worker registration failed:', error);
			});
	}
</script>

<template>
	<RouterView />
</template>
