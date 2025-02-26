<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { useFetch } from '@vueuse/core';
	import { signInWithCustomToken } from 'firebase/auth';
	import { ref } from 'vue';
	import { useFirebaseAuth } from 'vuefire';
	import type { H3Response } from '@/types/h3response';

	const auth = useFirebaseAuth();
	const router = useRouter();
	const isSubmitted = ref(false);
	const isLoading = ref(false);
	const errorMessage = ref('');

	const initialValues = ref({
		accountNumber: '',
	});

	async function onFormSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;
		errorMessage.value = '';
		try {
			const { data: token } = await useFetch(
				`${import.meta.env.VITE_API_URL}/api/auth/${
					initialValues.value.accountNumber
				}`,
			).json<H3Response<string>>();

			const user = await signInWithCustomToken(auth!, token.value?.data ?? '');
			console.log(user);
			if (user) {
				router.push('/resident');
				console.log(user);
			}
		} catch (e) {
			errorMessage.value = 'Failed to sign in. Please try again.';
			console.error(e);
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
			</form>
		</div>
	</div>
</template>
