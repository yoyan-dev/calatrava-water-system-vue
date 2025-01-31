import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from '@/firebase/config';
import '@/assets/main.css';
import '@/assets/base.css';
import 'primeicons/primeicons.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toolbar from 'primevue/toolbar';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row'; 
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Textarea from 'primevue/textarea';
import RadioButton from 'primevue/radiobutton';
import Select from 'primevue/select';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';   //Optional for grouping
import ScrollPanel from 'primevue/scrollpanel';
import SelectButton from 'primevue/selectbutton';
import Drawer from 'primevue/drawer';
import Menu from 'primevue/menu';
import Carousel from 'primevue/carousel';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';


const app = createApp(App);
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



app.use(createPinia());
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.mount('#app');
