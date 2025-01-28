import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/auth',
		},
		{
			path: '/auth',
			name: 'auth',
			component: () => import('@/pages/auth/index.vue'),
		},
		{
			path: '/resident',
			name: 'resident',
			component: () => import('@/pages/resident/index.vue'),
			children: [
				{
					path: '',
					name: 'resident-home',
					component: () => import('@/pages/resident/home/index.vue'),
				},
				{
					path: 'concern',
					name: 'resident-concern',
					component: () => import('@/pages/resident/concern/index.vue'),
				},
			],
		},
		{
			path: '/admin',
			name: 'admin',
			component: () => import('@/pages/admin/index.vue'),
			children: [
				{
					path: '',
					name: 'admin-dashboard',
					component: () => import('@/pages/admin/dashboard/index.vue'),
				},
				{
					path: 'user',
					name: 'admin-user',
					component: () => import('@/pages/admin/user/index.vue'),
				},
				{
					path: 'transaction',
					name: 'admin-transaction',
					component: () => import('@/pages/admin/transaction/index.vue'),
				},
			],
		},
	],
});

export default router;
