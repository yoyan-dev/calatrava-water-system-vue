<script setup lang="ts">
	import { ref } from 'vue';
	import type { Admin } from '@/types/admin';
	import { useAdminStore } from '@/stores/admin';
	import { useToast } from 'primevue/usetoast';
	import Avatar from 'primevue/avatar';
	import Button from 'primevue/button';
	import FileUpload from 'primevue/fileupload';
	import InputGroup from 'primevue/inputgroup';
	import InputGroupAddon from 'primevue/inputgroupaddon';
	import InputText from 'primevue/inputtext';
	import Password from 'primevue/password';

	const store = useAdminStore();
	const toast = useToast();
	const isUpdate = ref(false);

	const newPassword = ref('');
	const confirmPassword = ref('');

	const image = ref();

	const selectedFile = ref();
	function onFileSelect(event: any) {
		selectedFile.value = event;
		const file = event.files[0];
		const reader = new FileReader();

		reader.onload = async (e) => {
			image.value = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	}

	function validatePassword() {
		if (newPassword.value !== confirmPassword.value) {
			toast.add({
				severity: 'error',
				summary: 'Password Error!',
				detail: 'Password does not match!',
				life: 3000,
			});
			return false;
		}
		store.admin.password = newPassword.value;
		return true;
	}

	async function updateProfile(payload: Admin) {
		if (!validatePassword()) return;

		const res = await store.updateAdmin({
			uid: payload.uid as string,
			body: { ...payload, photoURL: selectedFile.value },
		});
		toast.add({
			severity: res.status,
			summary: res.statusMessage || 'Upload Status',
			detail: res.message,
			life: 3000,
		});
		isUpdate.value = false;
		newPassword.value = '';
		confirmPassword.value = '';
	}
</script>

<template>
	<div class="p-4 md:p-6">
		<h1 class="text-xl font-semibold text-surface-900 dark:text-surface-50">Settings</h1>
		<div class="flex flex-col gap-4 mt-4">
			<!-- Account Section -->
			<div>
				<h2 class="text-lg font-medium text-surface-800 dark:text-surface-100">Account</h2>
				<div class="flex flex-col gap-4 mt-4 p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-900">
					<div class="flex items-end gap-4">
						<Avatar
							:image="image || store.admin.photoURL || '/default.jpg'"
							size="xlarge"
							class="border-2 border-surface-200 dark:border-surface-700 rounded-full"
						/>
						<div v-if="!isUpdate">
							<Button
								icon="pi pi-pen-to-square"
								severity="secondary"
								outlined
								size="small"
								@click="isUpdate = !isUpdate"
							>
								Edit
							</Button>
						</div>
						<FileUpload
							v-else
							mode="basic"
							@select="onFileSelect($event)"
							customUpload
							auto
							severity="secondary"
							chooseLabel="Upload Photo"
							class="p-button-outlined p-button-sm"
						/>
					</div>
					<div class="flex flex-col gap-4">
						<span class="text-base font-semibold text-surface-800 dark:text-surface-100">Personal Details</span>
						<div class="flex flex-wrap gap-4">
							<div class="flex-1 min-w-[200px]">
								<label for="name" class="text-sm font-medium text-surface-700 dark:text-surface-200">Full Name</label>
								<InputGroup>
									<InputGroupAddon class="bg-surface-100 dark:bg-surface-800">
										<i class="pi pi-user text-surface-600 dark:text-surface-300"></i>
									</InputGroupAddon>
									<InputText
										:disabled="!isUpdate"
										v-model="store.admin.displayName"
										placeholder="Enter your full name"
										class="w-full"
									/>
								</InputGroup>
							</div>
							<div class="flex-1 min-w-[200px]">
								<label for="email" class="text-sm font-medium text-surface-700 dark:text-surface-200">Email</label>
								<InputGroup>
									<InputGroupAddon class="bg-surface-100 dark:bg-surface-800">
										<i class="pi pi-envelope text-surface-600 dark:text-surface-300"></i>
									</InputGroupAddon>
									<InputText
										:disabled="!isUpdate"
										v-model="store.admin.email"
										placeholder="Email"
										class="w-full"
									/>
								</InputGroup>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Password Section -->
			<div v-if="isUpdate" class="p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-900">
				<span class="text-base font-semibold text-surface-800 dark:text-surface-100">Change Password</span>
				<div class="flex flex-wrap gap-4 mt-4">
					<div class="flex-1 min-w-[200px]">
						<label for="password" class="text-sm font-medium text-surface-700 dark:text-surface-200">New Password</label>
						<InputGroup>
							<InputGroupAddon class="bg-surface-100 dark:bg-surface-800">
								<i class="pi pi-lock text-surface-600 dark:text-surface-300"></i>
							</InputGroupAddon>
							<Password
								v-model="newPassword"
								placeholder="New password"
								:feedback="false"
								toggleMask
								class="w-full"
							/>
						</InputGroup>
					</div>
					<div class="flex-1 min-w-[200px]">
						<label for="confirmPassword" class="text-sm font-medium text-surface-700 dark:text-surface-200">Confirm Password</label>
						<InputGroup>
							<InputGroupAddon class="bg-surface-100 dark:bg-surface-800">
								<i class="pi pi-lock text-surface-600 dark:text-surface-300"></i>
							</InputGroupAddon>
							<Password
								v-model="confirmPassword"
								placeholder="Confirm password"
								:feedback="false"
								toggleMask
								class="w-full"
							/>
						</InputGroup>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div v-if="isUpdate" class="flex justify-end">
				<Button
					label="Update"
					severity="primary"
					:loading="store.isLoading"
					@click="updateProfile(store.admin)"
					class="p-button-sm"
				/>
			</div>
		</div>
	</div>
</template>