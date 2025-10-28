<template>
	<div class="p-4">
		<h3 class="text-xl font-bold mb-4 text-surface-900 dark:text-surface-0">
			Edit Billing No. {{ form.billNo }}
		</h3>

		<Form
			@submit="onSubmit"
			:validation-schema="schema"
			v-slot="{ errors, isSubmitting }">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<!-- Account & Name -->
				<div>
					<label class="block text-sm font-medium mb-1">Account No.</label>
					<Field
						name="accountNo"
						v-model="form.accountNo"
						as="InputText"
						:class="{ 'p-invalid': errors.accountNo }"
						class="w-full"
						placeholder="e.g. 211200108" />
					<small class="text-red-600 dark:text-red-400">{{
						errors.accountNo
					}}</small>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Full Name</label>
					<Field
						name="fullName"
						v-model="form.fullName"
						as="InputText"
						:class="{ 'p-invalid': errors.fullName }"
						class="w-full"
						placeholder="e.g. Juan Dela Cruz" />
					<small class="text-red-600 dark:text-red-400">{{
						errors.fullName
					}}</small>
				</div>

				<!-- Meter Info -->
				<div>
					<label class="block text-sm font-medium mb-1">Meter No.</label>
					<Field
						name="mtrNo"
						v-model="form.mtrNo"
						as="InputText"
						:class="{ 'p-invalid': errors.mtrNo }"
						class="w-full" />
					<small class="text-red-600 dark:text-red-400">{{
						errors.mtrNo
					}}</small>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Book</label>
					<Field
						name="book"
						v-model="form.book"
						as="InputText"
						:class="{ 'p-invalid': errors.book }"
						class="w-full" />
					<small class="text-red-600 dark:text-red-400">{{
						errors.book
					}}</small>
				</div>

				<!-- Readings -->
				<div>
					<label class="block text-sm font-medium mb-1">Previous Reading</label>
					<Field
						name="preReading"
						v-model="form.preReading"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'p-invalid': !!errorMessage }"
							class="w-full"
							:min="0"
							:use-grouping="false"
							input-class="text-right" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Current Reading</label>
					<Field
						name="curReading"
						v-model="form.curReading"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:min="form.preReading"
							:use-grouping="false"
							class="w-full" />
						<small class="text-red-600 dark:text-red-400">{{
							errors.curReading
						}}</small>
					</Field>
				</div>

				<!-- Dates -->
				<div>
					<label class="block text-sm font-medium mb-1">Billing Date</label>
					<Field
						name="billDate"
						v-model="form.billDate">
						<template #default="{ field }">
							<DatePicker
								v-model="field.value"
								date-format="mm/dd/yy"
								:class="{ 'p-invalid': errors.billDate }"
								show-icon
								fluid
								placeholder="mm/dd/yyyy" />
						</template>
					</Field>
					<small class="text-red-600 dark:text-red-400">{{
						errors.billDate
					}}</small>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Due Date</label>
					<Field
						name="dueDate"
						v-model="form.dueDate">
						<template #default="{ field }">
							<DatePicker
								v-model="field.value"
								date-format="mm/dd/yy"
								:class="{ 'p-invalid': errors.dueDate }"
								show-icon
								fluid />
						</template>
					</Field>
					<small class="text-red-600 dark:text-red-400">{{
						errors.dueDate
					}}</small>
				</div>

				<!-- Charges -->
				<div>
					<label class="block text-sm font-medium mb-1">Water Bill (₱)</label>
					<Field
						name="billAmnt"
						v-model="form.billAmnt"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							mode="decimal"
							:min-fraction-digits="2"
							class="w-full" />
						<small class="text-red-600 dark:text-red-400">{{
							errors.billAmnt
						}}</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1"
						>Environmental Fee (₱)</label
					>
					<Field
						name="environmentFee"
						v-model="form.environmentFee"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'p-invalid': !!errorMessage }"
							class="w-full"
							mode="decimal"
							:min-fraction-digits="2"
							:max-fraction-digits="2"
							:use-grouping="false" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<!-- Arrears -->
				<div>
					<label class="block text-sm font-medium mb-1"
						>Arrears Amount (₱)</label
					>
					<Field
						name="arrearsAmnt"
						v-model="form.arrearsAmnt"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'p-invalid': !!errorMessage }"
							class="w-full"
							mode="decimal"
							:min-fraction-digits="2"
							:max-fraction-digits="2"
							:use-grouping="false" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Due Penalty (₱)</label>
					<Field
						name="duePenalty"
						v-model="form.duePenalty"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'p-invalid': !!errorMessage }"
							class="w-full"
							mode="decimal"
							:min-fraction-digits="2"
							:max-fraction-digits="2"
							:use-grouping="false" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<!-- Class Type -->
				<div class="md:col-span-2">
					<label class="block text-sm font-medium mb-1">Class Type</label>
					<Field
						name="classType"
						v-model="form.classType"
						v-slot="{ field, errorMessage, handleChange, handleBlur }"
						:value="form.classType">
						<Select
							:model-value="field.value"
							@update:model-value="handleChange"
							@blur="handleBlur"
							:options="classOptions"
							option-label="label"
							option-value="value"
							:class="{ 'p-invalid': !!errorMessage }"
							class="w-full"
							placeholder="Select class type" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>
			</div>

			<!-- Submit / Cancel -->
			<div class="flex justify-end gap-3 mt-6">
				<Button
					type="button"
					label="Cancel"
					severity="secondary"
					@click="closeModal"
					:disabled="isSubmitting" />
				<Button
					type="submit"
					label="Save Changes"
					severity="primary"
					:loading="isSubmitting" />
			</div>
		</Form>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, inject, computed } from 'vue';
	import { Form, Field } from 'vee-validate';
	import * as yup from 'yup';
	import { useBillingStore } from '@/stores/billing';
	import type { BillingItemFromCsv } from '@/types/billing-from-csv';
	import { useToast } from 'primevue/usetoast';

	const emit = defineEmits<{
		(e: 'update'): void;
	}>();

	const toast = useToast();
	const dialogRef: any = inject('dialogRef');
	const billing = computed<BillingItemFromCsv>(
		() => dialogRef.value.data.billing,
	);
	const store = useBillingStore();

	// Reactive form state
	const form = ref({
		...billing.value,
		billDate: billing.value.billDate ? new Date(billing.value.billDate) : null,
		dueDate: billing.value.dueDate ? new Date(billing.value.dueDate) : null,
	});

	// Watch for prop changes (in case dialog reuses component)
	watch(
		() => billing,
		(newVal) => {
			Object.assign(form.value, {
				...newVal,
				billDate: newVal.value.billDate
					? new Date(newVal.value.billDate)
					: null,
				dueDate: newVal.value.dueDate ? new Date(newVal.value.dueDate) : null,
			});
		},
		{ deep: true },
	);

	// Class Type Options
	const classOptions = [
		{ label: 'Residential', value: 'RESIDENTIAL' },
		{ label: 'Commercial', value: 'COMMERCIAL' },
		{ label: 'Government', value: 'GOVERNMENT' },
	];

	// Validation Schema
	const schema = yup.object({
		accountNo: yup.string().required('Account No. is required'),
		fullName: yup.string().required('Full Name is required'),
		mtrNo: yup.string().required('Meter No. is required'),
		book: yup.string().required('Book is required'),
		preReading: yup.number().min(0).required('Previous reading required'),
		curReading: yup
			.number()
			.min(yup.ref('preReading'), 'Current must be ≥ previous')
			.required('Current reading required'),
		billDate: yup
			.date()
			.required('Billing date required')
			.typeError('Invalid date'),
		dueDate: yup
			.date()
			.min(yup.ref('billDate'), 'Due date must be after billing date')
			.required('Due date required'),
		billAmnt: yup.number().min(0).required('Water bill required'),
		environmentFee: yup.number().min(0).required('Env fee required'),
		arrearsAmnt: yup.number().min(0).required('Arrears required'),
		duePenalty: yup.number().min(0).required('Penalty required'),
		classType: yup.string().required('Class type required'),
	});

	// Submit Handler
	const onSubmit = async (values: any) => {
		try {
			const updatedBilling = {
				...values,
				billDate: values.billDate.toISOString().split('T')[0],
				dueDate: values.dueDate.toISOString().split('T')[0],
				waterUsage: values.curReading - values.preReading,
			};

			const result = await store.updateBillingFromCsv(
				billing.value.id,
				updatedBilling,
			);
			if (result?.status === 'success') {
				toast.add({
					severity: 'success',
					summary: 'Success',
					detail: 'Billing updated successfully',
				});
			} else {
				toast.add({
					severity: 'error',
					summary: 'Error',
					detail: 'Failed to update billing',
				});
			}

			closeModal();
			emit('update');
		} catch (error) {
			console.error('Update failed:', error);
		}
	};

	const closeModal = () => {
		dialogRef.value.close();
	};
</script>
