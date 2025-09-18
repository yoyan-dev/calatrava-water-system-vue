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
		class="px-6 py-20 h-screen md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]">
		<div
			class="p-12 shadow-sm text-center lg:w-120 backdrop-blur-md rounded-xl bg-white">
			<Avatar
				image="/logo.png"
				class="mr-2"
				size="xlarge"
				shape="circle" />
			<div class="text-2xl font-medium">CALATRAVA WATER SYSTEM</div>
			<div class="text-xl text-slate-500 mb-12">Welcome</div>
			<form
				@submit.prevent="onFormSubmit"
				class="flex justify-center flex-col gap-4">
				<div class="flex justify-center">
					<Message
						v-if="errorMessage"
						severity="error"
						size="small"
						variant="simple"
						>{{ errorMessage }}</Message
					>
				</div>
				<div class="flex flex-col gap-1">
					<InputText
						v-model="initialValues.email"
						name="email"
						type="email"
						placeholder="Email" />
					<!-- <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message> -->
				</div>
				<div class="flex flex-col gap-1">
					<Password
						placeholder="Password"
						v-model="initialValues.password"
						:feedback="false"
						toggleMask
						fluid />
				</div>
				<Button
					label="Submit"
					type="submit"
					:loading="isLoading" />
			</form>
		</div>
	</div>
</template>
