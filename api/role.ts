import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
    api: useApi(),
    index(params: any, cached: boolean = true) {
        return this.api.get('roles', cached, params)
    },

    create(payload: object) {
        return this.api.post(`roles`, payload)
    },

    get(id: number): Promise<object> {
        return this.api.get(`roles/${id}`)
    },

    update(payload: object, id: number) {
        return this.api.put(`roles/${id}`, payload)
    },

    delete(id: number) {
        return this.api.destroy(`roles/${id}`)
    },
})
