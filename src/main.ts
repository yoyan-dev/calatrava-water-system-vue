import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/firebase/config';
import '@/assets/main.css';
import '@/assets/base.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

// import ConfirmationService from 'primevue/confirmationservice';
// import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()],
});
app.use(PrimeVue, {
	theme: 'none',
});

app.use(createPinia());
app.use(router);
// app.use(ConfirmationService);
app.use(ToastService);
// app.use(DialogService);

app.mount('#app');
