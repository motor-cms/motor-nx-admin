import { RouteRecordRaw } from 'vue-router'
import checkAuth from '@/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Clients
   */
  {
    path: '/admin/motor-backend/clients',
    name: 'admin.motor-backend.clients',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-backend.clients.clients',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/clients/index.vue'),
  },
  {
    path: '/admin/motor-backend/clients/create',
    name: 'admin.motor-backend.clients.create',
    meta: {
      title: 'motor-backend.clients.clients',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.clients',
          name: 'motor-backend.clients.clients',
        },
        {
          name: 'motor-backend.clients.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/clients/edit.vue'),
  },
  {
    path: '/admin/motor-backend/clients/edit/:id',
    name: 'admin.motor-backend.clients.edit',
    meta: {
      title: 'motor-backend.clients.clients',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.clients',
          name: 'motor-backend.clients.clients',
        },
        {
          name: 'motor-backend.clients.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/clients/edit.vue'),
  },
]

export default routes
