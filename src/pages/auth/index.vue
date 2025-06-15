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
		class="px-3 py-20 h-screen md:px-12 lg:px-20 flex items-center flex-col justify-evenly">
		<div
			class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md border border-primary rounded-lg bg-white">
			<div class="text-lg md:text-2xl font-medium text-primary">
				CALATRAVA WATER SYSTEM
			</div>
			<Avatar
				image="/logo.png"
				size="xlarge"
				shape="circle" />
			<div class="text-xl text-slate-500 mb-12">Welcome</div>
			<form
				@submit.prevent="onFormSubmit"
				class="flex justify-center flex-col gap-4">
				<div class="flex flex-col gap-1">
					<InputText
						name="accountNumber"
						placeholder="Enter account no."
						:invalid="!initialValues.accountNumber && isSubmitted"
						v-model="initialValues.accountNumber" />
					<Message
						v-if="!initialValues.accountNumber && isSubmitted"
						severity="error"
						size="small"
						variant="simple"
						>Please enter your account number.</Message
					>
				</div>
				<Message
					v-if="errorMessage"
					severity="error"
					size="small"
					variant="simple"
					>{{ errorMessage }}</Message
				>
				<Button
					type="submit"
					label="Submit"
					:loading="isLoading" />
				<RouterLink
					class="text-primary"
					to="/auth/admin"
					>Admin log in <i class="pi pi-arrow-right"></i>
				</RouterLink>
			</form>
		</div>
	</div>
</template>
