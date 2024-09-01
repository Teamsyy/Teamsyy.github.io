import { createRouter, createWebHistory } from 'vue-router';
import aboutMe from '../components/aboutMe.vue';   
const routes = [
  {
    path: '/',
    name: 'abouteMe',
    component: aboutMe
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;