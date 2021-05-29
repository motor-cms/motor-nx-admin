import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Users
   */
  {
    path: '/admin/motor-backend/users',
    name: 'admin.motor-backend.users',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-backend.users.users',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/users/index.vue'),
  },
  {
    path: '/admin/motor-backend/users/create',
    name: 'admin.motor-backend.users.create',
    meta: {
      title: 'motor-backend.users.users',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.users',
          name: 'motor-backend.users.users',
        },
        {
          name: 'motor-backend.users.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/users/edit.vue'),
  },
  {
    path: '/admin/motor-backend/users/edit/:id',
    name: 'admin.motor-backend.users.edit',
    meta: {
      title: 'motor-backend.users.users',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.users',
          name: 'motor-backend.users.users',
        },
        {
          name: 'motor-backend.users.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/users/edit.vue'),
  },
]

export default routes
