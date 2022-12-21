import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-nx-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Email templates
   */
  {
    path: '/admin/motor-admin/email-templates',
    name: 'admin.motor-admin.email-templates',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-admin.email_templates.email_templates',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/email-templates/index.vue'),
  },
  {
    path: '/admin/motor-admin/email-templates/create',
    name: 'admin.motor-admin.email-templates.create',
    meta: {
      title: 'motor-admin.email_templates.email_templates',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.email-templates',
          name: 'motor-admin.email_templates.email_templates',
        },
        {
          name: 'motor-admin.email_templates.create',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/email-templates/edit.vue'),
  },
  {
    path: '/admin/motor-admin/email-templates/edit/:id',
    name: 'admin.motor-admin.email-templates.edit',
    meta: {
      title: 'motor-admin.email_templates.email_templates',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.email-templates',
          name: 'motor-admin.email_templates.email_templates',
        },
        {
          name: 'motor-admin.email_templates.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/email-templates/edit.vue'),
  },
]

export default routes
