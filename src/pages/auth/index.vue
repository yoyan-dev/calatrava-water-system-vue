<script setup>
import { ref } from 'vue';

const initialValues = ref({
    username: '',
    email: ''
});


const onFormSubmit = ({ valid }) => {
    
};
</script>
<template>
    <div
        class="px-6 py-20 h-screen md:px-12 lg:px-20 flex items-center justify-center bg-[linear-gradient(-225deg,var(--p-primary-500),var(--p-primary-700)_48%,var(--p-primary-800))] dark:bg-[linear-gradient(-225deg,var(--p-primary-400),var(--p-primary-600)_48%,var(--p-primary-800))]"
    >
        <div class="p-12 shadow text-center lg:w-[30rem] backdrop-blur-md rounded-xl bg-slate-300">
			<Avatar image="/logo.jpeg" class="mr-2" size="xlarge" shape="circle" />
            <div class="text-4xl font-medium mb-12 ">Welcome</div>
            <Form :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex justify-center flex-col gap-4">
				<div class="flex flex-col gap-1">
					<InputText name="email" type="email" placeholder="Email" />
					<!-- <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message> -->
				</div>
				<div class="flex flex-col gap-1">
					<InputText name="password" type="password" placeholder="Password" />
					<!-- <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message> -->
				</div>
				<Button type="submit"  label="Submit" />
			</Form>
        </div>
    </div>
</template>
