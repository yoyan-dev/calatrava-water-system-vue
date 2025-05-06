<script setup lang="ts">
	import { ref, nextTick, defineAsyncComponent, onMounted } from 'vue';
	import type { Faq } from '@/types/faq';
	import { useDialog } from 'primevue';
	import { useFaqStore } from '@/stores/faq';

	const store = useFaqStore();
	const dialog = useDialog();

	const updateFaq = defineAsyncComponent(
		() => import('./modals/update-modal.vue'),
	);

	const deleteFaq = defineAsyncComponent(
		() => import('./modals/delete-modal.vue'),
	);

	onMounted(() => {
		store.fetchFaqs();
	});
</script>
<template>
	<div class="card">
		<div></div>
		<span>No faq found.</span>
		<Accordion>
			<AccordionPanel
				v-for="faq in store.faqs"
				:key="faq.question"
				:value="faq.uid">
				<AccordionHeader>{{ faq.question }}</AccordionHeader>
				<AccordionContent>
					<div>
						<p class="m-0">{{ faq.answer }}</p>
						<div class="flex justify-between items-center gap-4 mt-4">
							<span class="text-sm text-gray-400">January 01, 2025</span>
							<div>
								<Button
									severity="primary"
									icon="pi pi-pen-to-square"
									label="edit"
									size="small"
									text
									@click="
										() => {
											dialog.open(updateFaq, {
												props: {
													header: 'Edit FAQ',
													style: {
														width: '30rem',
													},
													breakpoints: { '1199px': '75vw', '575px': '90vw' },
													modal: true,
												},
												data: {
													faq: faq,
												},
											});
										}
									" />
								<Button
									severity="danger"
									icon="pi pi-trash"
									label="delete"
									size="small"
									text
									@click="
										() => {
											dialog.open(deleteFaq, {
												props: {
													header: 'Confirim delete',
													style: {
														width: '30rem',
													},
													breakpoints: { '1199px': '75vw', '575px': '90vw' },
													modal: true,
												},
												data: {
													uid: faq.uid,
												},
											});
										}
									" />
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionPanel>
		</Accordion>
	</div>
</template>
