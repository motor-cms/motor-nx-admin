import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Languages
   */
  {
    path: '/admin/motor-backend/languages',
    name: 'admin.motor-backend.languages',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-backend.languages.languages',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/languages/index.vue'),
  },
  {
    path: '/admin/motor-backend/languages/create',
    name: 'admin.motor-backend.languages.create',
    meta: {
      title: 'motor-backend.languages.languages',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.languages',
          name: 'motor-backend.languages.languages',
        },
        {
          name: 'motor-backend.languages.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/languages/edit.vue'),
  },
  {
    path: '/admin/motor-backend/languages/edit/:id',
    name: 'admin.motor-backend.languages.edit',
    meta: {
      title: 'motor-backend.languages.languages',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.languages',
          name: 'motor-backend.languages.languages',
        },
        {
          name: 'motor-backend.languages.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/languages/edit.vue'),
  },
]

export default routes
