<script setup lang="ts">
	import { VisXYContainer, VisLine, VisAxis } from '@unovis/vue';

	const props = defineProps<{ data: any }>();
</script>

<template>
	<div class="w-full flex flex-col gap-8">
		<label class="text-xl font-bold">Name this roland</label>
		<VisXYContainer>
			<VisLine
				:data="props.data"
				:x="(d: any) => d.x"
				:y="(d: any) => d.y" />
			<VisAxis
				type="x"
				label="Month" />
			<VisAxis
				type="y"
				label="Income" />
		</VisXYContainer>
	</div>
</template>
