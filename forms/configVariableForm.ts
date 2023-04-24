
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/configVariable'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {InferType, object, string, number} from "yup";

export default function configVariableForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    package: string().min(5).label(t('motor-admin.config_variables.package')),
    group: string().min(5).label(t('motor-admin.config_variables.group')),
    name: string().min(3).label(t('motor-admin.config_variables.name')),
    value: string().min(3).label(t('motor-admin.config_variables.value')),
  })

  type ConfigVariablesForm = InferType<typeof schema>;

  // Record
  const model = ref<ConfigVariablesForm>({
    id: null,
    package: '',
    group: '',
    name: '',
    value: '',
  })

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.config_variables',
    'admin.motor-admin.config-variables',
    modelRepository(),
    model,
    schema,
    sanitizer
  )

  const { getRelevantFormData } = useCoreFormData();

  onMounted(async () => {
    await getRelevantFormData(getData,[
    ],[
    ]);
  })

  return {
    getData,
    onSubmit,
    model,
  }
}
