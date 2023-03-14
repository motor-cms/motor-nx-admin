import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
    api: useApi(),
    async index(params: any, cached: boolean = true) {
        return this.api.get('clients', cached, params)
    },

    async create(payload: object) {
         console.log("posting", payload);
         return this.api.post(`clients`, payload)
    },

    async  get(id: number): Promise<object> {
       return this.api.get(`clients/${id}`)
    },

    async update(payload: object, id: number) {
      return this.api.put(`clients/${id}`, payload)
    },

    async delete(id: number) {
       return this.api.destroy(`clients/${id}`)
    },
})
