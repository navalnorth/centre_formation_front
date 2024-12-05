import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/loginAdmin',
    name: 'loginAdmin',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/bilan-de-competences',
    name: 'bilan-de-competences',
    component: () => import('../views/BilanView.vue')
  },
  {
    path: '/formation',
    name: 'formation',
    component: () => import('../views/FormationView.vue')
  },
  {
    path: '/formation/:id',
    name: 'formationdetail',
    component: () => import('../views/FormationDetail.vue')
  },
  {
    path: '/admin-menu',
    name: 'admin-menu',
    component: () => import('../views/admin/AdminMenuView.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/admin-accueil',
    name: 'admin-accueil',
    component: () => import('../views/admin/AdminAccueilView.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Si une position est sauvegardée (par exemple, navigation arrière), on y retourne
      return savedPosition;
    } else {
      // Sinon, on défile vers le haut
      return { top: 0, behavior: 'smooth' }; // `smooth` pour un défilement fluide
    }
  },
})



router.beforeEach((to, from, next) => {
  const store = useStore();
  const isLoggedIn = store.getters.isLoggedIn;
  const isAdmin = store.getters.isAdmin;

  if (['/', '/register', '/'].includes(to.path)) {
    next(); 
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/');
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next('/'); 
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
