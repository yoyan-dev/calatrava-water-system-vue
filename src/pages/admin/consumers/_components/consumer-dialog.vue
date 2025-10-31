<template>
	<div class="p-4">
		<h3 class="text-xl font-bold mb-4 text-surface-900 dark:text-surface-0">
			{{ consumer ? 'Update Consumer' : 'Create New Consumer' }}
		</h3>

		<Form
			@submit="onSubmit"
			:validation-schema="schema"
			:initial-values="initialValues"
			v-slot="{ errors, isSubmitting }">
			<div class="space-y-5">
				<!-- Account No -->
				<div>
					<label
						class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
						Account No <span class="text-red-500">*</span>
					</label>
					<Field
						name="accountNo"
						v-model="form.accountNo">
						<template v-slot="{ field, errorMessage }">
							<InputText
								v-bind="field"
								v-model="form.accountNo"
								type="text"
								placeholder="e.g. 0611202177"
								:class="['w-full text-sm', errorMessage ? 'p-invalid' : '']"
								:invalid="!!errorMessage" />
							<small
								v-if="errorMessage"
								class="text-red-600 dark:text-red-400 text-xs mt-1"
								>{{ errorMessage }}</small
							>
						</template>
					</Field>
				</div>

				<!-- Full Name -->
				<div>
					<label
						class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
						Full Name <span class="text-red-500">*</span>
					</label>
					<Field
						name="fullName"
						v-model="form.fullName">
						<template v-slot="{ field, errorMessage }">
							<InputText
								v-bind="field"
								v-model="form.fullName"
								type="text"
								placeholder="John Doe"
								:class="['w-full text-sm', errorMessage ? 'p-invalid' : '']"
								:invalid="!!errorMessage" />
							<small
								v-if="errorMessage"
								class="text-red-600 dark:text-red-400 text-xs mt-1"
								>{{ errorMessage }}</small
							>
						</template>
					</Field>
				</div>

				<!-- Book -->
				<div>
					<label
						class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
						Book <span class="text-red-500">*</span>
					</label>
					<Field
						name="book"
						v-model="form.book">
						<template v-slot="{ field, errorMessage }">
							<InputText
								v-bind="field"
								v-model="form.book"
								type="text"
								placeholder="e.g. B001"
								:class="['w-full text-sm', errorMessage ? 'p-invalid' : '']"
								:invalid="!!errorMessage" />
							<small
								v-if="errorMessage"
								class="text-red-600 dark:text-red-400 text-xs mt-1"
								>{{ errorMessage }}</small
							>
						</template>
					</Field>
				</div>

				<!-- Class Type (Select) -->
				<div>
					<label
						class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
						Class Type <span class="text-red-500">*</span>
					</label>
					<Field
						name="classType"
						v-model="form.classType">
						<template v-slot="{ field, errorMessage }">
							<Select
								v-model="form.classType"
								:options="classTypes"
								option-label="label"
								option-value="value"
								placeholder="Select class"
								:class="['w-full text-sm', errorMessage ? 'p-invalid' : '']"
								:invalid="!!errorMessage" />
							<small
								v-if="errorMessage"
								class="text-red-600 dark:text-red-400 text-xs mt-1"
								>{{ errorMessage }}</small
							>
						</template>
					</Field>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex justify-end gap-3 mt-6">
				<Button
					type="button"
					label="Cancel"
					severity="secondary"
					text
					@click="closeModal" />
				<Button
					type="submit"
					:label="consumer ? 'Update' : 'Create'"
					severity="primary"
					:loading="isSubmitting"
					:disabled="isSubmitting"
					icon="pi pi-save" />
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, watch, inject } from 'vue';
	import { Form, Field } from 'vee-validate';
	import * as yup from 'yup';
	import { useToast } from 'primevue/usetoast';
	import type { ConsumerItem } from '@/types/consumer';
	import { useConsumerStore } from '@/stores/consumer';

	const store = useConsumerStore();
	const toast = useToast();
	const dialogRef: any = inject('dialogRef');

	const consumer = computed<ConsumerItem | null>(
		() => dialogRef.value?.data?.collection || null,
	);

	// Local form state
	const form = ref({
		accountNo: '',
		fullName: '',
		book: '',
		classType: '',
	});

	// Sync form with initialValues
	const initialValues = computed(() => ({
		accountNo: consumer.value?.accountNo || '',
		fullName: consumer.value?.fullName || '',
		book: consumer.value?.book || '',
		classType: consumer.value?.classType || '',
	}));

	watch(
		initialValues,
		(newVal) => {
			form.value = { ...newVal };
		},
		{ immediate: true },
	);

	// Class Type Options
	const classTypes = [
		{ label: 'Residential', value: 'RESIDENTIAL' },
		{ label: 'Commercial', value: 'COMMERCIAL' },
		{ label: 'Industrial', value: 'INDUSTRIAL' },
		{ label: 'Government', value: 'GOVERNMENT' },
		{ label: 'Institutional', value: 'INSTITUTIONAL' },
	];

	// Validation Schema
	const schema = yup.object({
		accountNo: yup
			.string()
			.required('Account No is required')
			.matches(/^\d+$/, 'Must be numeric')
			.min(6, 'Minimum 6 digits'),
		fullName: yup
			.string()
			.required('Full Name is required')
			.min(2, 'Too short'),
		book: yup.string().required('Book is required'),
		classType: yup
			.string()
			.required('Class Type is required')
			.oneOf(
				classTypes.map((c) => c.value),
				'Invalid class',
			),
	});

	// Submit Handler
	const onSubmit = async (values: any) => {
		try {
			console.log(values);

			let result;
			if (consumer.value) {
				// Remove any server-generated fields that might have slipped in
				const { id, createdAt, updatedAt, ...updates } = values;
				result = await store.updateConsumer(id, updates);
			} else {
				result = await store.addConsumer(values);
			}

			if (result?.status === 'success') {
				toast.add({
					severity: 'success',
					summary: 'Success',
					detail: `Consumer ${
						consumer.value ? 'updated' : 'created'
					} successfully`,
					life: 3000,
				});
				closeModal();
			} else {
				throw new Error(result?.message || 'Operation failed');
			}
		} catch (error: any) {
			console.error('Save failed:', error);
			toast.add({
				severity: 'error',
				summary: 'Error',
				detail: error.message || 'Failed to save consumer',
				life: 5000,
			});
		}
	};

	// Close Modal
	const closeModal = () => {
		dialogRef.value?.close();
	};
</script>
