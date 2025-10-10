import { auth } from '@/firebase/config';
import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', redirect: '/auth' },
		{
			path: '/auth',
			name: 'auth',
			component: () => import('@/pages/auth/index.vue'),
			meta: { requiresGuest: true },
		},
		{
			path: '/resident',
			name: 'resident',
			component: () => import('@/pages/resident/index.vue'),
			meta: { requiresAuth: true },
			children: [
				{
					path: '',
					name: 'resident-home',
					component: () => import('@/pages/resident/home/index.vue'),
				},
				{
					path: 'bills',
					name: 'resident-bills',
					component: () => import('@/pages/resident/billing/index.vue'),
				},
				{
					path: 'collection',
					name: 'resident-collection',
					component: () => import('@/pages/resident/collection/index.vue'),
				},
				{
					path: 'ledger',
					name: 'resident-ledger',
					component: () => import('@/pages/resident/ledger/index.vue'),
				},
				{
					path: 'concern',
					name: 'resident-concern',
					component: () => import('@/pages/resident/concern/index.vue'),
				},
				{
					path: 'faq',
					name: 'resident-faq',
					component: () => import('@/pages/resident/faq/index.vue'),
				},
			],
		},
		{
			path: '/auth/admin',
			name: 'admin-auth',
			component: () => import('@/pages/admin/Auth.vue'),
			meta: { requiresGuest: true },
		},
		{
			path: '/admin',
			name: 'admin',
			component: () => import('@/pages/admin/index.vue'),
			meta: { requiresAuth: true, requiresAdmin: true },
			children: [
				{
					path: 'dashboard',
					name: 'admin-dashboard',
					component: () => import('@/pages/admin/dashboard/index.vue'),
				},
				{
					path: 'residents',
					name: 'admin-residents',
					component: () => import('@/pages/admin/residents/index.vue'),
				},
				{
					path: 'users',
					name: 'admin-users',
					component: () => import('@/pages/admin/users/index.vue'),
				},
				{
					path: 'billings',
					name: 'admin-billings',
					component: () => import('@/pages/admin/billing/index.vue'),
				},
				{
					path: 'readers',
					name: 'admin-readers',
					component: () => import('@/pages/admin/reader/index.vue'),
				},
				{
					path: 'concerns',
					name: 'admin-concerns',
					component: () => import('@/pages/admin/concern/index.vue'),
				},
				{
					path: 'ledger',
					name: 'admin-ledger',
					component: () => import('@/pages/admin/ledger/index.vue'),
				},
				{
					path: 'collection',
					name: 'admin-collection',
					component: () => import('@/pages/admin/collection/index.vue'),
				},
				{
					path: 'setting',
					name: 'admin-setting',
					component: () => import('@/pages/admin/setting/index.vue'),
				},
				{
					path: 'faq',
					name: 'admin-faq',
					component: () => import('@/pages/admin/faq/index.vue'),
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

// const ADMIN_USER_ID = 'GHh3aoG1qadCtG6Ey2cWQMTZy173';

router.beforeEach(async (to, from) => {
	try {
		const user = await getCurrentUser();
		const isAuthenticated = !!user;
		let isAdmin = false;

		if (user) {
			const idTokenResult = await user.getIdTokenResult();
			isAdmin = idTokenResult.claims?.role === 'admin';
		}

		// Handle authenticated users trying to access guest-only routes
		if (isAuthenticated && to.meta.requiresGuest) {
			return isAdmin ? { name: 'admin-dashboard' } : { name: 'resident-home' };
		}

		// Handle unauthenticated users trying to access protected routes
		if (!isAuthenticated && to.meta.requiresAuth) {
			return to.meta.requiresAdmin ? { name: 'admin-auth' } : { name: 'auth' };
		}

		// Handle non-admin users trying to access admin routes
		if (to.meta.requiresAdmin && isAuthenticated && !isAdmin) {
			return { name: 'resident-home' };
		}

		// Allow navigation if all checks pass
		return;
	} catch (error) {
		console.error('Navigation guard error:', error);
		// Optionally redirect to an error page or home
		return { name: 'auth' };
	}
});

export default router;
