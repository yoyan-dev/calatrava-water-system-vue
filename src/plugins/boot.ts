import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebase';

export default {
	install(app: any) {
		app.use(VueFire, {
			firebaseApp,
			modules: [VueFireAuth()],
		});
	},
};
