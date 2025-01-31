<script setup lang="ts">
	import { VisXYContainer, VisGroupedBar, VisAxis } from '@unovis/vue';

	const props = defineProps<{ data: any }>();
	const y = [(d: any) => d.y, (d: any) => d.y1, (d: any) => d.y2];
</script>

<template>
	<div class="w-full">
		<VisXYContainer :data="props.data">
			<VisGroupedBar
				:x=" (d: any) => d.x"
				:y="y" />
			<VisAxis
				type="x"
				label="label"
				:numTicks="props.data.length" />
			<VisAxis type="y" />
		</VisXYContainer>
	</div>
</template>
