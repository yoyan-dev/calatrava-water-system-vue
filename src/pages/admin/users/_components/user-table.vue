<script setup lang="ts">
	import { onMounted } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import { useRouter } from 'vue-router';
	import { useUserStore } from '@/stores/user';

	const toast = useToast();
	const router = useRouter();
	const userStore = useUserStore();

	const { users, isLoading, totalUsers, searchQuery } = userStore;

	const fetchUsers = () => {
		userStore.fetchUsers();
	};

	const onPage = (event: any) => {
		userStore.page = event.page;
	};

	const onSearch = () => {
		userStore.page = 0;
		fetchUsers();
	};

	const onEdit = (user: any) => {
		router.push({ name: 'users-edit', params: { id: user.uid } });
	};

	const onDelete = async (user: any) => {
		const confirmed = confirm(
			`Are you sure you want to delete user ${user.email}?`,
		);
		if (confirmed) {
			const result = await userStore.deleteUser(user.uid);
			if (result.status === 'success') {
				toast.add({
					severity: 'success',
					summary: 'Success',
					detail: result.message,
					life: 3000,
				});
			} else {
				toast.add({
					severity: 'error',
					summary: 'Error',
					detail: result.message,
					life: 3000,
				});
			}
		}
	};

	onMounted(() => {
		fetchUsers();
	});
</script>

<template>
	<div>
		<div class="flex justify-between items-center gap-4 mb-4">
			<div class="flex items-center gap-4">
				<IconField>
					<InputIcon class="pi pi-search" />
					<InputText
						v-model="searchQuery"
						icon="pi pi-search"
						placeholder="Search"
						class="pl-10 w-64"
						@keyup.enter="onSearch" />
				</IconField>
			</div>
			<Button
				icon="pi pi-user-plus"
				severity="primary"
				@click=""
				class="text-white" />
		</div>
	</div>
</template>
