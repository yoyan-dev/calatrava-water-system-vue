<template>
	<div>
		<form @submit.prevent="onSubmit">
			<div class="w-full flex items-center gap-4">
				<IconField>
					<InputIcon>
						<i class="pi pi-search" />
					</InputIcon>
					<InputText
						v-model="searchQuery.email"
						placeholder="Search user by email" />
				</IconField>
				<Button
					label="Find"
					:loading="isSubmitting"
					type="submit" />
			</div>
		</form>

		<div
			v-if="store.userSearch"
			class="mt-8">
			<Card
				class="shadow-lg border border-surface-200 dark:border-surface-700 p-4">
				<template #header>
					<div class="relative -m-4 mb-0">
						<!-- Optional banner placeholder if you have one -->
						<div
							class="h-24 bg-linear-to-r from-primary-500 to-primary-600"></div>
						<Avatar
							image="/images/avatar-placeholder.jpg"
							size="xlarge"
							shape="circle"
							class="absolute bottom-0 left-8 transform translate-y-1/2 border-4 border-surface-0 dark:border-surface-900 shadow-xl" />
					</div>
					<div class="mt-16" />
					<!-- Spacer for avatar overlap -->
				</template>

				<template #title>
					<div class="text-2xl font-bold text-surface-900 dark:text-surface-0">
						{{ store.userSearch.displayName || 'Unnamed User' }}
					</div>
				</template>

				<template #subtitle>
					<div
						class="text-surface-600 dark:text-surface-300 flex items-center gap-2">
						<i class="pi pi-envelope"></i>
						{{ store.userSearch.email }}
					</div>
				</template>

				<template #content>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
						<div v-if="store.userSearch.customClaims">
							<div class="text-sm text-surface-500 dark:text-surface-400">
								Role
							</div>
							<div class="font-medium">
								{{ store.userSearch.customClaims.role }}
							</div>
						</div>
						<div v-if="store.userSearch.createdAt">
							<div class="text-sm text-surface-500 dark:text-surface-400">
								Joined
							</div>
							<div class="font-medium">
								{{ formatDate(store.userSearch.createdAt) }}
							</div>
						</div>
						<div v-if="store.userSearch.disabled">
							<div class="text-sm text-surface-500 dark:text-surface-400">
								Status
							</div>
							<div class="font-medium capitalize">
								<span
									:class="{
										'text-green-600 dark:text-green-400':
											!store.userSearch.disabled,
										'text-red-600 dark:text-red-400': store.userSearch.disabled,
									}">
									{{ store.userSearch.disabled ? 'Disabled' : 'Enabled' }}
								</span>
							</div>
						</div>
						<!-- Add more fields as needed -->
					</div>
				</template>

				<!-- <template #footer>
					<div
						class="flex justify-end gap-3 pt-4 border-t border-surface-200 dark:border-surface-700">
						<Button
							label="View Profile"
							icon="pi pi-user" />
						<Button
							label="Send Message"
							icon="pi pi-send"
							severity="secondary"
							outlined />
					</div>
				</template> -->
			</Card>
		</div>

		<div
			v-else-if="store.userSearch === null"
			class="mt-8 text-center text-surface-500 dark:text-surface-400">
			<i class="pi pi-info-circle text-4xl mb-4"></i>
			<p>No user found with that email.</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from '@/stores/user';
	import { reactive, ref } from 'vue';
	import { format } from 'date-fns'; // Optional: for nice date formatting, add if needed

	const store = useUserStore();
	const isSubmitting = ref(false);

	const searchQuery = reactive({
		email: '',
	});

	const formatDate = (date: string | Date) => {
		return format(new Date(date), 'MMMM d, yyyy');
	};

	async function onSubmit() {
		try {
			isSubmitting.value = true;
			await store.searchUser(searchQuery);
		} catch (error) {
			console.error('Error', error);
		} finally {
			isSubmitting.value = false;
		}
	}
</script>
