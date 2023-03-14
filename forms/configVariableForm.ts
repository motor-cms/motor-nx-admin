
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/configVariable'
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";

export default function configVariableForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = toFormValidator(
      zod.object({
        package: zod.string().min(5),
        group: zod.string().min(5),
        name: zod.string().min(3),
      })
  )

  // Record
  const model = ref({
    id: 0,
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
