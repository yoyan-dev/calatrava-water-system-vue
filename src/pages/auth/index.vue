<script setup lang="ts">
	import { useFetch } from '@vueuse/core';
	import { signInWithCustomToken } from 'firebase/auth';
	import { ref } from 'vue';
	import { useFirebaseAuth } from 'vuefire';

	const auth = useFirebaseAuth();

	const initialValues = ref({
		accountNumber: '',
	});

	async function onFormSubmit() {
		const { data, error } = await useFetch<any>(
			`${import.meta.env.VITE_API_URL}/api/auth/${
				initialValues.value.accountNumber
			}`,
		);
		const res = JSON.parse(data.value);

		const user = await signInWithCustomToken(auth!, res.data);
		console.log(user);
	}
</script>
<template>
	<div
		class="px-6 py-20 h-screen md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]">
		<div
			class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-slate-300">
			<Avatar
				image="/logo.jpeg"
				class="mr-2"
				size="xlarge"
				shape="circle" />
			<div class="text-4xl font-medium mb-12">Welcome</div>
			<Form
				:initialValues="initialValues"
				class="flex justify-center flex-col gap-4">
				<div class="flex flex-col gap-1">
					<InputText
						name="acc-no"
						placeholder="Enter account no."
						v-model="initialValues.accountNumber" />
					<!-- <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message> -->
				</div>
				<Button
					@click="onFormSubmit()"
					label="Submit" />
			</Form>
		</div>
	</div>
</template>
