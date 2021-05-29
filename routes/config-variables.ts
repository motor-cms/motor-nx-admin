import { RouteRecordRaw } from 'vue-router'
import checkAuth from '@/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Config variables
   */
  {
    path: '/admin/motor-backend/config-variables',
    name: 'admin.motor-backend.config-variables',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-backend.config_variables.config_variables',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/config-variables/index.vue'),
  },
  {
    path: '/admin/motor-backend/config-variables/create',
    name: 'admin.motor-backend.config-variables.create',
    meta: {
      title: 'motor-backend.config_variables.config_variables',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.config-variables',
          name: 'motor-backend.config_variables.config_variables',
        },
        {
          name: 'motor-backend.config_variables.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/config-variables/edit.vue'),
  },
  {
    path: '/admin/motor-backend/config-variables/edit/:id',
    name: 'admin.motor-backend.config-variables.edit',
    meta: {
      title: 'motor-backend.config_variables.config_variables',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.config-variables',
          name: 'motor-backend.config_variables.config_variables',
        },
        {
          name: 'motor-backend.config_variables.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/config-variables/edit.vue'),
  },
]

export default routes
