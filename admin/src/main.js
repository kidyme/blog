import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/plugins/router.js';
import vuetify from '@/plugins/vuetify';
import '@/assets/common.css';
import '@/assets/light.css';

createApp(App).use(router).use(vuetify).mount('#app');
