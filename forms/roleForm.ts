import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/role'
import { storeToRefs } from "pinia";
import {array, string} from "yup";

import {useFormData} from "@zrm/motor-nx-admin/composables/formData";

export default function roleForm() {
  // Load i18n module
  const { t, tm } = useI18n()
  // Record
  const initialModelData = {
    id: null,
  }

  const initialFormData ={
    name: '',
    guard_name: 'web',
    permissions: <any>[],
  }

  const formStore = useFormStore();
  const {model, formSchema, formData} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);

  // Validation schema
  formSchema.value = {
    name: string().trim().min(3).required().label(t('motor-admin.roles.name')),
    guard_name: string().trim().min(3).required().label(t('motor-admin.roles.guard_name')),
    permissions: array().nullable().label(t('motor-admin.roles.permissions')),
  }


  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.roles',
    'admin.motor-admin.roles',
    modelRepository(),
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    ...useFormData()
  }
}
