import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { StoreResponse } from '@/types/store-response';
import { surveyRepository as surveyGraph } from '@/repositories/graph/surveyRepository';
import type { Survey, Question, SurveyItem } from '@/types/survey';
import type {
	CreateQuestionVariables,
	CreateSurveyVariables,
	UpdateQuestionVariables,
} from '@/dataconnect-generated';

export const useSurveyStore = defineStore('survey', () => {
	// State
	const surveys = ref<SurveyItem[]>([]);
	const survey = ref<Survey | null>(null);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	// Actions

	async function fetchSurvey(id: string) {
		try {
			isLoading.value = true;
			const response = await surveyGraph.fetchSurvey(id);
			if (response?.status == 'success') {
				survey.value = response.data;
			}
		} catch (error) {
			console.error('Error fetching Survey:', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function fetchSurveys() {
		try {
			const response = await surveyGraph.fetchSurveys();
			if (response?.status == 'success') {
				surveys.value = response.data || [];
			}
		} catch (error) {
			console.error('Error fetching Surveys:', error);
		}
	}

	async function addSurvey(payload: Survey): Promise<StoreResponse> {
		try {
			const response = await surveyGraph.addSurvey(
				payload as CreateSurveyVariables,
			);

			if (response?.status == 'success' && response?.data) {
				surveys.value.unshift({ ...payload, ...response.data });

				return {
					status: 'success',
					message: 'Survey added successfully',
				};
			} else {
				return {
					status: 'error',
					message: response?.message || 'Error adding Survey',
				};
			}
		} catch (error) {
			return {
				status: 'error',
				message: `Error adding Survey: ${error}`,
			};
		}
	}

	async function deleteOneSurvey(id: string) {
		try {
			const response = await surveyGraph.deleteSurvey(id);
			if (response?.success) {
				surveys.value = surveys.value.filter((item) => item.id !== id);
				return {
					status: 'success',
					message: 'Survey deleted successfully',
				};
			}
		} catch (error) {
			console.error('Error deleting Survey:', error);
		}
	}

	async function deleteSelectedSurveys(selected: Array<Survey>): Promise<{
		status: 'success' | 'error' | 'partial';
		message: string;
		deleted: number;
		failed: number;
	}> {
		if (!selected || selected.length === 0) {
			return {
				status: 'success',
				message: 'No Surveys selected to delete',
				deleted: 0,
				failed: 0,
			};
		}

		isLoading.value = true;
		const results = [];

		try {
			// Map each deletion to a promise
			const deletionPromises = selected.map(async (item) => {
				try {
					if (!item.id) {
						return {
							success: false,
							message: 'Invalid Survey ID',
							id: item.id,
						};
					}
					const response = await surveyGraph.deleteSurvey(item.id);
					return { ...response, id: item.id };
				} catch (err) {
					console.error(`Failed to delete Survey ID: ${item.id}`, err);
					return {
						success: false,
						message: 'Network or server error',
						id: item.id,
					};
				}
			});

			// Execute all deletions concurrently
			const responses = await Promise.all(deletionPromises);
			results.push(...responses);

			// Filter successful deletions
			const successful = responses.filter((r) => r.success);
			const failed = responses.filter((r) => !r.success);

			// Remove only successfully deleted items from local state
			const deletedIds = successful.map((r) => r.id);
			surveys.value = surveys.value.filter(
				(item) => !deletedIds.includes(item.id),
			);

			// Determine overall status
			const status =
				failed.length === 0
					? 'success'
					: successful.length === 0
					? 'error'
					: 'partial';

			const message =
				status === 'success'
					? `Successfully deleted ${successful.length} Survey(s)`
					: status === 'partial'
					? `Deleted ${successful.length}, failed ${failed.length}`
					: `Failed to delete ${failed.length} Survey(s)`;

			return {
				status,
				message,
				deleted: successful.length,
				failed: failed.length,
			};
		} catch (error) {
			console.error('Unexpected error in deleteSelectedSurveys:', error);
			return {
				status: 'error',
				message: 'An unexpected error occurred',
				deleted: 0,
				failed: selected.length,
			};
		} finally {
			isLoading.value = false;
		}
	}

	async function updateSurvey(id: string, payload: Partial<SurveyItem>) {
		isLoading.value = true;
		try {
			const response = await surveyGraph.updateSurvey({ id, ...payload });
			if (response?.success) {
				const index = surveys.value.findIndex((item) => item.id === id);
				if (index !== -1) {
					surveys.value[index] = {
						...surveys.value[index],
						...(payload as SurveyItem),
					};
				}
				return {
					status: 'success',
					message: 'Survey updated successfully',
				};
			}
		} catch (error) {
			console.error('Error updating Survey:', error);
		} finally {
			isLoading.value = false;
		}
	}

	async function addQuestion(
		payload: CreateQuestionVariables,
	): Promise<StoreResponse> {
		try {
			const response = await surveyGraph.addQuestion(payload);

			if (response?.status == 'success' && response?.data && survey.value) {
				survey.value?.questions.unshift({ ...payload, ...response.data });

				return {
					status: 'success',
					message: 'Question added successfully',
				};
			} else {
				return {
					status: 'error',
					message: response?.message,
				};
			}
		} catch (error) {
			return {
				status: 'error',
				message: `Error adding Question: ${error}`,
			};
		}
	}

	async function deleteOneQuestion(id: string): Promise<{
		status: 'success' | 'error';
		message: string;
	}> {
		try {
			const response = await surveyGraph.deleteQuestion(id);

			if (response?.success && survey.value) {
				// Safely filter out the question by id
				survey.value.questions = survey.value.questions.filter(
					(item) => item.id !== id,
				);

				return {
					status: 'success',
					message: 'Question deleted successfully',
				};
			} else {
				// Handle case where API call succeeded but response indicates failure
				return {
					status: 'error',
					message: 'Failed to delete question',
				};
			}
		} catch (error) {
			console.error('Error deleting Question:', error);

			// Optionally extract error message if available
			const errorMessage =
				error instanceof Error ? error.message : 'An unexpected error occurred';

			return {
				status: 'error',
				message: errorMessage,
			};
		}
	}

	async function updateQuestion(
		id: string,
		payload: Partial<Question>,
	): Promise<{
		status: 'success' | 'error';
		message: string;
	}> {
		// Optional: validate input
		if (!id?.trim()) {
			isLoading.value = false;
			return { status: 'error', message: 'Invalid question ID' };
		}

		isLoading.value = true;

		try {
			const response = await surveyGraph.updateQuestion({
				id,
				...payload,
			} as UpdateQuestionVariables);

			if (response?.success && survey.value) {
				const questionIndex = survey.value.questions.findIndex(
					(q) => q.id === id,
				);

				if (questionIndex !== -1) {
					// Update the question in survey state
					survey.value.questions[questionIndex] = {
						...survey.value.questions[questionIndex],
						...payload,
					};

					// Optional: Trigger reactivity if needed (Vue 3 handles this)
					// survey.value = { ...survey.value }; // only if shallow ref
				}

				return {
					status: 'success',
					message: 'Question updated successfully',
				};
			} else {
				return {
					status: 'error',
					message: 'Failed to update question',
				};
			}
		} catch (error) {
			console.error('Error updating Question:', error);

			const errorMessage =
				error instanceof Error ? error.message : 'An unexpected error occurred';

			return {
				status: 'error',
				message: errorMessage,
			};
		} finally {
			isLoading.value = false;
		}
	}

	return {
		survey,
		surveys,
		isLoading,
		error,

		addQuestion,
		updateQuestion,
		deleteOneQuestion,

		fetchSurvey,
		fetchSurveys,
		addSurvey,
		updateSurvey,
		deleteOneSurvey,
		deleteSelectedSurveys,
	};
});
