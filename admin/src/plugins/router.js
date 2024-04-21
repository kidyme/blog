import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import Home from "@/views/Home.vue";
import Edit from "@/views/Edit.vue";
import Statistics from "@/views/Statistics.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "/edit",
        component: Edit,
      },
      {
        path: "/ststcs",
        component: Statistics,
      },
      {
        path: "/about",
        component: About,
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
