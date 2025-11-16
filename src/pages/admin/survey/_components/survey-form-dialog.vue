<template>
	<div class="p-4 max-w-2xl">
		<Form
			@submit="onSubmit"
			:validation-schema="schema"
			:initial-values="form"
			v-slot="{ errors, isSubmitting }">
			<div class="space-y-6">
				<!-- Status -->
				<div>
					<label
						for="status"
						class="block text-sm font-medium text-gray-700 mb-1">
						Survey Status
					</label>
					<Field
						name="status"
						v-model="form.status"
						v-slot="{ field }">
						<Select
							v-model="form.status"
							id="status"
							:options="statusOptions"
							option-label="label"
							option-value="value"
							class="w-full" />
					</Field>
				</div>
				<!-- Title -->
				<div>
					<label
						for="title"
						class="block text-sm font-medium text-gray-700 mb-1">
						Survey Title <span class="text-red-500">*</span>
					</label>
					<Field
						name="title"
						v-model="form.title"
						v-slot="{ field, errorMessage }">
						<InputText
							id="title"
							v-bind="field"
							:invalid="!!errorMessage"
							class="w-full"
							placeholder="e.g., Q4 2025 Customer Satisfaction Survey" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400 text-xs mt-1"
							>{{ errorMessage }}</small
						>
					</Field>
				</div>

				<!-- Description -->
				<div>
					<label
						for="description"
						class="block text-sm font-medium text-gray-700 mb-1">
						Description <span class="text-gray-400">(optional)</span>
					</label>
					<Field
						name="description"
						v-model="form.description"
						v-slot="{ field }">
						<Textarea
							id="description"
							v-bind="field"
							rows="3"
							class="w-full"
							placeholder="Brief description for internal reference..." />
					</Field>
				</div>

				<!-- Error Alert -->
				<Message
					v-if="errorMessage"
					severity="error"
					:closable="false">
					{{ errorMessage }}
				</Message>

				<!-- Footer Actions -->
				<div class="flex justify-end gap-3 pt-4 border-t">
					<Button
						type="button"
						label="Cancel"
						severity="secondary"
						@click="dialogRef.value.close()" />
					<Button
						type="submit"
						:label="survey ? 'Update Survey' : 'Create Survey'"
						:loading="isSubmitting"
						:disabled="isSubmitting"
						icon="pi pi-save" />
				</div>
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
	import { useSurveyStore } from '@/stores/survey';
	import type { Survey } from '@/types/survey';
	import { useToast } from 'primevue/usetoast';
	import { ref, computed, inject, onMounted, reactive } from 'vue';
	import { Form, Field } from 'vee-validate';
	import * as yup from 'yup';
	import { stat } from 'fs';

	const store = useSurveyStore();
	const toast = useToast();
	const dialogRef: any = inject('dialogRef');

	const errorMessage = ref<string | null>(null);

	// Detect if edit or create
	const survey = computed<Survey | null>(
		() => dialogRef.value?.data?.survey || null,
	);

	// Reactive form
	const form = reactive({
		title: '',
		description: '',
		status: 'DRAFT',
	});

	const statusOptions = [
		{ label: 'Draft', value: 'DRAFT' },
		{ label: 'Published', value: 'PUBLISHED' },
		{ label: 'Archived', value: 'ARCHIVED' },
	];

	// Validation schema
	const schema = yup.object({
		title: yup
			.string()
			.required('Survey title is required')
			.max(150, 'Title too long'),
		description: yup.string().max(500, 'Description too long').nullable(),
	});

	// Fill form on edit
	onMounted(() => {
		if (survey.value) {
			form.title = survey.value.title || '';
			form.description = survey.value.description || '';
			form.status = survey.value.status || 'DRAFT';
		}
	});

	// Submit handler
	async function onSubmit(values: any) {
		try {
			let result;
			if (survey.value) {
				// Update existing survey
				console.log(values);

				result = await store.updateSurvey(survey.value!.id!, {
					title: values.title,
					description: values.description || null,
					status: values.status,
				});

				toast.add({
					severity: 'success',
					summary: 'Success',
					detail: 'Survey updated successfully',
					life: 3000,
				});
			} else {
				// Create new survey (with empty questions & targets for now)
				const newSurvey: Partial<Survey> = {
					title: values.title,
					description: values.description || null,
					status: 'DRAFT',
					responsesCount: 0,
				};

				result = await store.addSurvey(newSurvey as Survey);

				if (result.status == 'success') {
					toast.add({
						severity: 'success',
						summary: 'Created!',
						detail: 'Survey created. Now add questions and target audience.',
						life: 4000,
					});
				} else {
					errorMessage.value = result.message;
					return;
				}

				// Optionally redirect to builder
				closeDialog();
				return;
			}
		} catch (err: any) {
			errorMessage.value =
				err.message || 'Failed to save survey. Please try again.';
			console.error('Survey save error:', err);
		}
	}

	const closeDialog = () => {
		dialogRef.value.close();
	};
</script>
