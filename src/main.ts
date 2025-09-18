import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp, messaging } from "@/firebase/config";
import "@/assets/main.css";
import "@/assets/base.css";
import "primeicons/primeicons.css";
import "leaflet/dist/leaflet.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
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
  Image,
  InputGroup,
  InputGroupAddon,
  Badge,
  OverlayBadge,
  Accordion,
  AccordionPanel,
  AccordionHeader,
  AccordionContent,
} from "primevue";

import {
  browserLocalPersistence,
  getAuth,
  indexedDBLocalPersistence,
  setPersistence,
} from "firebase/auth";

const app = createApp(App);
const auth = getAuth(firebaseApp);

setPersistence(auth, indexedDBLocalPersistence)
  .catch(() => setPersistence(auth, browserLocalPersistence))
  .then(() => console.log("Persistence set successfully"))
  .catch((error) => console.error("Error setting persistence:", error));

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark",
      cssLayer: {
        name: "primevue",
        order: "theme, base, primevue",
      },
    },
  },
});

// component here:
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("Toolbar", Toolbar);
app.component("Splitter", Splitter);
app.component("SplitterPanel", SplitterPanel);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("InputText", InputText);
app.component("IconField", IconField);
app.component("InputIcon", InputIcon);
app.component("Textarea", Textarea);
app.component("RadioButton", RadioButton);
app.component("Select", Select);
app.component("Avatar", Avatar);
app.component("AvatarGroup", AvatarGroup);
app.component("ScrollPanel", ScrollPanel);
app.component("SelectButton", SelectButton);
app.component("Drawer", Drawer);
app.component("Menu", Menu);
app.component("Carousel", Carousel);
app.component("InputNumber", InputNumber);
app.component("DatePicker", DatePicker);
app.component("Paginator", Paginator);
app.component("Tag", Tag);
app.component("TieredMenu", TieredMenu);
app.component("Popover", Popover);
app.component("FileUpload", FileUpload);
app.component("Message", Message);
app.component("FloatLabel", FloatLabel);
app.component("Password", Password);
app.component("Image", Image);
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("Badge", Badge);
app.component("OverlayBadge", OverlayBadge);
app.component("Accordion", Accordion);
app.component("AccordionPanel", AccordionPanel);
app.component("AccordionHeader", AccordionHeader);
app.component("AccordionContent", AccordionContent);

app.use(createPinia());
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js")
//     .then((registration) => {
//       console.log("✅ Service Worker registered successfully!", registration);
//       registration.active?.postMessage({
//         type: "SET_FIREBASE_CONFIG",
//         firebaseConfig: {
//           apiKey: import.meta.env.VITE_API_KEY,
//           authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//           projectId: import.meta.env.VITE_PROJECT_ID,
//           storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//           messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//           appId: import.meta.env.VITE_APP_ID,
//         },
//       });
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }

app.mount("#app");
