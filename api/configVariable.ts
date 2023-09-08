import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
    api: useApi(),
    index(params: Record<string, any>) {
        return this.api.get('config_variables', params)
    },

    create(payload: object) {
        return this.api.post(`config_variables`, payload)
    },

     get(id: number): Promise<object> {
        return this.api.get(`config_variables/${id}`)
    },

    update(payload: object, id: number) {
        return this.api.put(`config_variables/${id}`, payload)
    },

    delete(id: number) {
        return this.api.destroy(`config_variables/${id}`)
    },
})
