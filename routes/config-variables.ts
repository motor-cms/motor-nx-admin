import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Config variables
   */
  {
    path: '/admin/motor-admin/config-variables',
    name: 'admin.motor-admin.config-variables',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-admin.config_variables.config_variables',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/config-variables/index.vue'),
  },
  {
    path: '/admin/motor-admin/config-variables/create',
    name: 'admin.motor-admin.config-variables.create',
    meta: {
      title: 'motor-admin.config_variables.config_variables',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.config-variables',
          name: 'motor-admin.config_variables.config_variables',
        },
        {
          name: 'motor-admin.config_variables.create',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/config-variables/edit.vue'),
  },
  {
    path: '/admin/motor-admin/config-variables/edit/:id',
    name: 'admin.motor-admin.config-variables.edit',
    meta: {
      title: 'motor-admin.config_variables.config_variables',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.config-variables',
          name: 'motor-admin.config_variables.config_variables',
        },
        {
          name: 'motor-admin.config_variables.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/config-variables/edit.vue'),
  },
]

export default routes
