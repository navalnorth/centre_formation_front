import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import router from './router';
import store from './store';
import "../src/style.css";

const head = createHead();

// Crée l'application et attache le store, le routeur, et VueUse/head
createApp(App)
  .use(store)
  .use(router)
  .use(head)
  .mount('#app');
