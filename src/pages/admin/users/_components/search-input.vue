<template>
	<div>
		<IconField>
			<InputIcon>
				<i class="pi pi-search" />
			</InputIcon>
			<InputText
				placeholder="Search any type of users"
				@click="handleDialog"
				readonly />
		</IconField>
	</div>
</template>
<script setup lang="ts">
	import { useDialog } from 'primevue';
	import SearchModal from './modals/search-modal.vue';
	const dialog = useDialog();

	function handleDialog(user: any) {
		dialog.open(SearchModal, {
			props: {
				header: `Search User`,
				style: { width: '50vw', minHeight: '400px' },
				dismissableMask: true,
			},
		});
	}
</script>
