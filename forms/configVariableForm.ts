
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/configVariable'

import {InferType, object, string, number} from "yup";
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
    package: string().min(5).label(t('motor-admin.config_variables.config_package')),
    group: string().min(5).label(t('motor-admin.config_variables.group')),
    name: string().min(3).label(t('motor-admin.config_variables.name')),
    value: string().min(3).label(t('motor-admin.config_variables.value')),
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
