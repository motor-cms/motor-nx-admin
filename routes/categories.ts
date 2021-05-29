import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Categories
   */
  {
    path: '/admin/motor-backend/category-trees/:category_tree/categories',
    name: 'admin.motor-backend.categories',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-backend.categories.categories',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/categories/index.vue'),
  },
  {
    path: '/admin/motor-backend/category-trees/:category_tree/categories/create',
    name: 'admin.motor-backend.categories.create',
    meta: {
      title: 'motor-backend.categories.categories',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.categories',
          name: 'motor-backend.categories.categories',
        },
        {
          name: 'motor-backend.categories.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/categories/edit.vue'),
  },
  {
    path: '/admin/motor-backend/category-trees/:category_tree/categories/edit/:id',
    name: 'admin.motor-backend.categories.edit',
    meta: {
      title: 'motor-backend.categories.categories',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.categories',
          name: 'motor-backend.categories.categories',
        },
        {
          name: 'motor-backend.categories.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/categories/edit.vue'),
  },
]

export default routes
