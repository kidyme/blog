import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/plugins/router.js';
import vuetify from '@/plugins/vuetify';

createApp(App).use(router).use(vuetify).mount('#app');
