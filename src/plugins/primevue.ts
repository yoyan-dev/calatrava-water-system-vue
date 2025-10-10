import {
	Toolbar,
	Splitter,
	SplitterPanel,
	ConfirmationService,
	DialogService,
	DynamicDialog,
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
	Image,
	InputGroup,
	InputGroupAddon,
	Badge,
	OverlayBadge,
	Accordion,
	AccordionPanel,
	AccordionHeader,
	AccordionContent,
	ConfirmPopup,
} from 'primevue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

export default {
	install(app: any) {
		// Primevue Config
		app.use(PrimeVue, {
			theme: {
				preset: Aura,
				options: {
					prefix: 'p',
					darkModeSelector: '.dark',
					cssLayer: {
						name: 'primevue',
						order: 'base, utilities, primevue',
					},
				},
			},
		});

		// Primevue Services
		app.use(ConfirmationService);
		app.use(DialogService);
		app.use(ToastService);

		// Primevue Components
		app.component('Button', Button);
		app.component('Dialog', Dialog);
		app.component('Toolbar', Toolbar);
		app.component('Splitter', Splitter);
		app.component('SplitterPanel', SplitterPanel);
		app.component('DataTable', DataTable);
		app.component('Column', Column);
		app.component('ColumnGroup', ColumnGroup);
		app.component('ConfirmPopup', ConfirmPopup);
		app.component('DynamicDialog', DynamicDialog);
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
		app.component('Image', Image);
		app.component('InputGroup', InputGroup);
		app.component('InputGroupAddon', InputGroupAddon);
		app.component('Badge', Badge);
		app.component('OverlayBadge', OverlayBadge);
		app.component('Accordion', Accordion);
		app.component('AccordionPanel', AccordionPanel);
		app.component('AccordionHeader', AccordionHeader);
		app.component('AccordionContent', AccordionContent);
	},
};
