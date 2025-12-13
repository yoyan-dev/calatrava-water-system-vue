<script setup lang="ts">
	import { useRoute, useRouter, RouterLink } from 'vue-router';
	import { ref } from 'vue';
	import { signOut } from 'firebase/auth';
	import { useFirebaseAuth } from 'vuefire';
	import { useAdminStore } from '@/stores/admin';
	import type { Admin } from '@/types/admin';
	// import Notification from './components/notification.vue';
	import ThemeToggle from './components/theme-toggle.vue';
	import Button from 'primevue/button';
	import Avatar from 'primevue/avatar';
	import { Drawer } from 'primevue';

	const route = useRoute();
	const router = useRouter();
	const auth = useFirebaseAuth()!;
	const store = useAdminStore();
	const visible = ref(false);

	const items = ref([
		{
			label: 'Dashboard',
			name: 'admin-dashboard',
			icon: 'pi pi-chart-bar',
			route: '/admin/dashboard',
		},
		{
			label: 'Consumers',
			name: 'admin-consumers',
			icon: 'pi pi-users',
			route: '/admin/consumers',
		},
		{
			label: 'Billings',
			name: 'admin-billings',
			icon: 'pi pi-book',
			route: '/admin/billings',
		},
		{
			label: 'Collection',
			name: 'admin-collection',
			icon: 'pi pi-money-bill',
			route: '/admin/collection',
		},
		{
			label: 'Ledger',
			name: 'admin-ledger',
			icon: 'pi pi-credit-card',
			route: '/admin/ledger',
		},
		{
			label: 'Survey Manager',
			name: 'admin-survey',
			icon: 'pi pi-list-check',
			route: '/admin/surveys',
		},
		{
			label: 'Concerns',
			name: 'admin-concerns',
			icon: 'pi pi-inbox',
			route: '/admin/concerns',
		},
		{
			label: 'FAQs',
			name: 'admin-faq',
			icon: 'pi pi-question-circle',
			route: '/admin/faq',
		},
		{
			label: 'User Management',
			name: 'admin-users',
			icon: 'pi pi-user',
			route: '/admin/users',
		},
		{
			label: 'Setting',
			name: 'admin-setting',
			icon: 'pi pi-cog',
			route: '/admin/setting',
		},
	]);

	const admin = ref<Admin>(store.admin);

	const logoutUser = async () => {
		try {
			await signOut(auth);
			router.push('/auth/admin');
			console.log('User logged out successfully');
		} catch (err) {
			console.error('Error logging out:', err);
		}
	};
</script>

<template>
	<main class="flex h-screen w-full bg-surface-0 dark:bg-surface-950">
		<!-- App Header -->
		<nav
			class="fixed top-0 left-0 right-0 z-30 bg-surface-0 dark:bg-surface-950 border-b border-surface-200 dark:border-surface-700">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-14 items-center justify-between">
					<div class="flex items-center gap-4">
						<Button
							class="hidden lg:hidden!"
							icon="pi pi-bars"
							severity="secondary"
							text
							@click="visible = true" />
						<div class="flex items-center gap-2">
							<img
								class="h-7 w-auto"
								src="/logo.png"
								alt="Calatrava Water System Logo" />
							<span
								class="text-lg font-semibold text-surface-900 dark:text-surface-50">
								<span class="hidden md:block">CWS</span>
								<span class="md:hidden">CWS</span>
							</span>
						</div>
					</div>
					<div class="flex items-center gap-1">
						<ThemeToggle />
						<!-- <Notification /> -->
						<RouterLink
							to="/admin/setting"
							class="flex items-center justify-center w-9 h-9">
							<Avatar
								:image="admin.photoURL || '/default.jpg'"
								size="small"
								shape="circle"
								class="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-110" />
						</RouterLink>
					</div>
				</div>
			</div>
		</nav>

		<!-- Main Content and Static Sidenav -->
		<div class="flex w-full h-full pt-14 lg:pt-16 lg:pb-2 lg:pr-2">
			<!-- Static Sidenav (Left Side) -->
			<aside class="w-72 h-full dark:bg-surface-950 px-4 hidden md:block">
				<div
					class="h-full flex flex-col bg-primary-800 dark:bg-slate-800 rounded-xl p-4">
					<!-- Header -->
					<div
						class="flex items-center gap-3 mb-4 border-b border-primary-300/50 dark:border-primary-900/50 pb-3">
						<Avatar
							:image="admin.photoURL || '/default.jpg'"
							size="large"
							shape="circle"
							class="border-2 border-primary-200 dark:border-primary-900" />
						<div class="flex flex-col">
							<span class="text-base text-surface-50 font-semibold">{{
								admin.displayName
							}}</span>
							<span class="text-sm text-primary-100 dark:text-primary-300"
								>Admin</span
							>
						</div>
					</div>

					<!-- Menu -->
					<ul class="grow space-y-2">
						<li
							v-for="item in items"
							:key="item.name">
							<RouterLink
								:to="item.route"
								class="flex items-center px-3 py-1 text-sm font-medium text-surface-50 hover:bg-primary-700/50 dark:hover:bg-primary-900/50 rounded-md transition-colors"
								:class="{
									'bg-primary-700 dark:bg-primary-900 text-primary-50':
										route.name === item.name,
								}">
								<i
									:class="item.icon"
									class="mr-3 text-base"></i>
								<span>{{ item.label }}</span>
							</RouterLink>
						</li>
					</ul>

					<!-- Footer -->
					<Button
						size="small"
						@click="logoutUser"
						icon="pi pi-sign-out"
						label="Sign Out"
						severity="danger"
						outlined
						class="w-full mt-4" />
				</div>
			</aside>

			<!-- Mobile Sidenav (Collapsible) -->
			<Drawer
				v-model:visible="visible"
				class="lg:hidden bg-primary-800 dark:bg-slate-800 p-6 text-primary-100 dark:text-primary-300">
				<template #container="{ closeCallback }">
					<div class="flex flex-col h-full">
						<div
							class="flex items-center justify-between gap-3 mb-4 border-b border-primary-300/50 dark:border-slate-700/50 pb-3">
							<Avatar
								:image="admin.photoURL || '/default.jpg'"
								size="large"
								shape="circle"
								class="border-2 border-primary-200 dark:border-slate-600" />
							<div class="flex flex-col">
								<span class="text-base font-semibold">{{
									admin.displayName
								}}</span>
								<span class="text-sm text-primary dark:text-slate-300"
									>Admin</span
								>
							</div>
							<Button
								icon="pi pi-times"
								severity="secondary"
								text
								class="ml-auto"
								@click="closeCallback()" />
						</div>
						<div class="overflow-y-auto">
							<ul class="grow space-y-2">
								<li
									v-for="item in items"
									:key="item.name">
									<RouterLink
										:to="item.route"
										@click="visible = false"
										class="flex items-center px-3 py-2.5 text-sm font-medium hover:bg-primary-700/50 dark:hover:bg-slate-7 00/50 rounded-md transition-colors"
										:class="{
											'bg-primary-700 dark:bg-slate-700 text-primary-50 dark:text-surface-50':
												route.name === item.name,
										}">
										<i
											:class="item.icon"
											class="mr-3 text-base"></i>
										<span>{{ item.label }}</span>
									</RouterLink>
								</li>
							</ul>
						</div>

						<div class="mt-auto">
							<hr
								class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
							<Button
								size="small"
								@click="logoutUser"
								icon="pi pi-sign-out"
								label="Sign Out"
								severity="danger"
								outlined
								class="w-full mt-4 text-surface-50 dark:text-surface-200 hover:bg-primary-700/50 dark:hover:bg-slate-700/50" />
						</div>
					</div>
				</template>
			</Drawer>

			<!-- Content Area -->
			<div
				class="flex-1 overflow-y-auto bg-linear-to-br from-surface-50 to-surface-0 dark:from-surface-900 dark:to-surface-900 lg:rounded-2xl shadow-2xl">
				<router-view v-slot="{ Component }">
					<keep-alive>
						<component :is="Component" />
					</keep-alive>
				</router-view>
			</div>
		</div>
	</main>
</template>
