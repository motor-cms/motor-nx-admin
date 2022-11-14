import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Languages
   */
  {
    path: '/admin/motor-admin/languages',
    name: 'admin.motor-admin.languages',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-admin.languages.languages',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/languages/index.vue'),
  },
  {
    path: '/admin/motor-admin/languages/create',
    name: 'admin.motor-admin.languages.create',
    meta: {
      title: 'motor-admin.languages.languages',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.languages',
          name: 'motor-admin.languages.languages',
        },
        {
          name: 'motor-admin.languages.create',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/languages/edit.vue'),
  },
  {
    path: '/admin/motor-admin/languages/edit/:id',
    name: 'admin.motor-admin.languages.edit',
    meta: {
      title: 'motor-admin.languages.languages',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.languages',
          name: 'motor-admin.languages.languages',
        },
        {
          name: 'motor-admin.languages.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/languages/edit.vue'),
  },
]

export default routes
