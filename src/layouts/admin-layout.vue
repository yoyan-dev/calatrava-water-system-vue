<script setup lang="ts">
	import { useRoute } from 'vue-router';

	const route = useRoute();
</script>

<template>
	<main class="flex h-screen w-full">
		<aside class="w-64 h-full transition-transform border-r shadow-lg">
			<div
				class="h-full p-4 overflow-y-auto flex flex-col bg-gray-200 dark:bg-gray-800 shadow-lg">
				<a class="flex items-center ps-2.5 mb-5">
					<span
						class="self-center flex items-center text-xl font-semibold whitespace-nowrap dark:text-white"
						><Avatar image="/logo.jpeg" class="mr-2" size="large" shape="circle" />C<span class="text-primary text-lg">W</span>S</span
					>
				</a>
				<ul class="space-y-2 font-medium grow">
					<li>
						<a
							href="/admin"
							:class="route.name == 'admin' ? 'bg-primary-500 text-white' : ''"
							class="flex items-center p-2 rounded-lg cursor-pointer hover:bg-primary-400 hover:text-white">
							<span>Dashboard</span>
						</a>
					</li>
					<li>
						<a
							href="/admin/user"
							:class="route.name == 'admin-user' ? 'bg-primary-500 text-white' : ''"
							class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-primary-400 dark:text-white cursor-pointer">
							<span class="flex-1 whitespace-nowrap">Users</span>
						</a>
					</li>
					<li>
						<a
							href="/admin/transaction"
							:class="route.name == 'admin-transaction' ? 'bg-primary-500 text-white' : ''"
							class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white dark:text-white hover:bg-primary-400 cursor-pointer">
							<span class="flex-1 whitespace-nowrap">Transactions</span>
						</a>
					</li>
				</ul>
				<Button label="Sign Out" />
			</div>
		</aside>
		<div class="w-full bg-surface-0 dark:bg-surface-950 overflow-auto">
			<slot />
		</div>
	</main>
</template>
