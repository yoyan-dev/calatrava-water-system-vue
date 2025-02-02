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
			name: 'admin-auth',
			component: () => import('@/pages/admin/Auth.vue'),
		},
		{
			path: '/admin',
			name: 'admin',
			component: () => import('@/pages/admin/index.vue'),
			children: [
				{
					path: 'dashboard',
					name: 'admin-dashboard',
					component: () => import('@/pages/admin/dashboard/index.vue'),
				},
				{
					path: 'users',
					name: 'admin-users',
					component: () => import('@/pages/admin/user/index.vue'),
				},
				{
					path: 'user/:uid',
					name: 'admin-user',
					component: () => import('@/pages/admin/user/profile/index.vue'),
				},
				{
					path: 'billings',
					name: 'admin-billings',
					component: () => import('@/pages/admin/billing/index.vue'),
				},
				{
					path: 'billing/create',
					name: 'admin-billing-create',
					component: () => import('@/pages/admin/billing/create/index.vue'),
				},
				{
					path: 'billing/:uid',
					name: 'admin-billing',
					component: () => import('@/pages/admin/billing/detail/index.vue'),
				},
			],
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: () => import('@/pages/error.vue'),
		},
	],
});

export default router;
