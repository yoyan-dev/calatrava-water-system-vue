const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/pages/public/index.vue'),
		meta: { requiresGuest: true },
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
				path: 'consumers',
				name: 'admin-consumers',
				component: () => import('@/pages/admin/consumers/index.vue'),
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
				path: 'areas',
				name: 'admin-areas',
				component: () => import('@/pages/admin/area/index.vue'),
			},
			{
				path: 'announcement',
				name: 'admin-announcement',
				component: () => import('@/pages/admin/announcement/index.vue'),
			},
			{
				path: 'ledger',
				name: 'admin-ledger',
				component: () => import('@/pages/admin/ledger/index.vue'),
			},
			{
				path: 'surveys',
				name: 'admin-surveys',
				component: () => import('@/pages/admin/survey/index.vue'),
			},
			{
				path: 'surveys/:id',
				name: 'admin-view-survey',
				component: () => import('@/pages/admin/survey/view-survey.vue'),
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
];

export { routes };
