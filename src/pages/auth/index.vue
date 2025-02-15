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

	const initialValues = ref({
		accountNumber: '',
	});

	async function onFormSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;
		try {
			const { data: token, error } = await useFetch<H3Response<string>>(
				`${import.meta.env.VITE_API_URL}/api/auth/${
					initialValues.value.accountNumber
				}`,
			);
			const res = JSON.parse(token.value as string) as H3Response<string>;

			const user = await signInWithCustomToken(auth!, res.data ?? '');
			if (user) {
				router.push('/resident');
				console.log(user);
			}
		} catch (e) {
			console.error(e);
		}
		isLoading.value = false;
	}
</script>
<template>
	<div
		class="px-6 py-20 h-screen md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]">
		<div
			class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl border bg-white">
			<Avatar
				image="/logo.jpeg"
				class="mr-2"
				size="xlarge"
				shape="circle" />
			<div class="text-2xl font-medium">CALATRAVA WATER SYSTEM</div>
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
				<Button
					type="submit"
					label="Submit"
					:loading="isLoading" />
			</form>
		</div>
	</div>
</template>
