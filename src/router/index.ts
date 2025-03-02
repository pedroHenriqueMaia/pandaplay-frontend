import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ProtectedView from '../views/ProtectedView.vue';
import CallbackView from '@/views/CallbackView.vue';

const isAuthenticated = () => {
  return !!localStorage.getItem('access_token'); // Verifica se o token de acesso está presente
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/callback',
      name: 'callback',
      component: CallbackView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: ProtectedView,
      meta: { requiresAuth: true },
    },
  ],
});

// Proteção de rota
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
