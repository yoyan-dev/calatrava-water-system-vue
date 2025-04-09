import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp, messaging } from "@/firebase/config";
import "@/assets/main.css";
import "@/assets/base.css";
import "primeicons/primeicons.css";
import { getToken } from "firebase/messaging";
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

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/sw.js", { type: "module" })
//       .then((reg) => console.log("SW registered!", reg))
//       .catch((err) => console.error("SW registration failed:", err));
//   });
// }
navigator.serviceWorker?.ready.then((reg) => {
  console.log("SW is ready!", reg);
});

const requestPermissionAndGetToken = async () => {
  try {
    // Request permission for notifications
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      // Get the token
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY, // Replace with your public VAPID key
      });

      if (currentToken) {
        console.log("FCM Token:", currentToken);
        // You can store the token in your database or local storage
      } else {
        console.log(
          "No FCM token available. Request permission to generate one."
        );
      }
    } else {
      console.log("Permission not granted for notifications");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// Call the function when the app starts
requestPermissionAndGetToken();

app.mount("#app");
