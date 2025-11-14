<template>
	<div class="p-4 md:p-6">
		<div v-if="survey">
			<!-- Survey Info -->
			<Card class="mb-6 shadow-md">
				<template #title>
					<div class="flex items-center justify-between">
						<span class="text-xl font-semibold">{{ survey?.title }}</span>
						<Tag
							:value="survey?.status"
							:severity="statusSeverity(survey?.status || '')"
							rounded />
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
							<span class="font-medium text-gray-700 dark:text-gray-300"
								>Responses:</span
							>
							<p class="font-semibold">{{ survey?.responsesCount || 0 }}</p>
						</div>
						<div>
							<span class="font-medium text-gray-700 dark:text-gray-300"
								>Status:</span
							>
							<p>{{ survey?.status }}</p>
						</div>
					</div>
				</template>
			</Card>

			<!-- Questions Section -->
			<Card class="shadow-md">
				<template #header>
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-semibold">Questions</h3>
						<Button
							label="Add Question"
							icon="pi pi-plus"
							size="small"
							@click="openQuestionDialog()" />
					</div>
				</template>

				<template #content>
					<div
						v-if="survey && !survey.questions?.length"
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

					<div v-else>
						<draggable
							v-model="localQuestions"
							item-key="id"
							handle=".drag-handle"
							@end="onDragEnd"
							class="space-y-3">
							<template #item="{ element: q }">
								<div
									class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
									<i
										class="pi pi-grip-vertical drag-handle text-gray-400 cursor-move"></i>
									<div class="flex-1">
										<div class="flex items-center gap-2">
											<i
												:class="questionIcon(q.type)"
												class="text-primary"></i>
											<span class="font-medium">{{ q.label }}</span>
											<Tag
												v-if="q.required"
												value="Required"
												severity="warn"
												rounded
												class="text-xs" />
										</div>
										<p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
											{{ q.type }} •
											{{
												q.options?.length
													? `${q.options.length} options`
													: 'Open text'
											}}
										</p>
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
							</template>
						</draggable>
					</div>
				</template>
			</Card>

			<!-- Save Button -->
			<div class="flex justify-end mt-6 gap-3">
				<Button
					label="Save Changes"
					:loading="store.isLoading"
					:disabled="store.isLoading || !questionsChanged"
					@click="saveQuestions" />
			</div>
		</div>

		<!-- 404 Survey Not Found – Enhanced UX -->
		<div
			v-else
			class="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
			<!-- Animated Water Drop Icon -->
			<div class="relative mb-8">
				<i
					class="pi pi-exclamation-triangle text-8xl text-primary-200 animate-pulse"></i>
				<div class="absolute inset-0 flex items-center justify-center">
					<i class="pi pi-search text-4xl text-primary-500 animate-ping"></i>
				</div>
			</div>

			<!-- Main Message -->
			<h1
				class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
				Survey Not Found
			</h1>

			<p
				class="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-6 leading-relaxed">
				We couldn't find the survey you're looking for. It may have been
				deleted, moved, or the link is incorrect.
			</p>

			<!-- Action Buttons -->
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
	import Header from '@/components/globals/header.vue';
	import { format } from 'date-fns';
	import QuestionDialog from './_components/question-dialog.vue';
	import { VueDraggableNext as draggable } from 'vue-draggable-next';

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

	const questionsChanged = computed(() => {
		return JSON.stringify(localQuestions.value) !== originalQuestions.value;
	});

	// UI Helpers
	const statusSeverity = (status: string) => {
		return status === 'PUBLISHED'
			? 'success'
			: status === 'CLOSED'
			? 'danger'
			: 'info';
	};

	const formatDate = (date: string) => {
		return date ? format(new Date(date), 'MMM d, yyyy h:mm a') : '—';
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

	const onDragEnd = () => {
		// Reorder locally
		localQuestions.value = localQuestions.value.map((q, i) => ({
			...q,
			order: i + 1,
		}));
	};

	const saveQuestions = async () => {
		// await store.addQuestion(localQuestions.value);
		// originalQuestions.value = JSON.stringify(localQuestions.value);
	};
</script>

<style scoped>
	.drag-container {
		min-height: 200px;
		padding: 20px;
	}

	.drag-item {
		padding: 10px;
		margin: 5px 0;
		background: #f0f0f0;
		border-radius: 4px;
		cursor: move;
		transition: background 0.2s;
	}

	.drag-item:hover {
		background: #e0e0e0;
	}
</style>
