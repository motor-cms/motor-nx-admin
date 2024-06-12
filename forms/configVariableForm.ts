
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/configVariable'

import { string} from "yup";
import { storeToRefs } from "pinia";
export default function configVariableForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Record
  const initialModelData = {
    id: null,
  }
  const initialFormData = {
    package: '',
    group: '',
    name: '',
    value: '',
  }


  const formStore = useFormStore();
  const {model, formSchema} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);
  formSchema.value = {
    package: string().trim().min(5).label(t('motor-admin.config_variables.config_package')),
    group: string().trim().min(5).label(t('motor-admin.config_variables.group')),
    name: string().trim().min(3).label(t('motor-admin.config_variables.name')),
    value: string().trim().min(3).label(t('motor-admin.config_variables.value')),
  }

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.config_variables',
    'admin.motor-admin.config-variables',
    modelRepository(),
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
  }
}
