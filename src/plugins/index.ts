import type { App } from 'vue';
import pinia from './pinia';
import primevue from './primevue';
import boot from './boot';

export function registerPlugins(app: App) {
	// Register global plugins here if needed in the future
	app.use(boot);
	app.use(pinia);
	app.use(primevue);
}
