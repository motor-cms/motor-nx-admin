import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-nx-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Category trees
   */
  {
    path: '/admin/motor-admin/category-trees',
    name: 'admin.motor-admin.category-trees',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-admin.category_trees.category_trees',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/category-trees/index.vue'),
  },
  {
    path: '/admin/motor-admin/category-trees/create',
    name: 'admin.motor-admin.category-trees.create',
    meta: {
      title: 'motor-admin.category_trees.category_trees',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.category-trees',
          name: 'motor-admin.category_trees.category_trees',
        },
        {
          name: 'motor-admin.category_trees.create',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/category-trees/edit.vue'),
  },
  {
    path: '/admin/motor-admin/category-trees/edit/:id',
    name: 'admin.motor-admin.category-trees.edit',
    meta: {
      title: 'motor-admin.category_trees.category_trees',
      breadcrumbs: [
        {
          route: 'admin.motor-admin.category-trees',
          name: 'motor-admin.category_trees.category_trees',
        },
        {
          name: 'motor-admin.category_trees.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/category-trees/edit.vue'),
  },
]

export default routes
