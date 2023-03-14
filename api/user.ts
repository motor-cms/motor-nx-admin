import useApi from "motor-nx-core/composables/http/api";

export default () => ({
  api: useApi(),
  index(params: any, cached: boolean = true) {
    return this.api.get('users', cached, params)
  },

  create(payload: object) {
    return this.api.post(`users`, payload)
  },

   get(id: number): Promise<object> {
    return this.api.get(`users/${id}`)
  },

  update(payload: object, id: number) {
    return this.api.put(`users/${id}`, payload)
  },

  delete(id: number) {
    return this.api.destroy(`users/${id}`)
  },
  refresh() {

  }
})
