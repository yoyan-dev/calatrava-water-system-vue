<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import { useUserStore } from '@/stores/user';
	import type { User } from '@/types/user';
	import { useToast } from 'primevue/usetoast';

	const store = useUserStore();
	const toast = useToast();
	const isOpen = ref(false);
	const isLoading = ref(false);

	const user = ref<User>({});
	const role = ref<'admin' | 'resident'>('resident');
	const errorEmailMessage = ref('');

	const isSubmitted = ref(false);

	async function onSubmit() {
		isLoading.value = true;
		isSubmitted.value = true;

		// Simple client-side checks
		if (!user.value.email || !user.value.displayName || !user.value.password) {
			toast.add({
				severity: 'error',
				summary: 'Error',
				detail: 'All fields are required',
				life: 3000,
			});
			isLoading.value = false;
			return;
		}

		isSubmitted.value = false;
		const userData: User = {
			...user.value,
			claims: { role: role.value },
		};
		const response = await store.addUser(userData);
		toast.add({
			severity: response.status,
			summary: response.statusMessage,
			detail: response.message,
			life: 3000,
		});
		isOpen.value = false;
		user.value = {};
		role.value = 'resident';
		isLoading.value = false;
	}
</script>

<template>
	<div>
		<Button
			icon="pi pi-user-plus"
			@click="isOpen = true" />
		<Dialog
			v-model:visible="isOpen"
			:style="{ width: '450px' }"
			header="Create User"
			modal>
			<form
				@submit.prevent="onSubmit"
				class="flex flex-col gap-4">
				<div class="flex flex-col gap-4">
					<div>
						<label
							for="display-name"
							class="block mb-1"
							>Display Name</label
						>
						<InputText
							id="display-name"
							v-model.trim="user.displayName"
							variant="filled"
							autofocus
							:invalid="isSubmitted && !user.displayName"
							fluid />
						<small
							v-if="isSubmitted && !user.displayName"
							class="text-red-500"
							>Display Name is required.</small
						>
					</div>
					<div>
						<label
							for="email"
							class="block mb-1"
							>Email</label
						>
						<InputText
							id="email"
							v-model.trim="user.email"
							type="email"
							variant="filled"
							:invalid="isSubmitted && !user.email"
							fluid />
						<small
							v-if="(isSubmitted && !user.email) || errorEmailMessage"
							class="text-red-500"
							>{{
								errorEmailMessage ? errorEmailMessage : 'Email is required.'
							}}</small
						>
					</div>
					<div>
						<label
							for="password"
							class="block mb-1"
							>Password</label
						>
						<InputPassword
							id="password"
							v-model="user.password"
							variant="filled"
							:feedback="false"
							:invalid="isSubmitted && !user.password"
							fluid
							toggle-mask />
						<small
							v-if="isSubmitted && !user.password"
							class="text-red-500"
							>Password is required.</small
						>
					</div>
					<div>
						<label
							for="role"
							class="block mb-1"
							>Role</label
						>
						<Dropdown
							v-model="role"
							:options="[
								{ label: 'Resident', value: 'resident' },
								{ label: 'Admin', value: 'admin' },
							]"
							option-label="label"
							option-value="value"
							placeholder="Select Role"
							class="w-full" />
					</div>
				</div>

				<div class="w-full flex items-center justify-end gap-4">
					<Button
						label="Cancel"
						severity="danger"
						text
						@click="isOpen = false" />
					<Button
						label="Save"
						:loading="isLoading"
						type="submit" />
				</div>
			</form>
		</Dialog>
	</div>
</template>
