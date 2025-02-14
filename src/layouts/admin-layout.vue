<script setup lang="ts">
	import { useRoute, RouterLink } from 'vue-router';
	import NavBar from '@/components/navBar/index.vue'

	const route = useRoute();
</script>

<template>
	<main class="flex h-screen w-full text-surface-600">
		
		<aside
			class="w-64 h-full transition-transform border-r  hidden lg:block">
			<div
				class="h-full p-4 overflow-y-auto flex flex-col bg-white dark:bg-gray-800">
				<a class="flex items-center justify-center ps-2.5 mb-3">
					<span
						class="self-center flex items-center text-2xl font-semibold whitespace-nowrap dark:text-white"
						><Avatar
							image="/logo.jpeg"
							class="mr-2"
							size="xlarge"
							shape="circle" />
					</span>
				</a><hr>
				<ul class="space-y-2 font-medium grow">
					<li>
						<RouterLink to="/admin/dashboard" 
						:class="
							route.name == 'admin-dashboard'
								? 'bg-primary-100 text-primary'
								: ''
						"
						class="flex items-center px-2 rounded-lg font-normal hover:text-white cursor-pointer hover:bg-primary-400">
							<i class="pi pi-chart-bar"></i>
							<a
								class="flex items-center p-2 rounded-lg hover:text-white cursor-pointer hover:bg-primary-400">
								<span>Dashboard</span>
							</a>
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/admin/users" 
						:class="
							route.name == 'admin-users' || route.name == 'admin-user'
								? 'bg-primary-100 text-primary'
								: ''
						"
						class="flex items-center px-2 rounded-lg font-normal hover:text-white cursor-pointer hover:bg-primary-400">
							<i class="pi pi-user"></i>
							<a
								class="flex items-center p-2 rounded-lg hover:text-white cursor-pointer hover:bg-primary-400">
								<span>Users</span>
							</a>
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/admin/readers" 
						:class="
							route.name == 'admin-readers' || route.name == 'admin-reader'
								? 'bg-primary-100 text-primary'
								: ''
						"
						class="flex items-center px-2 rounded-lg font-normal hover:text-white cursor-pointer hover:bg-primary-400">
							<i class="pi pi-users"></i>
							<a
								class="flex items-center p-2 rounded-lg hover:text-white cursor-pointer hover:bg-primary-400">
								<span>Readers</span>
							</a>
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/admin/billings" 
							:class="
								route.name == 'admin-billings' ||
								route.name == 'admin-billing' ||
								route.name == 'admin-billing-create' ||
								route.name == 'admin-billing-update'
									? 'bg-primary-100 text-primary'
									: ''
							"
						class="flex items-center px-2 rounded-lg font-normal hover:text-white cursor-pointer hover:bg-primary-400">
							<i class="pi pi-book"></i>
							<a
								class="flex items-center p-2 rounded-lg hover:text-white cursor-pointer hover:bg-primary-400">
								<span>Billings</span>
							</a>
						</RouterLink>
					</li>
				</ul>
				<Button icon="pi pi-sign-out" label="Sign Out" />
			</div>
		</aside>
		<div
			class="w-full flex flex-col gap-5 bg-gray-50 overflow-auto">
			<NavBar/>
			<div class="px-3">
				<slot />
			</div>
		</div>
	</main>
</template>
