import  axios  from "axios";
import { createApp } from 'vue'
import App from './App.vue'
import router from './helpers/router'
import 'bootstrap/dist/css/bootstrap.min.css'

window.axios = axios;

createApp(App).use(router).mount('#app')