import useApi from "@zrm/motor-nx-core/composables/http/api";
import type {GridActionPayload} from "~/packages/motor-nx-core/types/grid-action-payload";

export default () => ({
    api: useApi(),
    index(params: Record<string, any>) {
        return this.api.get('email_templates', params)
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
    async duplicate(payload: GridActionPayload) {
      //Remove selected items from store after duplication (to avoid duplication of already duplicated items)
      const gridStore = useGridStore();
      gridStore.selectedItems = [];
      return this.api.post(`email_templates/duplicate`, payload);
    }
})
