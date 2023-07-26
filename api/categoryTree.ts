import useApi from "@zrm/motor-nx-core/composables/http/api";
import { AsyncData } from "nuxt/app";

export default () => ({
  api: useApi(),
  index(params: any, cached: boolean) {
    return this.api.get('category_trees', cached, params)
  },

  create(payload: Record<string, any>) {
    return this.api.post(`category_trees`, payload)
  },

  get(id: number | string, cached: boolean) {
    return this.api.get(`category_trees/${id}`, cached)
  },

  update(payload: Record<string, any>, id: number) {
    return this.api.put(`category_trees/${id}`, payload)
  },

  delete(id: number) {
    return this.api.destroy(`category_trees/${id}`)
  },
})
