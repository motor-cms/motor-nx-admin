import useApi from "@zrm/motor-nx-core/composables/http/api";

export default () => ({
  api: useApi(),
  index(params: Record<string, object>) {
    return this.api.get("ai_system_prompts", params);
  },

  create(payload: object) {
    return this.api.post(`ai_system_prompts`, payload);
  },

  get(id: number): Promise<object> {
    return this.api.get(`ai_system_prompts/${id}`);
  },

  update(payload: object, id: number) {
    return this.api.put(`ai_system_prompts/${id}`, payload);
  },

  delete(id: number) {
    return this.api.destroy(`ai_system_prompts/${id}`);
  },
});
