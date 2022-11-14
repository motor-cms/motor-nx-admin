import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Clients
   */
  {
    path: '/admin/motor-admin/clients',
    name: 'admin.motor-admin.clients',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-admin.clients.clients',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/clients/index.vue'),
  },
  {
    path: '/admin/motor-admin/clients/create',
    name: 'admin.motor-admin.clients.create',
    meta: {
      title: 'motor-admin.clients.clients',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.clients',
          name: 'motor-admin.clients.clients',
        },
        {
          name: 'motor-admin.clients.create',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/clients/edit.vue'),
  },
  {
    path: '/admin/motor-admin/clients/edit/:id',
    name: 'admin.motor-admin.clients.edit',
    meta: {
      title: 'motor-admin.clients.clients',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.clients',
          name: 'motor-admin.clients.clients',
        },
        {
          name: 'motor-admin.clients.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/clients/edit.vue'),
  },
]

export default routes
