import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Roles
   */
  {
    path: '/admin/motor-admin/roles',
    name: 'admin.motor-admin.roles',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-admin.roles.roles',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/roles/index.vue'),
  },
  {
    path: '/admin/motor-admin/roles/create',
    name: 'admin.motor-admin.roles.create',
    meta: {
      title: 'motor-admin.roles.roles',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.roles',
          name: 'motor-admin.roles.roles',
        },
        {
          name: 'motor-admin.roles.create',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/roles/edit.vue'),
  },
  {
    path: '/admin/motor-admin/roles/edit/:id',
    name: 'admin.motor-admin.roles.edit',
    meta: {
      title: 'motor-admin.roles.roles',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.roles',
          name: 'motor-admin.roles.roles',
        },
        {
          name: 'motor-admin.roles.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/roles/edit.vue'),
  },
]

export default routes
