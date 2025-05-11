<script setup lang="ts">
	import { onMounted } from 'vue';
	import { useFaqStore } from '@/stores/faq';

	const store = useFaqStore();
	onMounted(() => {
		store.fetchFaqs();
	});
</script>
<template>
	<div class="card">
		<div></div>
		<span
			class="text-sm text-gray-600"
			v-if="store.totalFaqs <= 0"
			>No faq found.</span
		>
		<Accordion v-else>
			<AccordionPanel
				v-for="faq in store.faqs"
				:key="faq.question"
				:value="faq.uid">
				<AccordionHeader>{{ faq.question }}</AccordionHeader>
				<AccordionContent>
					<div>
						<p class="m-0">{{ faq.answer }}</p>
					</div>
				</AccordionContent>
			</AccordionPanel>
		</Accordion>
	</div>
</template>
