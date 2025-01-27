<script setup lang="ts">
	import { useRoute, RouterLink } from 'vue-router';

	const route = useRoute();
</script>

<template>
	<main class="flex h-screen w-full">
		<aside
			class="w-64 h-full transition-transform border-r shadow-lg hidden lg:block">
			<div
				class="h-full p-4 overflow-y-auto flex flex-col bg-gray-200 dark:bg-gray-800 shadow-lg">
				<a class="flex items-center ps-2.5 mb-5">
					<span
						class="self-center flex items-center text-2xl font-semibold whitespace-nowrap dark:text-white"
						><Avatar image="/logo.jpeg" class="mr-2" size="large" shape="circle" />C<span class="text-primary text-lg">W</span>S</span>
				</a>
				<ul class="space-y-2 font-medium grow">
					<li>
						<RouterLink to="/admin">
							<a
								:class="route.name == 'admin' ? 'bg-primary-500 text-white' : ''"
								class="flex items-center p-2 rounded-lg text-black hover:text-white cursor-pointer hover:bg-primary-400">
								<span>Dashboard</span>
							</a>
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/admin/user">
							<a
								:class="route.name == 'admin-user' ? 'bg-primary-500 text-white' : ''"
								class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-primary-400 dark:text-white cursor-pointer">
								<span class="flex-1 whitespace-nowrap">Users</span>
							</a>
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/admin/transaction">
							<a
								:class="
									route.name == 'admin-transaction' ? 'bg-primary-500 text-white' : ''
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
		<div class="w-full flex flex-col gap-5 bg-surface-50 dark:bg-surface-950 p-5 overflow-auto">
			<Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
				<template #start>
					<div class="flex gap-2 items-center">
						<Avatar image="/logo.jpeg" class="w-8 h-8"/>
						<div class="font-semibold text-xl">
							CALATRAVA <span class="text-primary">WATER</span> SYSTEM
						</div>
					</div>
				</template>

				<template #end>
					<div class="flex items-center gap-2">
						<Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
					</div>
				</template>
			</Toolbar>

			<ScrollPanel class="h-screen">
				<slot />
			</ScrollPanel>
		</div>
	</main>
</template>
