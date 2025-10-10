import { createApp } from 'vue';
import './assets/css/main.css';

import App from './App.vue';

import router from './router';
import { registerPlugins } from './plugins';

const app = createApp(App);

// Core Essentials
app.use(router);

// Inject plugins
registerPlugins(app);

app.mount('#app');
