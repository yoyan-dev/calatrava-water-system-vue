<template>
	<div class="p-4 max-w-3xl">
		<Form
			@submit="onSubmit"
			:validation-schema="schema"
			:initial-values="form"
			v-slot="{ errors, isSubmitting }">
			<div class="space-y-6">
				<!-- Question Type -->
				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Question Type <span class="text-red-500">*</span>
					</label>
					<Field
						name="type"
						v-model="form.type"
						v-slot="{ field, errorMessage }">
						<Select
							v-model="form.type"
							:options="questionTypes"
							option-label="label"
							option-value="value"
							:class="{ 'p-invalid': errorMessage }"
							class="w-full"
							placeholder="Select type" />
						<small
							v-if="errorMessage"
							class="p-error"
							>{{ errorMessage }}</small
						>
					</Field>
				</div>

				<!-- Question Label -->
				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Question <span class="text-red-500">*</span>
					</label>
					<Field
						name="label"
						v-model="form.label"
						v-slot="{ errorMessage }">
						<Textarea
							v-model="form.label"
							rows="2"
							:class="{ 'p-invalid': errorMessage }"
							class="w-full"
							placeholder="e.g., How satisfied are you with our water pressure?" />
						<small
							v-if="errorMessage"
							class="p-error"
							>{{ errorMessage }}</small
						>
					</Field>
				</div>

				<!-- Options -->
				<div v-if="showOptions">
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Options <span class="text-red-500">*</span>
					</label>
					<div class="space-y-2">
						<div
							v-for="(opt, i) in form.options"
							:key="i"
							class="flex items-center gap-2">
							<Field
								:name="`options[${i}]`"
								v-model="form.options[i]"
								v-slot="{ errorMessage }">
								<InputText
									v-model="form.options[i]"
									:placeholder="`Option ${i + 1}`"
									:class="{ 'p-invalid': errorMessage }"
									class="flex-1" />
								<small
									v-if="errorMessage"
									class="p-error text-xs">
									{{ errorMessage }}
								</small>
							</Field>
							<Button
								type="button"
								icon="pi pi-trash"
								severity="danger"
								text
								size="small"
								@click="removeOption(i)" />
						</div>
						<Button
							type="button"
							label="Add Option"
							icon="pi pi-plus"
							text
							size="small"
							@click="addOption" />
					</div>
				</div>

				<!-- Previews -->
				<div v-if="form.type === 'RATING'">
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
						>Scale</label
					>
					<div class="flex items-center gap-4 text-sm">
						<span>1</span> <i class="pi pi-star text-yellow-500"></i>
						<span class="font-medium">to</span>
						<i class="pi pi-star text-yellow-500"></i> <span>5</span>
					</div>
				</div>

				<div v-if="form.type === 'NPS'">
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

				<!-- Required -->
				<div class="flex items-center gap-3">
					<Field
						name="required"
						v-model="form.required">
						<Checkbox
							v-model="form.required"
							:binary="true"
							input-id="required" />
					</Field>
					<label
						for="required"
						class="text-sm font-medium text-gray-700 dark:text-gray-300">
						Required question
					</label>
				</div>

				<!-- Error -->
				<Message
					v-if="store.error"
					severity="error"
					:closable="false">
					{{ store.error }}
				</Message>

				<!-- Actions -->
				<div
					class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
					<Button
						type="button"
						label="Cancel"
						severity="secondary"
						@click="closeDialog" />
					<Button
						type="submit"
						:label="isEdit ? 'Update Question' : 'Add Question'"
						:loading="isSubmitting || store.isLoading"
						:disabled="isSubmitting || store.isLoading"
						icon="pi pi-check" />
				</div>
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
	import { computed, inject, onMounted, reactive, watch } from 'vue';
	import { Form, Field } from 'vee-validate';
	import { useSurveyStore } from '@/stores/survey';
	import * as yup from 'yup';

	const store = useSurveyStore();
	const dialogRef: any = inject('dialogRef');

	// Extract props from dialog data
	const props = computed(() => {
		const data = (dialogRef.value as any)?.data || {};
		return {
			surveyId: data.surveyId,
			question: data.question,
		};
	}).value;

	const isEdit = computed(() => !!props.question?.id);

	const questionTypes = [
		{ label: 'Text (Open)', value: 'TEXT' },
		{ label: 'Multiple Choice (Radio)', value: 'RADIO' },
		{ label: 'Checkboxes', value: 'CHECKBOX' },
		{ label: 'Rating (1–5)', value: 'RATING' },
		{ label: 'NPS (0–10)', value: 'NPS' },
		{ label: 'Yes / No', value: 'YESNO' },
	];

	const form = reactive({
		type: 'TEXT' as string,
		label: '',
		options: [''] as string[],
		required: false,
	});

	const showOptions = computed(() => ['RADIO', 'CHECKBOX'].includes(form.type));

	const schema = yup.object({
		type: yup.string().required('Question type is required'),
		label: yup.string().required('Question is required').max(500, 'Too long'),
		options: yup.array().when('type', {
			is: (val: string) => ['RADIO', 'CHECKBOX'].includes(val),
			then: (schema) =>
				schema
					.of(yup.string().required('Option cannot be empty'))
					.min(2, 'At least 2 options required'),
			otherwise: () => yup.array().notRequired(),
		}),
	});

	// Edit mode sync
	onMounted(() => {
		if (isEdit.value && props.question) {
			form.type = props.question.type;
			form.label = props.question.label || '';
			form.required = !!props.question.required;
			form.options = props.question.options?.length
				? [...props.question.options]
				: ['Option 1', 'Option 2'];
		}
	});

	function closeDialog() {
		dialogRef.value.close();
	}

	function addOption() {
		form.options.push('New Option'); // ← NOT empty!
	}

	function removeOption(index: number) {
		if (form.options.length > 2) {
			form.options.splice(index, 1);
		}
	}

	// Reset options when type changes
	watch(
		() => form.type,
		(newType) => {
			if (!['RADIO', 'CHECKBOX'].includes(newType)) {
				form.options = [];
			} else if (form.options.length < 2) {
				form.options = ['Option 1', 'Option 2']; // ← Never empty
			}
		},
	);

	async function onSubmit() {
		store.error = null;

		const questionData = {
			id: isEdit.value ? props.question.id : undefined,
			type: form.type,
			label: form.label,
			options: showOptions.value ? form.options.filter((o) => o.trim()) : null,
			required: form.required,
			order: isEdit.value
				? props.question.order
				: (store.survey?.questions?.length || 0) + 1,
		};

		try {
			if (isEdit.value) {
				await store.updateQuestion(props.question.id, questionData);
			} else {
				await store.addQuestion({ ...questionData, surveyId: props.surveyId });
			}
			dialogRef.value.close({ saved: true });
		} catch (err: any) {
			store.error = err.message || 'Failed to save question';
		}
	}
</script>
