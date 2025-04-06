import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp, messaging } from "@/firebase/config";
import { getToken } from "firebase/messaging";
import "@/assets/main.css";
import "@/assets/base.css";
import "primeicons/primeicons.css";

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
  Ripple,
} from "primevue";

const app = createApp(App);

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(PrimeVue, {
  theme: "none",
  options: {
    darkModeSelector: ".my-app-dark",
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
app.directive("ripple", Ripple);

app.use(createPinia());
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered");

      // Get FCM token
      getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
        serviceWorkerRegistration: registration, // ✅ important!
      }).then((currentToken: any) => {
        if (currentToken) {
          console.log("FCM Token:", currentToken);
          // send token to backend here
        } else {
          console.warn("No registration token available.");
        }
      });
    })
    .catch((err) => {
      console.error("Service Worker registration failed", err);
    });
}
app.mount("#app");
