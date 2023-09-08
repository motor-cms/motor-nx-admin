import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
  api: useApi(),
  index(params: Record<string, any>) {
    return this.api.get('permission_groups', params)
  },

  create(payload: object) {
    return this.api.post(`permission_groups`, payload)
  },

  get(id: number): Promise<object> {
    return this.api.get(`permission_groups/${id}`)
  },

  update(payload: object, id: number) {
    return this.api.put(`permission_groups/${id}`, payload)
  },

  delete(id: number) {
    return this.api.destroy(`permission_groups/${id}`)
  },
})
