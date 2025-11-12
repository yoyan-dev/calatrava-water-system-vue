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
						v-slot="{ field }">
						<Dropdown
							v-bind="field"
							:options="questionTypes"
							option-label="label"
							option-value="value"
							:invalid="!!errors.type"
							class="w-full"
							placeholder="Select type" />
						<small
							v-if="errors.type"
							class="p-error"
							>{{ errors.type }}</small
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
						v-slot="{ field, errorMessage }">
						<Textarea
							v-bind="field"
							rows="2"
							:invalid="!!errorMessage"
							class="w-full"
							placeholder="e.g., How satisfied are you with our water pressure?" />
						<small
							v-if="errorMessage"
							class="text-red-600 text-xs mt-1"
							>{{ errorMessage }}</small
						>
					</Field>
				</div>

				<!-- Options (for RADIO, CHECKBOX) -->
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
							<InputText
								v-model="form.options[i]"
								:placeholder="`Option ${i + 1}`"
								class="flex-1" />
							<Button
								icon="pi pi-trash"
								severity="danger"
								text
								size="small"
								@click="removeOption(i)" />
						</div>
						<Button
							label="Add Option"
							icon="pi pi-plus"
							text
							size="small"
							@click="addOption" />
					</div>
				</div>

				<!-- Rating Scale (for RATING) -->
				<div v-if="form.type === 'RATING'">
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Scale
					</label>
					<div class="flex items-center gap-4">
						<span class="text-sm">1</span>
						<i class="pi pi-star text-yellow-500"></i>
						<span class="text-sm font-medium">to</span>
						<i class="pi pi-star text-yellow-500"></i>
						<span class="text-sm">5</span>
					</div>
				</div>

				<!-- NPS Scale -->
				<div v-if="form.type === 'NPS'">
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Scale (0–10)
					</label>
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

				<!-- Required Toggle -->
				<div class="flex items-center gap-3">
					<Field
						name="required"
						v-slot="{ field }">
						<Checkbox
							v-bind="field"
							:binary="true"
							input-id="required" />
					</Field>
					<label
						for="required"
						class="text-sm font-medium text-gray-700 dark:text-gray-300">
						Required question
					</label>
				</div>

				<!-- Error from Store -->
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
						@click="dialogRef.value.close()" />
					<Button
						type="submit"
						:label="isEdit ? 'Update Question' : 'Add Question'"
						:loading="store.isLoading"
						:disabled="store.isLoading"
						icon="pi pi-check" />
				</div>
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, inject, onMounted, reactive } from 'vue';
	import { Form, Field } from 'vee-validate';
	import { useSurveyStore } from '@/stores/survey';
	import * as yup from 'yup';
	import Dropdown from 'primevue/dropdown';
	import Textarea from 'primevue/textarea';
	import InputText from 'primevue/inputtext';
	import Button from 'primevue/button';
	import Checkbox from 'primevue/checkbox';
	import Tag from 'primevue/tag';
	import Message from 'primevue/message';

	const store = useSurveyStore();
	const dialogRef: any = inject('dialogRef');

	const props = defineProps<{
		question?: any;
		surveyId: string;
	}>();

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
		type: 'TEXT',
		label: '',
		options: [''] as string[],
		required: false,
	});

	const showOptions = computed(() => {
		return ['RADIO', 'CHECKBOX'].includes(form.type);
	});

	const schema = yup.object({
		type: yup.string().required(),
		label: yup.string().required('Question is required').max(500),
		options: yup.array().when('type', {
			is: (val: string) => ['RADIO', 'CHECKBOX'].includes(val),
			then: (schema) =>
				schema
					.of(yup.string().required('Option required'))
					.min(2, 'At least 2 options'),
			otherwise: (schema) => schema.notRequired(),
		}),
	});

	onMounted(() => {
		if (isEdit.value && props.question) {
			form.type = props.question.type;
			form.label = props.question.label;
			form.required = props.question.required || false;
			form.options = props.question.options
				? [...props.question.options]
				: [''];
		}
	});

	function addOption() {
		form.options.push('');
	}

	function removeOption(index: number) {
		form.options.splice(index, 1);
	}

	async function onSubmit(values: any) {
		store.error = null;

		const questionData = {
			id: isEdit.value ? props.question.id : undefined,
			type: values.type,
			label: values.label,
			options: showOptions.value
				? values.options.filter((o: string) => o.trim())
				: null,
			required: values.required,
			order: isEdit.value
				? props.question.order
				: (store.survey?.questions?.length || 0) + 1,
		};

		try {
			if (isEdit.value) {
				await store.updateQuestion(props.surveyId, questionData);
			} else {
				await store.addQuestion({ ...questionData, surveyId: props.surveyId });
			}
			dialogRef.value.close({ saved: true });
		} catch (err: any) {
			store.error = err.message || 'Failed to save question';
		}
	}
</script>
