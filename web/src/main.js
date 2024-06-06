import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/plugins/router.js';
import vuetify from '@/plugins/vuetify';
import '@/assets/styles.css'; // 根据你的文件路径调整

createApp(App).use(router).use(vuetify).mount('#app');
