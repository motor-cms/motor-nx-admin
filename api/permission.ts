import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
  api: useApi(),
  index(params: any, id: string, cached: boolean = true) {
    return this.api.get('permissions_items/' + id, cached, params)
  },

  create(payload: object) {
    return this.api.post(`permissions`, payload)
  },

   get(id: number): Promise<object> {
    return this.api.get(`permissions/${id}`)
  },

  update(payload: object, id: number) {
    return this.api.put(`permissions/${id}`, payload)
  },

  delete(id: number) {
    return this.api.destroy(`permissions/${id}`)
  },
})
