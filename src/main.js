import { createApp } from 'vue'
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
  
//core
import "primevue/resources/primevue.min.css";
import DialogService from "primevue/dialogservice";


const app = createApp(App);
app.use(DialogService);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.mount("#app");

