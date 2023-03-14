import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
    api: useApi(),
    index(params: any, cached: boolean = true) {
        return this.api.get('email_templates', cached, params)
    },

    create(payload: object) {
        return this.api.post(`email_templates`, payload)
    },

     get(id: number): Promise<object> {
        return this.api.get(`email_templates/${id}`)
    },

    update(payload: object, id: number) {
        return this.api.put(`email_templates/${id}`, payload)
    },

    delete(id: number) {
        return this.api.destroy(`email_templates/${id}`)
    },
})
