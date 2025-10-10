import { Field, Form as VeeForm } from 'vee-validate';

export default {
	install(app: any) {
		app.component('VeeForm', VeeForm);
		app.component('VeeField', Field);
	},
};
