import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
  api: useApi(),
  index(params: Record<string, any>) {
    return this.api.get('category_trees', params)
  },

  create(payload: Record<string, any>) {
    return this.api.post(`category_trees`, payload)
  },

  get(id: number | string) {
    return this.api.get(`category_trees/${id}`)
  },

  update(payload: Record<string, any>, id: number) {
    return this.api.put(`category_trees/${id}`, payload)
  },

  delete(id: number) {
    return this.api.destroy(`category_trees/${id}`)
  },

  byScope(scope: string) {
    return this.api.get(`category_trees/scope/${scope}`)
  }
})
