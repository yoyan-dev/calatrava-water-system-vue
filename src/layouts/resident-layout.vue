<script setup lang="ts">
	import { useRoute, RouterLink } from 'vue-router';
	import { ref } from "vue";

	const route = useRoute();
	const visible = ref(false);
	const items = ref([
		{
			label: 'Bill',
			icon: 'pi pi-money-bill',
			route: '/resident'
		},
		{
			label: 'Concern',
			icon: 'pi pi-question-circle',
			route: '/resident/concern'
		}
	]);
</script>
<template>
	<main class="relative bg-gray-100">
		<div class="sticky top-0 z-10">
			<Toolbar>
				<template #start>
					<div class="flex items-center gap-2 font-semibold">
						<Avatar image="/logo.jpeg" class="mr-2" size="large" shape="circle" />
						<RouterLink to="/resident"  :class="route.name == 'resident-home' ? 'text-primary-500' : ''" class="invisible md:visible  lg:visible">Bill</RouterLink>
						<RouterLink to="/resident/concern"  :class="route.name == 'resident-concern' ? 'text-primary-500' : ''" class="invisible md:visible  lg:visible">Concern</RouterLink>

					</div>
				</template>
				
				<template #end>
					<Drawer v-model:visible="visible" header="CWS">
						<Menu :model="items">
							<template #item="{ item, props }">
								<RouterLink v-slot="{ href, navigate }" :to="item.route" custom >
									<a v-ripple :href="href" v-bind="props.action" @click="navigate">
										<span :class="item.icon" />
										<span class="ml-2">{{ item.label }}</span>
									</a>
								</RouterLink>
							</template>
						</Menu>
					</Drawer>
					<Button icon="pi pi-align-center" @click="visible = true" class="visible md:invisible lg:invisible xl:invisible"/>
				</template>
			</Toolbar>
		</div>
		<slot />
	</main>
</template>
