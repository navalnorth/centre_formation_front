import { createRouter, createWebHistory } from 'vue-router'

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
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
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

export default router
