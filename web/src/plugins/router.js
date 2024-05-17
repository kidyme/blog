import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import PostLayout from '@/layout/PostLayout.vue';
import List from '@/views/List.vue';
import Post from '@/views/Post.vue';
import About from '@/views/About.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: PostLayout,
        children: [
          {
            path: '',
            component: List,
          },
          {
            path: 'post/:id',
            component: Post,
            props: true,
          },
        ],
      },
      {
        path: '/about',
        component: About,
      },
    ],
  },
  {
    path: '/404',
    component: NotFound,
    meta: { errorPage: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
