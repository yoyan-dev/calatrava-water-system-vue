import type { App } from 'vue';
import boot from './boot';
import pinia from './pinia';
import primevue from './primevue';
import veeValidate from './vee-validate';

export function registerPlugins(app: App) {
	// Register global plugins here if needed in the future
	app.use(boot);
	app.use(pinia);
	app.use(primevue);
	app.use(veeValidate);
}
