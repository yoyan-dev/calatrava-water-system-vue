<script setup lang="ts">
	import UserTable from './_components/user-table.vue';
</script>

<template>
	<div class="p-4 md:p-6">
		<!-- Header -->
		<div class="flex justify-between items-center gap-4 mb-4">
			<div class="text-xl">Manage Users</div>
			<div>
				<span class="mr-2">Records:</span>
				<span class="text-primary font-semibold">999</span>
			</div>
		</div>

		<!-- User Table Component -->
		<UserTable />
	</div>
</template>
