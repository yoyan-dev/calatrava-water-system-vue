<script setup lang="ts">
	import { useRoute, RouterLink } from 'vue-router';

	const route = useRoute();
</script>

<template>
    <div>
        <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem" class="bg-gray-100">
            <template #start>
                <div class="flex items-center gap-2">
                    <Avatar image="/logo.jpeg" class="mr-2" size="large" shape="circle" />
                    <RouterLink to="/admin">
                        <a
                            :class="route.name == 'resident' ? 'text-primary' : ''"
                            class="flex items-center p-2 rounded-lg text-black hover:text-primary cursor-pointer ">
                            <span>Invoice</span>
                        </a>
                    </RouterLink>
                    <Button label="Payment" text plain />
                    <Button label="Concern" text plain />
                </div>
            </template>

            <template #end>
                <div class="flex items-center gap-2">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
                </div>
            </template>
        </Toolbar>
    </div>
</template>