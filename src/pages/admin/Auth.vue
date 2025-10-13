<script setup lang="ts">
	import { ref } from 'vue';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { useRouter } from 'vue-router';
	import { useFirebaseAuth } from 'vuefire';

	const initialValues = ref({
		email: '',
		password: '',
	});

	const auth = useFirebaseAuth()!;
	const router = useRouter();
	const isLoading = ref(false);
	const errorMessage = ref();

	async function onFormSubmit() {
		isLoading.value = true;
		try {
			const { email, password } = initialValues.value;
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			console.log('User signed in:', userCredential.user);
			if (userCredential) {
				router.push('/admin/dashboard');
			}
		} catch (error: any) {
			console.error('Error signing in:', error);
			switch (error.code) {
				case 'auth/invalid-email':
					errorMessage.value = 'Email is invalid.';
					break;
				case 'auth/user-not-found':
					errorMessage.value = 'User is not registered.';
					break;
				case 'auth/wrong-password':
					errorMessage.value = 'Wrong password.';
					break;
				case 'auth/invalid-credential':
					errorMessage.value = 'Incorrect email or password.';
					break;
				default:
					errorMessage.value = 'Unknown error. Please try again.';
			}
		} finally {
			isLoading.value = false;
		}
	}
</script>

<template>
	<div
		class="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 px-4 py-12 md:px-8 lg:px-16 flex items-center justify-center relative overflow-hidden">
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
					<p class="text-xl font-light text-gray-600">Log in as Admin</p>
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

					<!-- Email field with IconField -->
					<div class="space-y-2">
						<label
							for="email"
							class="block text-sm font-medium text-gray-700"
							>Email Address</label
						>
						<IconField class="w-full">
							<InputIcon class="pi pi-envelope" />
							<InputText
								id="email"
								v-model="initialValues.email"
								name="email"
								type="email"
								placeholder="Enter your email"
								class="w-full" />
						</IconField>
					</div>

					<!-- Password field with IconField -->
					<div class="space-y-2">
						<label
							for="password"
							class="block text-sm font-medium text-gray-700"
							>Password</label
						>
						<IconField class="w-full">
							<InputIcon class="pi pi-lock" />
							<Password
								inputId="password"
								placeholder="Enter your password"
								v-model="initialValues.password"
								:feedback="false"
								toggleMask
								fluid />
						</IconField>
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
			</div>

			<!-- Subtle footer tagline -->
			<p class="text-center text-gray-500 mt-8 text-sm">
				Securely access your water services.
			</p>
		</div>
	</div>
</template>

<style scoped>
	.animate-pulse-slow {
		animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
	.delay-1000 {
		animation-delay: 1s;
	}
	.delay-2000 {
		animation-delay: 2s;
	}
</style>
