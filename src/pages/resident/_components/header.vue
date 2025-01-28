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
            route: '/concern'
        }
    ]);
</script>

<template>
    <div>
        <Toolbar>
            <template #start>
                <div class="flex items-center gap-2">
                    <Avatar image="/logo.jpeg" class="mr-2" size="large" shape="circle" />
                    <div class="card flex justify-center">
                    </div>
                </div>
            </template>
            
            <template #end>
                <Drawer v-model:visible="visible" header="CWS">
                    <Menu :model="items">
                        <template #item="{ item, props }">
                            <router-link v-slot="{ href, navigate }" :to="item.route" custom >
                                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                    <span :class="item.icon" />
                                    <span class="ml-2">{{ item.label }}</span>
                                </a>
                            </router-link>
                        </template>
                    </Menu>
                </Drawer>

                <Button icon="pi pi-align-center" @click="visible = true" text/>

            </template>
        </Toolbar>
    </div>
</template>