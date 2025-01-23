<script setup lang="ts">
	import { useRoute, RouterLink } from 'vue-router';

	const route = useRoute();
</script>

<template>
	<main class="flex h-screen w-full">
		<aside
			class="w-64 h-full transition-transform border-r shadow-lg hidden lg:block">
			<div
				class="h-full p-4 overflow-y-auto flex flex-col bg-gray-50 dark:bg-gray-800">
				<a class="flex items-center ps-2.5 mb-5">
					<span
						class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
						>CWSs</span
					>
				</a>
				<ul class="space-y-2 font-medium grow">
					<li>
						<RouterLink to="/admin">
							<a
								:class="route.name == 'admin' ? 'bg-primary-500' : ''"
								class="flex items-center p-2 rounded-lg text-black hover:text-white cursor-pointer hover:bg-primary-400">
								<span>Dashboard</span>
							</a>
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/admin/user">
							<a
								:class="route.name == 'admin-user' ? 'bg-primary-500' : ''"
								class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-primary-400 dark:text-white cursor-pointer">
								<span class="flex-1 whitespace-nowrap">Users</span>
							</a>
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/admin/transaction">
							<a
								:class="
									route.name == 'admin-transaction' ? 'bg-primary-500' : ''
								"
								class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white dark:text-white hover:bg-primary-400 cursor-pointer">
								<span class="flex-1 whitespace-nowrap">Transactions</span>
							</a>
						</RouterLink>
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
