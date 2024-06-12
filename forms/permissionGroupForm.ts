
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/permissionGroup'

import { number, string} from "yup";
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
    id: number().min(1).nullable().label(t('motor-admin.permission_groups.id')),
    name: string().trim().min(3).label(t('motor-admin.permission_groups.name')),
    sort_position: number().nullable().label(t('motor-admin.permission_groups.sort_position')),
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
