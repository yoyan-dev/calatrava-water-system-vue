import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import {
	useFirebaseAuth,
	VueFire,
	VueFireAuth,
	VueFireAuthWithDependencies,
} from 'vuefire';
import { firebaseApp } from '@/firebase/config';
import '@/assets/main.css';
import '@/assets/base.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {
	Toolbar,
	Splitter,
	SplitterPanel,
	ConfirmationService,
	DialogService,
	ToastService,
	DataTable,
	Column,
	ColumnGroup,
	Row,
	InputText,
	IconField,
	InputIcon,
	Textarea,
	RadioButton,
	Select,
	Avatar,
	AvatarGroup,
	ScrollPanel,
	SelectButton,
	Drawer,
	Menu,
	Carousel,
	InputNumber,
	DatePicker,
	Paginator,
	TieredMenu,
	FloatLabel,
	Message,
	FileUpload,
	Popover,
	Tag,
	Dialog,
	Button,
	Password,
} from 'primevue';
import {
	browserLocalPersistence,
	getAuth,
	indexedDBLocalPersistence,
	setPersistence,
} from 'firebase/auth';
import { registerSW } from 'virtual:pwa-register';

const app = createApp(App);
const auth = getAuth(firebaseApp);

registerSW({ immediate: true });

setPersistence(auth, indexedDBLocalPersistence)
	.catch(() => setPersistence(auth, browserLocalPersistence))
	.then(() => console.log('Persistence set successfully'))
	.catch((error) => console.error('Error setting persistence:', error));

app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()],
});
app.use(PrimeVue, {
	theme: 'none',
});

// component here:
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('Toolbar', Toolbar);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputText', InputText);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('Textarea', Textarea);
app.component('RadioButton', RadioButton);
app.component('Select', Select);
app.component('Avatar', Avatar);
app.component('AvatarGroup', AvatarGroup);
app.component('ScrollPanel', ScrollPanel);
app.component('SelectButton', SelectButton);
app.component('Drawer', Drawer);
app.component('Menu', Menu);
app.component('Carousel', Carousel);
app.component('InputNumber', InputNumber);
app.component('DatePicker', DatePicker);
app.component('Paginator', Paginator);
app.component('Tag', Tag);
app.component('TieredMenu', TieredMenu);
app.component('Popover', Popover);
app.component('FileUpload', FileUpload);
app.component('Message', Message);
app.component('FloatLabel', FloatLabel);
app.component('Password', Password);

app.use(createPinia());
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.mount('#app');
