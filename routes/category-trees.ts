import { RouteRecordRaw } from 'vue-router'
import checkAuth from 'motor-core/router/checkAuth'

const routes: Array<RouteRecordRaw> = [
  /**
   * Category trees
   */
  {
    path: '/admin/motor-backend/category-trees',
    name: 'admin.motor-backend.category-trees',
    meta: {
      layout: 'AdminLayout', // we add new meta layout here to use it later
      title: 'motor-backend.category_trees.category_trees',
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/category-trees/index.vue'),
  },
  {
    path: '/admin/motor-backend/category-trees/create',
    name: 'admin.motor-backend.category-trees.create',
    meta: {
      title: 'motor-backend.category_trees.category_trees',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.category-trees',
          name: 'motor-backend.category_trees.category_trees',
        },
        {
          name: 'motor-backend.category_trees.new',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/category-trees/edit.vue'),
  },
  {
    path: '/admin/motor-backend/category-trees/edit/:id',
    name: 'admin.motor-backend.category-trees.edit',
    meta: {
      title: 'motor-backend.category_trees.category_trees',
      breadcrumbs: [
        {
          route: 'admin.motor-backend.category-trees',
          name: 'motor-backend.category_trees.category_trees',
        },
        {
          name: 'motor-backend.category_trees.edit',
        },
      ],
    },
    beforeEnter: checkAuth,
    component: () => import('../views/admin/category-trees/edit.vue'),
  },
]

export default routes
