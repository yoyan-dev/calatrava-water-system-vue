import { createPinia } from 'pinia';

export default {
	install(app: any) {
		const pinia = createPinia();
		app.use(pinia);
	},
};
