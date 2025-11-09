<template>
	<div class="p-4 md:p-6">
		<Header page-title="Surveys" />
		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap items-center gap-4">
				<Button
					type="button"
					label="Create New Survey"
					icon="pi pi-plus"
					@click="handleSurveyDialog" />
			</div>

			<SurveyCards
				:surveys="store.surveys"
				@openEdiDialog="handleSurveyDialog" />
		</div>
	</div>
</template>
<script setup lang="ts">
	import Header from '@/components/globals/header.vue';
	import SurveyCards from './_components/survey-cards.vue';

	import { useSurveyStore } from '@/stores/survey';
	import { useDialog } from 'primevue';
	import SurveyFormDialog from './_components/survey-form-dialog.vue';
	import { onMounted } from 'vue';

	const store = useSurveyStore();
	const dialog = useDialog();

	const handleSurveyDialog = (data: any = null) => {
		// When @click passes a PointerEvent as the first argument, normalize it to null
		// so calling without explicit data opens the "Create New Survey" dialog.
		if (data instanceof Event) {
			data = null;
		}

		dialog.open(SurveyFormDialog, {
			props: {
				header: data ? 'Edit Survey' : 'Create New Survey',
				style: { width: '90%', maxWidth: '500px' },
				modal: true,
				dismissableMask: true,
				closeOnEscape: true,
			},
			data: {
				survey: data,
			},
		});
	};

	onMounted(() => {
		store.fetchSurveys();
	});
</script>
