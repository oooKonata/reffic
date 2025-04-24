import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/SearchView.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/ChatView.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/HomeView.vue'),
  },
  {
    path: '/file',
    name: 'file',
    component: () => import('@/views/file/FileView.vue'),
  },
  {
    path: '/set',
    name: 'set',
    component: () => import('@/views/set/SetView.vue'),
  },
  {
    path: '/template',
    name: 'template',
    component: () => import('@/views/template/TemplateView.vue'),
  },
  {
    path: '/trash',
    name: 'trash',
    component: () => import('@/views/trash/TrashView.vue'),
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('@/views/share/ShareView.vue'),
  },
  {
    path: '/:id',
    name: 'page',
    component: () => import('@/views/page/PageView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
