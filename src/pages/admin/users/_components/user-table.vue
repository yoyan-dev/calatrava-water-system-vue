<template>
	<div>
		<Header page-title="User Management" />

		<div class="flex justify-between items-center gap-4 mb-6">
			<SearchInput />
			<Button
				label="Create User"
				icon="pi pi-plus"
				@click="handleDialog(null)" />
		</div>

		<div class="mb-5">
			<h2 class="text-lg font-semibold">System Users</h2>
			<p class="text-sm text-gray-500">Admins and staff accounts</p>
		</div>

		<DataTable
			:value="users"
			dataKey="uid"
			:loading="userStore.isLoading"
			class="p-datatable-sm"
			scrollable
			scrollHeight="65vh"
			:virtualScrollerOptions="{ itemSize: 48 }">
			<!-- your existing columns -->

			<template #empty>
				<div class="p-8 text-center text-gray-500">No users found</div>
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

			<template #loading>
				<div class="p-8 text-center">Loading users...</div>
			</template>
		</DataTable>

		<!-- Load More area -->
		<div
			v-if="userStore.hasMore || userStore.isLoadingMore"
			class="mt-6 text-center">
			<Button
				v-if="userStore.hasMore && !userStore.isLoadingMore"
				label="Load More Users"
				icon="pi pi-arrow-down"
				class="p-button-outlined p-button-secondary"
				@click="userStore.loadMore(15)" />

			<ProgressSpinner
				v-if="userStore.isLoadingMore"
				style="width: 2.5rem; height: 2.5rem" />

			<p
				v-if="!userStore.hasMore && users.length > 0"
				class="mt-3 text-sm text-gray-500">
				All users loaded
			</p>
		</div>
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
	import { ProgressSpinner } from 'primevue';

	const userStore = useUserStore();
	const users = computed(() => userStore.users);
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
		userStore.loadInitialUsers(10);
	});
</script>
