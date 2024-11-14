import baseForm from "@zrm/motor-nx-core/forms/baseForm";
import { useI18n } from "vue-i18n";
import modelRepository from "../api/aiSystemPrompt";
import { useFormData } from "@zrm/motor-nx-admin/composables/formData";
import { number, string } from "yup";
import { storeToRefs } from "pinia";
export default function domainsForm() {
  // Load i18n module
  const { t } = useI18n();

  // Record
  const initialModelData = {
    id: null,
  };
  const initialFormData = {
    client_id: null,
    name: "",
    prompt: "",
  };

  const formStore = useFormStore();
  const { model, formSchema } = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);
  formSchema.value = {
    client_id: number().nullable().label(t("motor-admin.clients.client")),
    name: string().trim().min(3).required().label(t("motor-admin.global.name")),
    prompt: string()
      .trim()
      .min(3)
      .required()
      .label(t("motor-admin.ai_system_prompts.prompt")),
  };

  // Sanitize dates
  const sanitizer = () => {};

  const { getData, onSubmit } = baseForm(
    "motor-admin.ai_system_prompts",
    "admin.motor-admin.ai-system-prompts",
    modelRepository(),
    sanitizer,
  );

  return {
    getData,
    onSubmit,
    model,
    ...useFormData(),
  };
}
