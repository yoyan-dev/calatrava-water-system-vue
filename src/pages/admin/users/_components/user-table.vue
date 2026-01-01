<template>
	<div>
		<Header page-title="User Management" />
		<div class="flex justify-between items-center gap-4 mb-4">
			<SearchInput />
			<Button
				label="Create User"
				icon="pi pi-plus"
				class="mt-4"
				@click="handleDialog(null)" />
		</div>

		<!-- System User Table -->
		<div class="mb-4">
			<h1 class="text-md font-medium text-gray-900 dark:text-white">
				System Users
			</h1>
			<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
				Admins and staff with elevated privileges
			</p>
		</div>

		<DataTable
			:value="users"
			data-key="uid"
			:rows="10"
			:loading="isLoading">
			<template #empty>
				<div class="flex items-center justify-center p-4">No users found.</div>
			</template>
			<Column
				field="uid"
				header="UID">
				<template #body="slotProps">
					<span
						:title="slotProps.data.uid"
						class="block max-w-32 truncate text-xs font-mono">
						{{ slotProps.data.uid }}
					</span>
				</template>
			</Column>

			<Column
				field="displayName"
				header="Name" />
			<Column
				field="email"
				header="Email" />
			<Column
				field="role"
				header="Role">
				<template #body="{ data }">
					<span
						class="capitalize"
						:class="data.role === 'admin' ? 'text-red-600' : 'text-primary'">
						{{ data.role }}
					</span>
				</template>
			</Column>
			<Column header="Actions">
				<template #body="{ data }">
					<div class="flex gap-2">
						<Button
							text
							icon="pi pi-pencil"
							severity="secondary"
							size="small"
							@click="handleDialog(data)" />
						<Button
							icon="pi pi-trash"
							size="small"
							severity="danger"
							text
							@click="handleDelete(data)" />
					</div>
				</template>
			</Column>
		</DataTable>
	</div>
</template>
<script setup lang="ts">
	import { computed, ref, onMounted } from 'vue';
	import { useUserStore } from '@/stores/user';
	import { useDialog } from 'primevue/usedialog';
	import UserModalForm from './modals/user-modal-form.vue';
	import { useConfirm } from 'primevue/useconfirm';
	import { useToast } from 'primevue/usetoast';
	import Header from '@/components/globals/header.vue';
	import SearchInput from './search-input.vue';

	const userStore = useUserStore();
	const users = computed(() => userStore.systemUsers);
	const isLoading = ref(false);
	const dialog = useDialog();
	const confirmUserDelete = useConfirm();
	const toast = useToast();

	function handleDialog(user: any) {
		dialog.open(UserModalForm, {
			props: {
				header: `${user ? 'Edit' : 'Create'} User`,
				style: { width: '30vw' },
				dismissableMask: true,
			},
			data: { mode: user ? 'edit' : 'create', user },
		});
	}

	function handleDelete(user: any) {
		confirmUserDelete.require({
			message: `Are you sure you want to delete user ${user.email}?`,
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			rejectProps: {
				label: 'Cancel',
				severity: 'secondary',
				outlined: true,
			},
			acceptProps: {
				label: 'Delete',
				severity: 'danger',
			},
			accept: () => onDelete(user),
			reject: () => {
				/* Do nothing on reject */
			},
		});
	}

	async function onDelete(user: any) {
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

	onMounted(() => {
		/* Fetch users when component is mounted */
		userStore.fetchSystemUsers();
	});
</script>
