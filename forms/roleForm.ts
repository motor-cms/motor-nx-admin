import axios from 'axios'
import baseForm from 'motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/role'
import Repository from 'motor-nx-core/types/repository'
import permissionRepository from '../api/permission'
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';

export default function roleForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = toFormValidator(
      zod.object({
        name: zod.string().min(3),
        english_name: zod.string().min(3),
        iso_639_1: zod.string().min(2),
      })
  )

  // Record
  const model = ref({
    id: 0,
    name: '',
    guard_name: '',
    permissions: <any>[],
  })

  // Sanitize dates
  const sanitizer = () => {}

  // Get schedules from api
  const permissions = ref([])
  const permissionRepo: Repository = permissionRepository(axios)
  permissionRepo.index({ per_page: 500 }).then((response) => {
    const options = []
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    permissions.value = options
  })

  const { getData, onSubmit } = baseForm(
    'motor-admin.roles',
    'admin.motor-admin.roles',
    modelRepository(axios),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    permissions,
  }
}
