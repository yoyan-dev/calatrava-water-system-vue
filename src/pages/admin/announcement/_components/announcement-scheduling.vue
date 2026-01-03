<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<div>
			<label class="block text-sm font-medium mb-1"
				>Publish At (Optional)</label
			>
			<DatePicker
				v-model="localPublished"
				showTime
				hourFormat="12"
				class="w-full" />
		</div>
		<div>
			<label class="block text-sm font-medium mb-1"
				>Expires At (Optional)</label
			>
			<DatePicker
				v-model="localExpires"
				showTime
				hourFormat="12"
				class="w-full" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const localPublished = defineModel<Date | null>('publishedAt');
	const localExpires = defineModel<Date | null>('expiresAt');
</script>
