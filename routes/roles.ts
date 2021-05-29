import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Roles
   */
  {
    path: '/admin/motor-backend/roles',
    name: 'admin.motor-backend.roles',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-backend.roles.roles',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/roles/index.vue'),
  },
  {
    path: '/admin/motor-backend/roles/create',
    name: 'admin.motor-backend.roles.create',
    meta: {
      title: 'motor-backend.roles.roles',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.roles',
          name: 'motor-backend.roles.roles',
        },
        {
          name: 'motor-backend.roles.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/roles/edit.vue'),
  },
  {
    path: '/admin/motor-backend/roles/edit/:id',
    name: 'admin.motor-backend.roles.edit',
    meta: {
      title: 'motor-backend.roles.roles',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.roles',
          name: 'motor-backend.roles.roles',
        },
        {
          name: 'motor-backend.roles.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/roles/edit.vue'),
  },
]

export default routes
