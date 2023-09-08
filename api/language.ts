import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
    api: useApi(),
    index(params: Record<string, any>) {
        return this.api.get('languages', params)
    },

    create(payload: object) {
        return this.api.post(`languages`, payload)
    },

     get(id: number): Promise<object> {
        return this.api.get(`languages/${id}`)
    },

    update(payload: object, id: number) {
        return this.api.put(`languages/${id}`, payload)
    },

    delete(id: number) {
        return this.api.destroy(`languages/${id}`)
    },
})
