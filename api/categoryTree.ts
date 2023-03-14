import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
  api: useApi(),
  index(params: any, cached: boolean) {
    return this.api.get('category_trees', cached, params)
  },

  create(payload: object) {
    return this.api.post(`category_trees`, payload)
  },

  get(id: number | string, cached:boolean): Promise<object> {
    return this.api.get(`category_trees/${id}`, cached)
  },

  update(payload: object, id: number) {
    return this.api.put(`category_trees/${id}`, payload)
  },

  delete(id: number) {
    return this.api.destroy(`category_trees/${id}`)
  },
})
