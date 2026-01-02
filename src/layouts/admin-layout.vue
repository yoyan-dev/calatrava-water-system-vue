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

	const menuGroups = [
		{
			label: 'Overview',
			icon: 'pi pi-home',
			items: [
				{
					label: 'Dashboard',
					name: 'admin-dashboard',
					icon: 'pi pi-chart-bar',
					route: '/admin/dashboard',
				},
			],
		},
		{
			label: 'Customer Management',
			icon: 'pi pi-users',
			items: [
				{
					label: 'Consumers',
					name: 'admin-consumers',
					icon: 'pi pi-users',
					route: '/admin/consumers',
				},
				{
					label: 'Concerns',
					name: 'admin-concerns',
					icon: 'pi pi-inbox',
					route: '/admin/concerns',
				},
				{
					label: 'Area Locations',
					name: 'admin-areas',
					icon: 'pi pi-map-marker',
					route: '/admin/areas',
				},
			],
		},
		{
			label: 'Billing & Payments',
			icon: 'pi pi-money-bill',
			items: [
				{
					label: 'Billings',
					name: 'admin-billings',
					icon: 'pi pi-book',
					route: '/admin/billings',
				},
				{
					label: 'Collection',
					name: 'admin-collection',
					icon: 'pi pi-wallet',
					route: '/admin/collection',
				},
				{
					label: 'Ledger',
					name: 'admin-ledger',
					icon: 'pi pi-credit-card',
					route: '/admin/ledger',
				},
			],
		},
		{
			label: 'Operations',
			icon: 'pi pi-cogs',
			items: [
				{
					label: 'Survey Manager',
					name: 'admin-survey',
					icon: 'pi pi-list-check',
					route: '/admin/surveys',
				},
			],
		},
		{
			label: 'Communication',
			icon: 'pi pi-megaphone',
			items: [
				{
					label: 'Announcements',
					name: 'admin-announcement',
					icon: 'pi pi-megaphone',
					route: '/admin/announcement',
				},
				{
					label: 'FAQs',
					name: 'admin-faq',
					icon: 'pi pi-question-circle',
					route: '/admin/faq',
				},
			],
		},
		{
			label: 'Administration',
			icon: 'pi pi-shield',
			items: [
				{
					label: 'User Management',
					name: 'admin-users',
					icon: 'pi pi-user',
					route: '/admin/users',
				},
				{
					label: 'Settings',
					name: 'admin-setting',
					icon: 'pi pi-cog',
					route: '/admin/setting',
				},
			],
		},
	];

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
			<!-- Desktop Static Sidenav -->
			<aside class="w-72 h-full dark:bg-surface-950 px-4 hidden md:block">
				<div
					class="h-full flex flex-col bg-primary-800 dark:bg-slate-800 rounded-xl p-4 overflow-y-auto">
					<!-- Header -->
					<div
						class="flex items-center gap-3 mb-4 pb-2 border-b border-primary-700/30">
						<Avatar
							:image="admin.photoURL || '/default.jpg'"
							size="small"
							shape="circle"
							class="border-2 border-primary-300" />
						<div>
							<div class="text-surface-50 font-semibold text-sm">
								{{ admin.displayName }}
							</div>
							<div class="text-xs text-primary-200">Administrator</div>
						</div>
					</div>

					<!-- Dense Menu with Category Headers -->
					<nav class="flex-1 space-y-4">
						<div
							v-for="group in menuGroups"
							:key="group.label">
							<!-- Category Header -->
							<div
								class="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-primary-200 uppercase tracking-wider opacity-80">
								<span>{{ group.label }}</span>
							</div>

							<!-- Menu Items (Dense) -->
							<ul class="space-y-0.5">
								<li
									v-for="item in group.items"
									:key="item.name">
									<RouterLink
										:to="item.route"
										class="flex items-center gap-3 px-3 py-1.5 text-sm rounded-md transition-all text-surface-300 hover:bg-primary-700/70 hover:text-surface-50 group"
										:class="{
											'bg-primary-700 text-surface-50 font-medium shadow-sm':
												route.name === item.name,
										}">
										<i
											:class="item.icon"
											class="text-base w-5"></i>
										<span>{{ item.label }}</span>
									</RouterLink>
								</li>
							</ul>
						</div>
					</nav>

					<!-- Logout -->
					<Button
						@click="logoutUser"
						icon="pi pi-sign-out"
						label="Sign Out"
						severity="danger"
						outlined
						class="w-full mt-6 text-sm" />
				</div>
			</aside>

			<!-- Mobile Drawer (Same grouped structure) -->
			<Drawer
				v-model:visible="visible"
				position="left"
				class="lg:hidden">
				<template #container="{ closeCallback }">
					<div class="flex flex-col h-full bg-primary-800 dark:bg-slate-800">
						<!-- Mobile Header -->
						<div class="p-5 border-b border-primary-700/30">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-3">
									<Avatar
										:image="admin.photoURL || '/default.jpg'"
										size="large"
										shape="circle" />
									<div>
										<div class="font-semibold text-surface-50">
											{{ admin.displayName }}
										</div>
										<div class="text-sm text-primary-200">Admin</div>
									</div>
								</div>
								<Button
									icon="pi pi-times"
									text
									rounded
									@click="closeCallback()" />
							</div>
						</div>

						<!-- Dense Mobile Menu -->
						<nav class="flex-1 overflow-y-auto p-4 space-y-5">
							<div
								v-for="group in menuGroups"
								:key="group.label">
								<div
									class="flex items-center gap-2 text-xs font-semibold text-primary-300 uppercase tracking-wider mb-2">
									<i
										:class="group.icon"
										class="text-xs"></i>
									{{ group.label }}
								</div>
								<ul class="space-y-1">
									<li
										v-for="item in group.items"
										:key="item.name">
										<RouterLink
											:to="item.route"
											@click="visible = false"
											class="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-primary-700/70"
											:class="{
												'bg-primary-700 text-surface-50 font-medium':
													route.name === item.name,
											}">
											<i
												:class="item.icon"
												class="text-base"></i>
											<span>{{ item.label }}</span>
										</RouterLink>
									</li>
								</ul>
							</div>
						</nav>

						<!-- Mobile Logout -->
						<div class="p-4 border-t border-primary-700/30">
							<Button
								@click="
									logoutUser();
									visible = false;
								"
								icon="pi pi-sign-out"
								label="Sign Out"
								severity="danger"
								outlined
								class="w-full text-sm" />
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
