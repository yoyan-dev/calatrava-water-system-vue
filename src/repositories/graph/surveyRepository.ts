import type { RepositoryResponse } from '@/types/repository-response.d';
import { formatDataConnectError } from '@/composables/dataConnectError';
import {
	createQuestion,
	createSurvey,
	deleteQuestion,
	deleteSurvey,
	getSurveyById,
	getSurveys,
	updateQuestion,
	updateSurvey,
	type CreateQuestionVariables,
	type CreateSurveyVariables,
	type UpdateQuestionVariables,
} from '@/dataconnect-generated';

class SurveyRepository {
	async fetchSurvey(id: string) {
		try {
			const response = await getSurveyById({ id });
			if (response?.data?.survey) {
				return {
					status: 'success',
					data: response.data.survey as any,
				};
			}
		} catch (error) {}
	}

	async fetchSurveys() {
		try {
			const response = await getSurveys();
			if (response?.data?.surveys) {
				return {
					status: 'success',
					data: response.data.surveys,
				};
			}
		} catch (error) {}
	}

	async deleteSurvey(id: string) {
		try {
			const response = await deleteSurvey({ id });
			if (response?.data?.survey_delete?.id) return { success: true };
		} catch (error) {
			return { status: 'error', message: error };
		}
	}

	async updateSurvey(payload: any) {
		try {
			const response = await updateSurvey(payload);
			if (response?.data?.survey_update?.id) return { success: true };
		} catch (error) {
			return { status: 'error', message: error };
		}
	}

	async addSurvey(payload: CreateSurveyVariables): Promise<RepositoryResponse> {
		try {
			const response = await createSurvey(payload);
			if (response?.data?.survey_insert?.id) {
				const createdAt = new Date().toISOString();
				const id = response.data.survey_insert.id;
				return {
					status: 'success',
					message: 'Survey added successfully',
					data: { id, createdAt },
				};
			} else {
				return {
					status: 'error',
					message: 'Error Data-connect SQL query.',
				};
			}
		} catch (error: any) {
			return formatDataConnectError(error.response.errors);
		}
	}

	async deleteQuestion(id: string) {
		try {
			const response = await deleteQuestion({ id });
			if (response?.data?.question_delete?.id) return { success: true };
		} catch (error) {
			return { status: 'error', message: error };
		}
	}

	async updateQuestion(payload: UpdateQuestionVariables) {
		try {
			const response = await updateQuestion(payload);
			if (response?.data?.question_update?.id) return { success: true };
		} catch (error) {
			return { status: 'error', message: error };
		}
	}

	async addQuestion(
		payload: CreateQuestionVariables,
	): Promise<RepositoryResponse> {
		try {
			const response = await createQuestion(payload);
			if (response?.data?.question_insert?.id) {
				const id = response.data.question_insert.id;
				return {
					status: 'success',
					message: 'Question added successfully',
					data: { id },
				};
			} else {
				return {
					status: 'error',
					message: 'Error Data-connect SQL query.',
				};
			}
		} catch (error: any) {
			return formatDataConnectError(error.response.errors);
		}
	}
}

export const surveyRepository = new SurveyRepository();
