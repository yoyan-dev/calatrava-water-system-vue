<script setup lang="ts">
	import { ref, onMounted, computed, inject } from 'vue';
	import { useForm, useField } from 'vee-validate';
	import * as yup from 'yup';
	import { useUserStore } from '@/stores/user';
	import type { User } from '@/types/user';
	import { useToast } from 'primevue/usetoast';

	const dialogRef: any = inject('dialogRef');
	const mode = computed(() => dialogRef.value.data.mode);
	const user = computed(() => dialogRef.value.data.user as User | undefined);

	const store = useUserStore();
	const toast = useToast();
	const isSubmitting = ref(false);
	const showPassword = ref(false); // For edit mode toggle

	// Dynamic schema as computed to react to mode changes
	const schema = computed(() =>
		yup.object({
			displayName: yup.string().required('Display Name is required.'),
			email: yup
				.string()
				.required('Email is required.')
				.email('Email is invalid.'),
			password:
				mode.value === 'create'
					? yup
							.string()
							.required('Password is required.')
							.min(6, 'Password must be at least 6 characters.')
					: yup
							.string()
							.test(
								'password-validation',
								'Password must be at least 6 characters if provided.',
								function (value) {
									if (!value || value.length === 0) {
										return true; // Empty is allowed in edit mode
									}
									return value.length >= 6;
								},
							),
			customClaims: yup
				.object({
					role: yup.string().required('Role is required.'),
				})
				.required('Custom claims are required.'),
		}),
	);

	// Form setup with computed schema
	const { handleSubmit, resetForm } = useForm({
		validationSchema: schema,
		initialValues: {
			displayName: '',
			email: '',
			password: '',
			customClaims: { role: 'staff' },
		},
	});

	// Reactive fields
	const { value: displayName, errorMessage: displayNameError } =
		useField<string>('displayName');
	const { value: email, errorMessage: emailError } = useField<string>('email');
	const { value: password, errorMessage: passwordError } =
		useField<string>('password');
	const { value: customClaims, errorMessage: customClaimsError } =
		useField<object>('customClaims', {
			initialValue: { role: 'resident' },
		});

	// Prefill form in edit mode (watcher triggers on prop change)
	onMounted(() => {
		if (mode.value === 'edit' && user.value) {
			resetForm({
				values: {
					displayName: user.value.displayName,
					email: user.value.email,
					password: '',
					customClaims: user.value.customClaims,
				},
			});
		}
	});

	// Submit form
	const onSubmit = handleSubmit(
		async (values) => {
			isSubmitting.value = true;
			const userData: Partial<User> = {
				displayName: values.displayName,
				email: values.email,
				...(values.password && { password: values.password }), // Only include if provided
				customClaims: values.customClaims as { role: string },
			};

			let response;
			if (mode.value === 'create') {
				response = await store.addUser(userData as User);
			} else {
				response = await store.updateUser(user.value!.uid!, userData);
			}

			toast.add({
				severity: response.status,
				summary: response.statusMessage,
				detail: response.message,
				life: 3000,
			});

			if (response.status === 'success') {
				closeModal();
			}
			isSubmitting.value = false;
		},
		(errors) => {
			// Optional: Log validation errors for debugging
			console.error('Validation errors:', errors);
		},
	);

	const closeModal = () => {
		dialogRef.value.close();
		resetForm();
		showPassword.value = false;
	};
</script>

<template>
	<div>
		<form
			@submit="onSubmit"
			class="flex flex-col gap-4">
			<div class="flex flex-col gap-4">
				<div>
					<label
						for="display-name"
						class="block mb-1"
						>Display Name</label
					>
					<InputText
						v-model="displayName"
						variant="filled"
						:invalid="!!displayNameError"
						fluid />
					<small
						v-if="displayNameError"
						class="text-red-500"
						>{{ displayNameError }}</small
					>
				</div>
				<div>
					<label
						for="email"
						class="block mb-1"
						>Email</label
					>
					<InputText
						v-model="email"
						type="email"
						variant="filled"
						:invalid="!!emailError"
						fluid
						:disabled="mode === 'edit'" />
					<!-- Optional: Read-only in edit -->
					<small
						v-if="emailError"
						class="text-red-500"
						>{{ emailError }}</small
					>
				</div>
				<div v-if="mode === 'create' || showPassword">
					<label
						for="password"
						class="block mb-1"
						>Password</label
					>
					<Password
						v-model="password"
						variant="filled"
						:feedback="false"
						:invalid="!!passwordError"
						fluid
						toggle-mask />
					<small
						v-if="passwordError"
						class="text-red-500"
						>{{ passwordError }}</small
					>
				</div>
				<div v-if="mode === 'edit' && !showPassword">
					<Button
						label="Change Password"
						size="small"
						text
						@click="showPassword = true" />
				</div>
				<div>
					<label
						for="claims"
						class="block mb-1"
						>Role</label
					>
					<Select
						v-model="customClaims"
						:options="[
							{ label: 'Staff', value: { role: 'staff' } },
							{ label: 'Admin', value: { role: 'admin' } },
						]"
						option-label="label"
						option-value="value"
						placeholder="Select Role"
						class="w-full" />
					<small
						v-if="customClaimsError"
						class="text-red-500"
						>{{ customClaimsError }}</small
					>
				</div>
			</div>

			<div class="w-full flex items-center justify-end gap-4">
				<Button
					label="Cancel"
					severity="danger"
					text
					@click="closeModal" />
				<Button
					:label="mode === 'create' ? 'Create' : 'Update'"
					:loading="isSubmitting"
					type="submit" />
			</div>
		</form>
	</div>
</template>
