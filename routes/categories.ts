import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Categories
   */
  {
    path: '/admin/motor-admin/category-trees/:category_tree/categories',
    name: 'admin.motor-admin.categories',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-admin.categories.categories',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/categories/index.vue'),
  },
  {
    path: '/admin/motor-admin/category-trees/:category_tree/categories/create',
    name: 'admin.motor-admin.categories.create',
    meta: {
      title: 'motor-admin.categories.categories',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.categories',
          name: 'motor-admin.categories.categories',
        },
        {
          name: 'motor-admin.categories.create',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/categories/edit.vue'),
  },
  {
    path: '/admin/motor-admin/category-trees/:category_tree/categories/edit/:id',
    name: 'admin.motor-admin.categories.edit',
    meta: {
      title: 'motor-admin.categories.categories',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.categories',
          name: 'motor-admin.categories.categories',
        },
        {
          name: 'motor-admin.categories.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/categories/edit.vue'),
  },
]

export default routes
