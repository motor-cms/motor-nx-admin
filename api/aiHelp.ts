import useApi from "@zrm/motor-nx-core/composables/http/api";

interface AIHelpRequest {
  system_prompt: number;
  prompt: string;
}

export default () => ({
  api: useApi(),
  help(payload: AIHelpRequest) {
    return this.api.post("ai_help", payload);
  },
});
