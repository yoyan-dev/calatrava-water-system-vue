<template>
	<div class="p-4 md:p-6">
		<div v-if="survey">
			<!-- Survey Info -->
			<Card class="mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
				<template #title>
					<div class="flex items-center justify-between">
						<span
							class="text-xl font-semibold text-gray-900 dark:text-gray-100">
							{{ survey?.title }}
						</span>
						<Button
							type="button"
							icon="pi pi-pencil"
							label="Edit"
							severity="secondary"
							text
							size="small"
							class="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
							@click="openEditDialog(survey)" />
					</div>
				</template>
				<template #subtitle>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						{{ survey?.description || 'No description' }}
					</p>
				</template>
				<template #content>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
						<div>
							<span class="font-medium text-gray-700 dark:text-gray-300">
								Responses:
							</span>
							<p class="font-semibold text-gray-900 dark:text-gray-100">
								{{ survey?.responsesCount || 0 }}
							</p>
						</div>
						<div>
							<div class="font-medium text-gray-700 dark:text-gray-300">
								Status:
							</div>

							<Tag
								:value="survey?.status"
								:severity="statusSeverity(survey?.status || '')"
								rounded />
						</div>
					</div>
				</template>
			</Card>

			<!-- Questions Section -->
			<Card class="shadow-sm border border-gray-200 dark:border-gray-700">
				<template #title>
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Questions
						</h3>
						<Button
							label="Add Question"
							icon="pi pi-plus"
							size="small"
							@click="openQuestionDialog()" />
					</div>
				</template>

				<template #content>
					<!-- Empty State -->
					<div
						v-if="!survey.questions?.length"
						class="text-center py-8">
						<i
							class="pi pi-question-circle text-5xl text-gray-300 dark:text-gray-600 mb-3"></i>
						<p class="text-gray-500 dark:text-gray-400">No questions yet</p>
						<Button
							label="Add Your First Question"
							text
							class="mt-3"
							@click="openQuestionDialog()" />
					</div>

					<!-- Questions List -->
					<div
						v-else
						class="space-y-3">
						<div
							v-for="q in survey.questions"
							:key="q.id">
							<div
								class="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/40 transition-colors">
								<Badge>{{ q.order }}</Badge>
								<i
									class="pi pi-grip-vertical drag-handle text-gray-400 dark:text-gray-500 cursor-move"></i>
								<div class="flex-1">
									<div class="flex items-center gap-2">
										<i
											:class="questionIcon(q.type)"
											class="text-primary"></i>
										<span class="font-medium text-gray-900 dark:text-gray-100">
											{{ q.label }}
										</span>
										<Tag
											v-if="q.required"
											value="Required"
											severity="warn"
											rounded
											class="text-xs" />
									</div>
									<p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
										{{ q.type }} •
										{{
											q.options?.length
												? `${q.options.length} option${
														q.options.length > 1 ? 's' : ''
												  }`
												: 'Open text'
										}}
									</p>
									<div class="mt-2">
										<!-- Previews -->
										<div
											v-if="q.options?.length"
											class="space-y-1">
											<div
												v-for="(opt, i) in q.options"
												:key="i"
												class="text-xs">
												<div class="flex items-center gap-2">
													<i
														class="pi pi-circle-off text-gray-400 dark:text-gray-500"></i>
													<span class="text-gray-700 dark:text-gray-300">
														{{ opt }}
													</span>
												</div>
											</div>
										</div>

										<!-- Previews -->
										<div v-if="q.type === 'RATING'">
											<label
												class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
												>Scale</label
											>
											<div class="flex items-center gap-4 text-sm">
												<span>1</span>
												<i class="pi pi-star text-yellow-500"></i>
												<span class="font-medium">to</span>
												<i class="pi pi-star text-yellow-500"></i>
												<span>5</span>
											</div>
										</div>

										<div v-if="q.type === 'NPS'">
											<label
												class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
												>Scale (0–10)</label
											>
											<div class="flex items-center gap-2 text-sm">
												<span>Not at all likely</span>
												<div class="flex gap-1">
													<Tag
														v-for="n in 11"
														:key="n"
														:value="n - 1"
														severity="info"
														rounded
														class="text-xs" />
												</div>
												<span>Extremely likely</span>
											</div>
										</div>
									</div>
								</div>
								<div class="flex gap-1">
									<Button
										icon="pi pi-pencil"
										text
										size="small"
										@click.stop="openQuestionDialog(q)" />
									<Button
										icon="pi pi-trash"
										text
										severity="danger"
										size="small"
										@click.stop="deleteQuestion(q.id)" />
								</div>
							</div>
						</div>
					</div>
				</template>
			</Card>
		</div>

		<!-- Survey Not Found -->
		<div
			v-else
			class="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
			<div class="relative mb-8">
				<i class="pi pi-exclamation-triangle text-8xl text-primary-200"></i>
				<div class="absolute inset-0 flex items-center justify-center">
					<i class="pi pi-search text-4xl text-primary-500 animate-ping"></i>
				</div>
			</div>

			<h1
				class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
				Survey Not Found
			</h1>

			<p
				class="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-6 leading-relaxed">
				We couldn't find the survey you're looking for. It may have been
				deleted, moved, or the link is incorrect.
			</p>

			<div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
				<Button
					label="Back to Surveys"
					icon="pi pi-arrow-left"
					severity="primary"
					class="w-full sm:w-auto justify-center"
					@click="$router.push('/admin/surveys')" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { useSurveyStore } from '@/stores/survey';
	import { useConfirm, useDialog } from 'primevue';
	import QuestionDialog from './_components/question-dialog.vue';
	import SurveyFormDialog from './_components/survey-form-dialog.vue';

	const route = useRoute();
	const store = useSurveyStore();
	const $dialog = useDialog();
	const $confirm = useConfirm();
	const survey = computed(() => store.survey);
	const localQuestions = ref<any[]>([]);

	// Track changes
	const originalQuestions = ref<string>('');

	onMounted(async () => {
		const surveyId = route.params.id as string;
		await store.fetchSurvey(surveyId);
		syncLocalQuestions();
	});

	watch(
		() => store.survey?.questions,
		() => syncLocalQuestions(),
		{ deep: true },
	);

	function syncLocalQuestions() {
		localQuestions.value = [...(store.survey?.questions || [])];
		originalQuestions.value = JSON.stringify(localQuestions.value);
	}

	// UI Helpers
	const statusSeverity = (status: string) => {
		return status === 'PUBLISHED'
			? 'success'
			: status === 'CLOSED'
			? 'danger'
			: 'info';
	};

	const questionIcon = (type: string) => {
		const icons: Record<string, string> = {
			TEXT: 'pi pi-align-left',
			RADIO: 'pi pi-circle-off',
			CHECKBOX: 'pi pi-check-square',
			RATING: 'pi pi-star',
			NPS: 'pi pi-thumbs-up',
			YESNO: 'pi pi-question-circle',
		};
		return icons[type] || 'pi pi-question';
	};

	// Dialogs
	const openQuestionDialog = (question?: any) => {
		$dialog.open(QuestionDialog, {
			data: { question, surveyId: survey.value?.id },
			props: {
				header: question ? 'Edit Question' : 'Add Question',
				modal: true,
				style: { width: '90vw', maxWidth: '600px' },
			},
		});
	};

	const deleteQuestion = async (questionId: string) => {
		$confirm.require({
			message: 'Delete this question?',
			header: 'Confirm',
			icon: 'pi pi-exclamation-triangle',
			accept: async () => {
				await store.deleteOneQuestion(questionId);
				syncLocalQuestions();
			},
		});
	};

	const openEditDialog = (survey: any) => {
		$dialog.open(SurveyFormDialog, {
			data: { survey },
			props: {
				header: 'Edit Survey',
				modal: true,
				style: { width: '90vw', maxWidth: '600px' },
			},
		});
	};
</script>
