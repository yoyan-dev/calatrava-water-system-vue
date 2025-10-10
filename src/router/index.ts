import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { navigationGuard } from './route-guards';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

navigationGuard(router);

export default router;
