import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
  api: useApi(),
  index(params: Record<string, any>, id: string) {
    return this.api.get('permissions_items/' + id, params)
  },

  all(params: Record<string, any>) {
    return this.api.get(`permissions`, params)
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
