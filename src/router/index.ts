// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/produtos',
        name: 'Produtos',
        component: () => import('@/views/Produtos.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/cadastro',
        name: 'cadastro',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: '/esqueceu-senha',
        name: 'esqueceuasenha',
        component: () => import('@/views/ForgotPassword.vue'),
      },
    ],
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");

    if (!token || token === "") {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); 
  }
});

export default router;