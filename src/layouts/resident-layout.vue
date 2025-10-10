<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router';
	import { ref, onMounted, watchEffect, onUnmounted } from 'vue';
	import { signOut } from 'firebase/auth';
	import { getCurrentUser, useFirebaseAuth } from 'vuefire';
	import useNotification from '@/composables/useNotification';
	import { messaging } from '@/plugins/firebase';
	import { onMessage } from 'firebase/messaging';
	import { useToast } from 'primevue';

	const route = useRoute();
	const router = useRouter();
	const auth = useFirebaseAuth()!;
	const toast = useToast();
	const { requestPermission, userToken } = useNotification();

	const visible = ref(false);
	const items = ref([
		{
			label: 'Home',
			name: 'resident-home',
			icon: 'pi pi-home',
			route: '/resident',
		},
		{
			label: 'Bills',
			name: 'resident-bills',
			icon: 'pi pi-book',
			route: '/resident/bills',
		},
		{
			label: 'Collection',
			name: 'resident-collection',
			icon: 'pi pi-money-bill',
			route: '/resident/collection',
		},
		{
			label: 'Ledger',
			name: 'resident-ledger',
			icon: 'pi pi-credit-card',
			route: '/resident/ledger',
		},
		{
			label: 'Concern',
			name: 'resident-concern',
			icon: 'pi pi-info-circle',
			route: '/resident/concern',
		},
	]);

	async function logoutUser() {
		try {
			await signOut(auth);
			router.push('/');
			console.log('User logged out successfully');
		} catch (err) {
			console.error('Error logging out:', err);
		}
	}

	const unsubscribe = onMessage(messaging, (payload) => {
		console.log('Message received. ', payload);
		toast.add({
			severity: 'info',
			summary: payload.notification?.title,
			detail: payload.notification?.body,
			life: 3000,
		});
	});

	onMounted(async () => {
		const user = await getCurrentUser();

		requestPermission(user?.uid!);
	});

	onUnmounted(() => unsubscribe());

	watchEffect(() => {
		console.log(userToken.value);
	});
</script>
<template>
	<main class="relative bg-white h-screen">
		<div class="sticky top-0 z-10">
			<Toolbar>
				<template #start>
					<div class="flex items-center gap-2 font-semibold">
						<div class="flex items-center">
							<Avatar
								image="/logo.png"
								class="mr-2"
								size="large"
								shape="circle" />
							<div class="text-lG md:text-xl">CALATRAVA WATER SYSTEM</div>
						</div>
					</div>
				</template>

				<template #end>
					<div
						class="flex gap-5"
						:class="visible ? 'px-5' : ''">
						<RouterLink
							v-for="item in items"
							:key="item.name"
							:to="item.route"
							:class="route.name == item.name ? 'text-primary-500' : ''"
							class="hidden md:block lg:block"
							>{{ item.label }}</RouterLink
						>
						<RouterLink
							to="resident/faq"
							:class="route.name == 'resident-faq' ? 'text-primary-500' : ''"
							class="hidden md:block lg:block"
							>FAQs</RouterLink
						>
						<Button
							@click="logoutUser"
							icon="pi pi-sign-out"
							size="small" />
					</div>
				</template>
			</Toolbar>
		</div>
		<slot />
		<div class="fixed w-screen bottom-0 z-10 block md:hidden lg:hidden">
			<div class="bg-white p-2 shadow-md border">
				<div class="flex justify-between gap-5 items-center">
					<RouterLink
						v-for="item in items"
						:key="item.name"
						:to="item.route"
						class="text-gray-400"
						:class="
							route.name == item.name
								? 'text-white rounded-full bg-primary-500'
								: ''
						"
						><i
							:class="item.icon"
							class="text-xl p-2"></i
					></RouterLink>
				</div>
			</div>
		</div>
	</main>
</template>
