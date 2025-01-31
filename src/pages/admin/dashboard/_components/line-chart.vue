<script setup lang="ts">
	import { VisXYContainer, VisLine, VisAxis } from '@unovis/vue';

	const props = defineProps<{ data: any }>();
</script>

<template>
	<div class="w-full">
		<VisXYContainer>
			<VisLine
				:data="props.data"
				:x="(d: any) => d.x"
				:y="(d: any) => d.y" />
			<VisAxis type="x" />
			<VisAxis type="y" />
		</VisXYContainer>
	</div>
</template>
