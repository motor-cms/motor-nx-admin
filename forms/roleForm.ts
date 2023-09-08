import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/role'
import Repository from '@zrm/motor-nx-core/types/repository'
import permissionRepository from '../api/permission'

import {array, InferType, number, object, string} from "yup";
import {useCoreFormData} from "~/packages/motor-nx-core/composables/form/formData";
import {useFormData} from "~/packages/motor-nx-admin/composables/formData";

export default function roleForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    name: string().min(3).required().label(t('motor-admin.roles.name')),
    guard_name: string().min(3).required().label(t('motor-admin.roles.guard_name')),
    permissions: array().nullable(),
  })

  type RoleForm = InferType<typeof schema>;

  // Record
  const model = ref<RoleForm>({
    id: null,
    name: '',
    guard_name: '',
    permissions: <any>[],
  })

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.roles',
    'admin.motor-admin.roles',
    modelRepository(),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    ...useFormData()
  }
}
