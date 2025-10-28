<script setup lang="ts">
	import { onMounted, toRefs } from 'vue';
	import { useToast } from 'primevue/usetoast';
	import { useUserStore } from '@/stores/user';
	import UserModalForm from './modals/user-modal-form.vue';
	import { useConfirm } from 'primevue/useconfirm';
	import { useDialog } from 'primevue/usedialog';

	const toast = useToast();
	const userStore = useUserStore();
	const confirmUserDelete = useConfirm();
	const dialog = useDialog();

	const handleDialog = (user: any) => {
		dialog.open(UserModalForm, {
			props: {
				header: `${user ? 'Edit' : 'Create'} User`,
				style: { width: '30vw' },
				dismissableMask: true,
			},
			data: { mode: user ? 'edit' : 'create', user },
		});
	};

	const handleDelete = (user: any) => {
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
	};

	const { users, isLoading } = toRefs(userStore);

	const fetchUsers = () => {
		userStore.fetchUsers();
	};

	const onDelete = async (user: any) => {
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
	};

	onMounted(() => {
		fetchUsers();
	});
</script>

<template>
	<div>
		<div class="flex justify-end items-center gap-4 mb-4">
			<Button
				label="Create User"
				icon="pi pi-plus"
				class="mt-4"
				@click="handleDialog(null)" />
		</div>

		<!-- User Table -->
		<DataTable
			:value="users"
			data-key="uid"
			:rows="10"
			:loading="isLoading">
			<template #empty>
				<div class="flex items-center justify-center p-4">No users found.</div>
			</template>

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
						{{ data.customClaims?.role }}
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

		<!-- Dynamic Dialog Service -->
		<!-- <DynamicDialog /> -->
	</div>
</template>
