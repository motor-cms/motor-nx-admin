import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
    api: useApi(),
    index(params: Record<string, any>) {
        return this.api.get('domains', params)
    },

    create(payload: object) {
        return this.api.post(`domains`, payload)
    },

     get(id: number): Promise<object> {
        return this.api.get(`domains/${id}`)
    },

    update(payload: object, id: number) {
        return this.api.put(`domains/${id}`, payload)
    },

    delete(id: number) {
        return this.api.destroy(`domains/${id}`)
    },
})
