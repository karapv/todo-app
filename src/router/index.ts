import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Todo from "@/views/Todo/Todo.vue";
import NotFound from "@/views/NotFound/NotFound";
Vue.use(VueRouter);

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todo/:id',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
     path: '*',
     redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
