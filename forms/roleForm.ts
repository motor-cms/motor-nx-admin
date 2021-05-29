import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/role'
import Repository from 'motor-core/types/repository'
import permissionRepository from '../api/permission'

export default function roleForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
  })

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
    'motor-backend.roles',
    'admin.motor-backend.roles',
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
