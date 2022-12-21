import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-nx-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Users
   */
  {
    path: '/admin/motor-admin/users',
    name: 'admin.motor-admin.users',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-admin.users.users',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/users/index.vue'),
  },
  {
    path: '/admin/motor-admin/users/create',
    name: 'admin.motor-admin.users.create',
    meta: {
      title: 'motor-admin.users.users',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.users',
          name: 'motor-admin.users.users',
        },
        {
          name: 'motor-admin.users.create',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/users/edit.vue'),
  },
  {
    path: '/admin/motor-admin/users/edit/:id',
    name: 'admin.motor-admin.users.edit',
    meta: {
      title: 'motor-admin.users.users',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.users',
          name: 'motor-admin.users.users',
        },
        {
          name: 'motor-admin.users.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/users/edit.vue'),
  },
]

export default routes
