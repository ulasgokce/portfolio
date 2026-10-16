import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: () => import('./pages/About.vue') },
    { path: '/work', name: 'work', component: () => import('./pages/Work.vue') },
    { path: '/work/sigorta', redirect: '/work/vela' },
    // Remove when the Laz dictionary is published.
    { path: '/work/sozluk', redirect: '/work' },
    { path: '/work/:slug', name: 'work-detail', component: () => import('./pages/WorkDetail.vue') },
    { path: '/hakkinda', redirect: '/about' },
    { path: '/is', redirect: '/work' },
    { path: '/is/:slug', redirect: (to) => `/work/${to.params.slug === 'sigorta' ? 'vela' : to.params.slug}` },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
