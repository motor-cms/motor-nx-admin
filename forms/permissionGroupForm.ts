
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/permissionGroup'

import {InferType, number, object, string} from "yup";
import { storeToRefs } from "pinia";
export default function permissionGroupForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Record
  const initialModelData ={
    id: null,
  }

  const initialFormData = {
    name: '',
    sort_position: null,
  }

  const formStore = useFormStore();
  const {model, formSchema} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);
  formSchema.value = {
    id: number().min(1).nullable(),
    name: string().min(3),
    sort_position: number().nullable(),
  };

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.permission',
    'admin.motor-admin.permissions',
    modelRepository(),
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
  }
}
