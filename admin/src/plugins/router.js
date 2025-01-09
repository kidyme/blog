import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import Home from '@/views/Home.vue';
import Content from '@/views/Content.vue';
import Statistics from '@/views/Statistics.vue';
import About from '@/views/About.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: '/content',
        component: Content,
      },
      {
        path: '/ststcs',
        component: Statistics,
      },
      {
        path: '/about',
        component: About,
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
