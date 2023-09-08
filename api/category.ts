import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
  api: useApi(),
  index(params: any, categoryTree?: string) {
      return this.api.get(
      'category_trees/' + categoryTree + '/categories', params
    )
  },

  create(payload: object, params: { category_tree: number }) {
    return this.api.post(
      `category_trees/${params.category_tree}/categories`,
      payload
    )
  },

  get(id: number, params: { category_tree: number }): Promise<object> {
    return this.api.get(
      `category_trees/${params.category_tree}/categories/${id}`
    )
  },

  update(payload: object, id: number, params: { category_tree: number }) {
    return this.api.put(
      `category_trees/${params.category_tree}/categories/${id}`,
      payload
    )
  },

  delete(id: number) {
    return this.api.destroy(`category_trees/${id}`)
  },
})
