import type { Router } from 'vue-router';
import { getCurrentUser } from 'vuefire';

export function navigationGuard(router: Router) {
	// Navigation guard logic here
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
				return isAdmin
					? { name: 'admin-dashboard' }
					: { name: 'resident-home' };
			}

			// Handle unauthenticated users trying to access protected routes
			if (!isAuthenticated && to.meta.requiresAuth) {
				return to.meta.requiresAdmin
					? { name: 'admin-auth' }
					: { name: 'auth' };
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
}
