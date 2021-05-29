import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Email templates
   */
  {
    path: '/admin/motor-backend/email-templates',
    name: 'admin.motor-backend.email-templates',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-backend.email_templates.email_templates',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/email-templates/index.vue'),
  },
  {
    path: '/admin/motor-backend/email-templates/create',
    name: 'admin.motor-backend.email-templates.create',
    meta: {
      title: 'motor-backend.email_templates.email_templates',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.email-templates',
          name: 'motor-backend.email_templates.email_templates',
        },
        {
          name: 'motor-backend.email_templates.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/email-templates/edit.vue'),
  },
  {
    path: '/admin/motor-backend/email-templates/edit/:id',
    name: 'admin.motor-backend.email-templates.edit',
    meta: {
      title: 'motor-backend.email_templates.email_templates',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.email-templates',
          name: 'motor-backend.email_templates.email_templates',
        },
        {
          name: 'motor-backend.email_templates.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/email-templates/edit.vue'),
  },
]

export default routes
