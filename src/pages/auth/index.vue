<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { useFetch } from '@vueuse/core';
	import { signInWithCustomToken } from 'firebase/auth';
	import { onMounted, ref } from 'vue';
	import { getCurrentUser, useFirebaseAuth } from 'vuefire';
	import type { H3Response } from '@/types/h3response';

	const auth = useFirebaseAuth();
	const router = useRouter();
	const isSubmitted = ref(false);
	const isLoading = ref(false);
	const errorMessage = ref('');

	const initialValues = ref({
		accountNumber: '',
	});

	onMounted(async () => {
		const user = await getCurrentUser();
		if (user) {
			router.replace('/resident');
		}
	});
	async function onFormSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;
		errorMessage.value = '';
		try {
			const { data: token, error } = await useFetch(
				`${import.meta.env.VITE_API_URL}/auth/${
					initialValues.value.accountNumber
				}`,
			).json<H3Response<string>>();

			if (error.value) {
				throw error.value;
			}

			const user = await signInWithCustomToken(auth!, token.value?.data ?? '');
			if (user) {
				router.push('/resident');
			}
		} catch (e: any) {
			switch (e.code) {
				case 'auth/invalid-custom-token':
					errorMessage.value = 'Invalid authentication token.';
					break;
				case 'auth/user-disabled':
					errorMessage.value = 'This user account has been disabled.';
					break;
				case 'auth/user-not-found':
					errorMessage.value = 'No user found for this account number.';
					break;
				case 'auth/network-request-failed':
					errorMessage.value = 'Network error. Please check your connection.';
					break;
				default:
					errorMessage.value = 'Unknown Error. Please try again.';
			}
			console.error(e.code);
		}
		isLoading.value = false;
	}
</script>

<template>
	<div
		class="min-h-screen bg-linear-to-br from-primary-50 via-primary-100 to-primary-200 px-4 py-12 md:px-8 lg:px-16 flex items-center justify-center relative overflow-hidden">
		<!-- Animated background elements for depth and motion -->
		<div class="absolute inset-0 pointer-events-none">
			<div
				class="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
			<div
				class="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
			<div
				class="absolute top-40 left-40 w-80 h-80 bg-primary-100/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
		</div>

		<div class="w-full max-w-md z-10">
			<!-- Main card white solid -->
			<div
				class="relative bg-white border border-gray-200 shadow-xl rounded-3xl p-8 md:p-10 transform transition-all duration-500 hover:scale-[1.02]">
				<!-- Header with improved layout -->
				<div class="text-center mb-8">
					<div class="mx-auto mb-4">
						<Avatar
							image="/logo.png"
							size="xlarge"
							shape="circle" />
					</div>
					<h1 class="text-2xl md:text-3xl font-bold text-primary-800 mb-4">
						Calatrava Water System
					</h1>
					<p class="text-xl font-light text-gray-600">Welcome back</p>
				</div>

				<!-- Form with enhanced inputs and spacing -->
				<form
					@submit.prevent="onFormSubmit"
					class="space-y-6">
					<!-- Error message positioned better -->
					<div class="flex justify-center">
						<Message
							v-if="errorMessage"
							severity="error"
							size="small"
							variant="simple"
							class="bg-red-50 border-red-200 text-red-700">
							{{ errorMessage }}
						</Message>
					</div>

					<!-- Account Number field with IconField -->
					<div class="space-y-2">
						<label
							for="accountNumber"
							class="block text-sm font-medium text-gray-700"
							>Account Number</label
						>
						<IconField class="w-full">
							<InputIcon class="pi pi-id-card" />
							<InputText
								id="accountNumber"
								name="accountNumber"
								placeholder="Enter account no."
								:invalid="!initialValues.accountNumber && isSubmitted"
								v-model="initialValues.accountNumber"
								class="w-full" />
						</IconField>
						<Message
							v-if="!initialValues.accountNumber && isSubmitted"
							severity="error"
							size="small"
							variant="simple"
							class="ml-2">
							Please enter your account number.
						</Message>
					</div>

					<!-- Submit button with enhanced styling -->
					<Button
						label="Sign In"
						type="submit"
						icon="pi pi-sign-in"
						iconPos="right"
						:loading="isLoading"
						class="w-full py-3 text-lg font-semibold bg-primary-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 hover:bg-primary-700" />
				</form>

				<!-- Admin link -->
				<div class="text-center pt-6">
					<RouterLink
						class="text-primary hover:text-primary-700 font-medium transition-colors duration-200 inline-flex items-center gap-1 group"
						to="/auth/admin">
						Admin Login
						<i
							class="pi pi-arrow-right group-hover:translate-x-1 transition-transform duration-200"></i>
					</RouterLink>
				</div>
			</div>

			<!-- Subtle footer tagline -->
			<p class="text-center text-gray-500 mt-8 text-sm">
				Securely access your water services.
			</p>
		</div>
	</div>
</template>
