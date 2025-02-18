<script setup lang="ts">
	import { useRoute, RouterLink } from 'vue-router';
	import { ref, onMounted, computed } from 'vue';
	import { useCurrentUser } from 'vuefire';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const user = useCurrentUser() as any;

	onMounted(async () => {
		if (!user) {
			console.log('No user is signed in.');
			router.push('/');
		}
	});

	const route = useRoute();
	const visible = ref(false);
	const items = ref([
		{
			label: 'Home',
			name: 'resident-home',
			icon: 'pi pi-money-bill',
			route: '/resident',
		},
		{
			label: 'Bills',
			name: 'resident-bills',
			icon: 'pi pi-book',
			route: `/resident/bills/${user.value.uid}`,
		},
		{
			label: 'Concern',
			name: 'resident-concen',
			icon: 'pi pi-question-circle',
			route: '/resident/concern',
		},
	]);
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
							<h1 class="block md:hidden lg:hidden xl:hidden text-xl">
								C<span class="text-primary">W</span>S
							</h1>
							<h1 class="hidden md:block lg:block xl:block text-xl">
								Calatrava <span class="text-primary">Water</span> System
							</h1>
						</div>
					</div>
				</template>

				<template #end>
					<Drawer
						v-model:visible="visible"
						header="CWS">
						<Menu :model="items">
							<template #item="{ item, props }">
								<RouterLink
									v-slot="{ href, navigate }"
									:to="item.route"
									custom
									:class="route.name == item.name ? 'text-primary-500' : ''">
									<a
										v-ripple
										:href="href"
										v-bind="props.action"
										@click="navigate">
										<span :class="item.icon" />
										<span class="ml-2">{{ item.label }}</span>
									</a>
								</RouterLink>
							</template>
						</Menu>
					</Drawer>
					<Button
						icon="pi pi-align-center"
						@click="visible = true"
						class="visible md:invisible lg:invisible xl:invisible" />
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
					</div>
				</template>
			</Toolbar>
		</div>
		<slot />
	</main>
</template>
