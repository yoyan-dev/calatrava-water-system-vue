<template>
	<div class="p-6 max-w-6xl mx-auto">
		<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
			Edit Collection Payment
		</h2>

		<Form
			v-slot="{ errors, isSubmitting }"
			:validation-schema="validationSchema"
			:initial-values="initialValues"
			@submit="onSubmit"
			class="space-y-6">
			<!-- Grid Layout -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<!-- Receipt Info -->
				<div>
					<label class="block text-sm font-medium mb-1">Receipt No.</label>
					<Field
						name="receiptNo"
						v-model="form.receiptNo"
						v-slot="{ field, errorMessage }">
						<InputText
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							placeholder="e.g. 6994384"
							disabled />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Receipt Type</label>
					<Field
						name="receiptType"
						v-model="form.receiptType"
						v-slot="{ field, errorMessage, handleChange, handleBlur }">
						<Select
							:model-value="field.value"
							@update:model-value="handleChange"
							@blur="handleBlur"
							:options="receiptTypeOptions"
							option-label="label"
							option-value="value"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							placeholder="Select type" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Status</label>
					<Field
						name="receiptStatus"
						v-model="form.receiptStatus"
						v-slot="{ field, errorMessage, handleChange, handleBlur }">
						<Select
							:model-value="field.value"
							@update:model-value="handleChange"
							@blur="handleBlur"
							:options="statusOptions"
							option-label="label"
							option-value="value"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							placeholder="Select status" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<!-- Customer Info -->
				<div>
					<label class="block text-sm font-medium mb-1">Account No.</label>
					<Field
						name="accountNo"
						v-model="form.accountNo"
						v-slot="{ field, errorMessage }">
						<InputText
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							placeholder="e.g. 0611202177" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Customer No.</label>
					<Field
						name="custNo"
						v-model="form.custNo"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
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

				<div class="md:col-span-2 lg:col-span-1">
					<label class="block text-sm font-medium mb-1">Full Name</label>
					<Field
						name="fullName"
						v-model="form.fullName"
						v-slot="{ field, errorMessage }">
						<InputText
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							placeholder="Last, First - Suffix" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<!-- Payment Date & Teller -->
				<div>
					<label class="block text-sm font-medium mb-1">Payment Date</label>
					<Field
						name="pymtDate"
						v-model="form.pymtDate"
						v-slot="{ field, errorMessage }">
						<DatePicker
							:model-value="field.value ? parseDate(field.value) : null"
							@update:model-value="(val) => field.onChange(formatDate(val as Date | null))"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							date-format="mm/dd/yy"
							show-icon
							icon-display="input"
							placeholder="mm/dd/yyyy" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Teller</label>
					<Field
						name="teller"
						v-model="form.teller"
						v-slot="{ field, errorMessage }">
						<InputText
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							placeholder="Cashier name" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Payment Method</label>
					<Field
						name="pymtMethod"
						v-model="form.pymtMethod"
						v-slot="{ field, errorMessage, handleChange, handleBlur }">
						<Select
							:model-value="field.value"
							@update:model-value="handleChange"
							@blur="handleBlur"
							:options="paymentMethodOptions"
							option-label="label"
							option-value="value"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							placeholder="Select method" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<!-- Amounts -->
				<div>
					<label class="block text-sm font-medium mb-1">Cash Tendered</label>
					<Field
						name="cash"
						v-model="form.cash"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							mode="currency"
							currency="PHP"
							locale="en-PH"
							:min="0"
							input-class="text-right" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Water Bill</label>
					<Field
						name="waterBill"
						v-model="form.waterBill"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							mode="currency"
							currency="PHP"
							locale="en-PH"
							:min="0"
							input-class="text-right" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Applied Amount</label>
					<Field
						name="pacyAmnt"
						v-model="form.pacyAmnt"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							mode="currency"
							currency="PHP"
							locale="en-PH"
							:min="0"
							input-class="text-right" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Env. Fee</label>
					<Field
						name="envFee"
						v-model="form.envFee"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							mode="currency"
							currency="PHP"
							locale="en-PH"
							:min="0"
							input-class="text-right" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Discount</label>
					<Field
						name="discAmnt"
						v-model="form.discAmnt"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							mode="currency"
							currency="PHP"
							locale="en-PH"
							:min="0"
							input-class="text-right" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Penalty</label>
					<Field
						name="penAmnt"
						v-model="form.penAmnt"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							mode="currency"
							currency="PHP"
							locale="en-PH"
							:min="0"
							input-class="text-right" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<!-- Arrears -->
				<div>
					<label class="block text-sm font-medium mb-1">Pay Arrears</label>
					<Field
						name="payArrears"
						v-model="form.payArrears"
						v-slot="{ field, errorMessage, handleChange }">
						<div class="flex items-center h-[38px]">
							<ToggleSwitch
								:model-value="field.value"
								@update:model-value="handleChange"
								:class="{ 'p-invalid': !!errorMessage }" />
							<span class="ml-2 text-sm">{{ field.value ? 'Yes' : 'No' }}</span>
						</div>
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>

				<div>
					<label class="block text-sm font-medium mb-1">Arrears Amount</label>
					<Field
						name="arrearsAmt"
						v-model="form.arrearsAmt"
						v-slot="{ field, errorMessage }">
						<InputNumber
							:model-value="field.value"
							@update:model-value="field.onChange"
							@blur="field.onBlur as EventListener"
							:class="{ 'text-red-600 dark:text-red-400': !!errorMessage }"
							class="w-full"
							mode="currency"
							currency="PHP"
							locale="en-PH"
							:min="0"
							input-class="text-right" />
						<small
							v-if="errorMessage"
							class="text-red-600 dark:text-red-400">
							{{ errorMessage }}
						</small>
					</Field>
				</div>
			</div>

			<!-- Action Buttons -->
			<div
				class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
				<Button
					type="button"
					label="Cancel"
					severity="secondary"
					@click="closeModal" />
				<Button
					type="submit"
					label="Save Changes"
					severity="primary"
					:loading="isSubmitting"
					:disabled="Object.keys(errors).length > 0" />
			</div>
		</Form>
	</div>
</template>
<script setup lang="ts">
	import { ref, computed, inject } from 'vue';
	import { Form, Field } from 'vee-validate';
	import { object, string, number, boolean } from 'yup';
	import { useToast } from 'primevue/usetoast';
	import { useCollectionStore } from '@/stores/collection';
	import type { CollectionItemFromCsv } from '@/types/collection-from-csv';

	const dialogRef: any = inject('dialogRef');
	const collection = computed<CollectionItemFromCsv>(
		() => dialogRef.value.data.collection,
	);
	const toast = useToast();
	const store = useCollectionStore();

	// === Initial Form Values (only mutable fields) ===
	const initialValues = computed(() => {
		const { id, createdAt, updatedAt, ...rest } = collection.value;
		return {
			...rest,
			pymtDate: rest.pymtDate || '',
		};
	});

	// === Reactive Form ===
	const form = ref({ ...initialValues.value });

	// === Validation Schema ===
	const validationSchema = object({
		receiptNo: string().required('Receipt No. is required'),
		receiptType: string().required('Receipt type is required'),
		receiptStatus: string().required('Status is required'),
		accountNo: string().required('Account No. is required'),
		custNo: number().min(0).required('Customer No. is required'),
		fullName: string().required('Full name is required'),
		pymtDate: string().required('Payment date is required'),
		teller: string().required('Teller is required'),
		pymtMethod: number().required('Payment method is required'),
		cash: number().min(0).required('Cash is required'),
		waterBill: number().min(0).required('Water bill is required'),
		pacyAmnt: number().min(0).required('Applied amount is required'),
		envFee: number().min(0).required('Env fee is required'),
		discAmnt: number().min(0).required('Discount is required'),
		penAmnt: number().min(0).required('Penalty is required'),
		payArrears: boolean().required(),
		arrearsAmt: number().min(0).required('Arrears amount is required'),
	});

	// === Select Options ===
	const receiptTypeOptions = [
		{ label: 'Payment', value: '04' },
		{ label: 'Adjustment', value: '05' },
		{ label: 'Reconnection', value: '06' },
	];

	const statusOptions = [
		{ label: 'Posted', value: '01' },
		{ label: 'Voided', value: '02' },
		{ label: 'Cancelled', value: '03' },
	];

	const paymentMethodOptions = [
		{ label: 'Cash', value: 1 },
		{ label: 'Check', value: 2 },
		{ label: 'Online', value: 3 },
		{ label: 'GCash', value: 4 },
		{ label: 'Card', value: 5 },
	];

	// === Date Helpers ===
	const parseDate = (str: string) => {
		if (!str) return null;
		const [day, month, year] = str.split('/');
		return new Date(`${year}-${month}-${day}`);
	};

	const formatDate = (date: Date | null) => {
		if (!date) return '';
		const d = new Date(date);
		return `${String(d.getDate()).padStart(2, '0')}/${String(
			d.getMonth() + 1,
		).padStart(2, '0')}/${d.getFullYear()}`;
	};

	// === Submit Handler ===
	const onSubmit = async (values: any) => {
		try {
			// Remove any server-generated fields that might have slipped in
			const { id, createdAt, updatedAt, ...updates } = values;

			const result = await store.updateCollectionFromCsv(
				collection.value.id,
				updates,
			);

			if (result?.status === 'success') {
				toast.add({
					severity: 'success',
					summary: 'Success',
					detail: 'Collection updated successfully',
					life: 3000,
				});
			} else {
				toast.add({
					severity: 'error',
					summary: 'Error',
					detail: 'Failed to update collection',
				});
			}

			closeModal();
		} catch (error: any) {
			toast.add({
				severity: 'error',
				summary: 'Error',
				detail: error.message || 'Failed to update collection',
				life: 5000,
			});
		}
	};

	const closeModal = () => {
		dialogRef.value.close();
	};
</script>
