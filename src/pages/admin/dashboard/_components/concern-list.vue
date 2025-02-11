<script setup lang="ts">
	import { ref } from 'vue';

	const props = defineProps<{
		concerns: any;
	}>();

	const responsiveOptions = ref([
		{
			breakpoint: '1400px',
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: '1199px',
			numVisible: 3,
			numScroll: 1,
		},
		{
			breakpoint: '767px',
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: '575px',
			numVisible: 1,
			numScroll: 1,
		},
	]);
</script>
<template>
	<div class="card">
		<Carousel
			:value="concerns"
			:numVisible="3"
			:numScroll="3"
			:autoplayInterval="3000"
			autoplay
			infinite
			:responsiveOptions="responsiveOptions">
			<template #item="slotProps">
				<div
					class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
					<div class="flex gap-2 border rounded-md p-2">
						<Avatar
							icon="pi pi-user"
							class="mr-2"
							size="normal" />
						<div>
							<h1 class="text-lg font-semibold">{{ slotProps.data.firstName }}</h1>
						</div>
					</div>
					<div>
						<p class="text-sm text-surface-400 dark:text-surface-700">
							{{ slotProps.data.content }}
						</p>
					</div>
				</div>
			</template>
		</Carousel>
	</div>
</template>
