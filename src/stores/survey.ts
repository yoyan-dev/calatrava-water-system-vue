import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { StoreResponse } from '@/types/store-response';
import { surveyRepository as surveyGraph } from '@/repositories/graph/surveyRepository';
import type { Survey, Question } from '@/types/survey';
import type {
	CreateQuestionVariables,
	CreateSurveyVariables,
	UpdateQuestionVariables,
	UpdateSurveyVariables,
} from '@/dataconnect-generated';

export const useSurveyStore = defineStore('Survey', () => {
	// State
	const surveys = ref<Survey[]>([]);
	const questions = ref<Question[]>([]);
	const isLoading = ref(false);

	// Actions

	async function addSurvey(
		payload: CreateSurveyVariables,
	): Promise<StoreResponse> {
		try {
			const response = await surveyGraph.addSurvey(payload);

			if (response?.status == 'success' && response?.data) {
				surveys.value.unshift({ ...payload, ...response.data });

				return {
					status: 'success',
					message: 'Survey added successfully',
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

	async function updateSurvey(id: string, payload: UpdateSurveyVariables) {
		isLoading.value = true;
		try {
			const response = await surveyGraph.updateSurvey(payload);
			if (response?.success) {
				const timestamp = new Date().toISOString();
				const index = surveys.value.findIndex((item) => item.id === id);
				if (index !== -1) {
					surveys.value[index] = {
						...surveys.value[index],
						...payload,
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

			if (response?.status == 'success' && response?.data) {
				questions.value.unshift({ ...payload, ...response.data });

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

	async function deleteOneQuestion(id: string) {
		try {
			const response = await surveyGraph.deleteQuestion(id);
			if (response?.success) {
				questions.value = questions.value.filter((item) => item.id !== id);
				return {
					status: 'success',
					message: 'Question deleted successfully',
				};
			}
		} catch (error) {
			console.error('Error deleting Question:', error);
		}
	}

	async function deleteSelectedQuestions(selected: Array<Question>): Promise<{
		status: 'success' | 'error' | 'partial';
		message: string;
		deleted: number;
		failed: number;
	}> {
		if (!selected || selected.length === 0) {
			return {
				status: 'success',
				message: 'No Questions selected to delete',
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
							message: 'Invalid Question ID',
							id: item.id,
						};
					}
					const response = await surveyGraph.deleteQuestion(item.id);
					return { ...response, id: item.id };
				} catch (err) {
					console.error(`Failed to delete Question ID: ${item.id}`, err);
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
			questions.value = questions.value.filter(
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
					? `Successfully deleted ${successful.length} Question(s)`
					: status === 'partial'
					? `Deleted ${successful.length}, failed ${failed.length}`
					: `Failed to delete ${failed.length} Question(s)`;

			return {
				status,
				message,
				deleted: successful.length,
				failed: failed.length,
			};
		} catch (error) {
			console.error('Unexpected error in deleteSelectedQuestions:', error);
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

	async function updateQuestion(id: string, payload: Partial<Question>) {
		isLoading.value = true;
		try {
			const response = await surveyGraph.updateQuestion(
				payload as UpdateQuestionVariables,
			);
			if (response?.success) {
				const index = questions.value.findIndex((item) => item.id === id);
				if (index !== -1) {
					questions.value[index] = {
						...questions.value[index],
						...payload,
					};
				}
				return {
					status: 'success',
					message: 'Question updated successfully',
				};
			}
		} catch (error) {
			console.error('Error updating Question:', error);
		} finally {
			isLoading.value = false;
		}
	}

	return {
		surveys,
		isLoading,
		addSurvey,
		updateSurvey,
		deleteOneSurvey,
		deleteSelectedSurveys,
	};
});
