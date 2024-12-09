import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
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
    component: () => import('../views/FormationDetailView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
  },
  {
    path: '/loginAdmin',
    name: 'loginAdmin',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin-menu',
    name: 'admin-menu',
    component: () => import('../views/admin/AdminMenu.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/accueil-admin',
    name: 'accueil-admin',
    component: () => import('../views/admin/AccueilAdmin.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/bilan-admin',
    name: 'bilan-admin',
    component: () => import('../views/admin/BilanAdmin.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/formation-admin',
    name: 'formation-admin',
    component: () => import('../views/admin/FormationAdmin.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/formation-admin-creation',
    name: 'formation-admin-creation',
    component: () => import('../views/admin/FormationAdminCreate.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/admin-tableau-messages',
    name: 'admin-tableau',
    component: () => import('../views/admin/MessagesAdminTableau.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/messages-tout',
    name: 'messages-tout',
    component: () => import('../views/admin/MessagesTout.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/messages-renseignement',
    name: 'messages-renseignement',
    component: () => import('../views/admin/MessagesRenseignements.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/messages-bilan',
    name: 'messages-bilan',
    component: () => import('../views/admin/MessagesBilan.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/messages-formation',
    name: 'messages-Formation',
    component: () => import('../views/admin/MessagesFormation.vue'),
    // meta: { requiresAuth: true },
  },
  {
    path: '/logo-couleurs',
    name: 'logo-couleurs',
    component: () => import('../views/admin/LogoCouleurView.vue'),
    // meta: { requiresAuth: true },
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
