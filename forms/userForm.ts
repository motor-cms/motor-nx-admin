import axios, { AxiosResponse } from 'axios'
import baseForm from 'motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/user'
import Repository from 'motor-nx-core/types/repository'
import clientRepository from '../api/client'
import roleRepository from '../api/role'
import { useUserStore } from 'motor-nx-core/store/user'
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';

export default function userForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = toFormValidator(
      zod.object({
        name: zod.string().min(3),
      })
  )

  // Record
  const model = ref({
    id: 0,
    name: '',
    client: <any>{},
    client_id: null,
    roles: <any>[],
    avatar: <any>{},
  })

  // Sanitize data url
  const sanitizer = async (formData: any) => {
    // Find start of base64 string
    if (formData.avatar.dataUrl) {
      const startBase64 = formData.avatar.dataUrl.indexOf(',') + 1
      formData.avatar.dataUrl = formData.avatar.dataUrl.substring(startBase64)
    }
  }

  // Get schedules from api
  const roles = ref([])
  const roleRepo: Repository = roleRepository(axios)
  roleRepo.index({}).then((response) => {
    const options = []
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    roles.value = options
  })

  // Get schedules from api
  const clients = ref([])
  const clientRepo: Repository = clientRepository(axios)
  clientRepo.index({}).then((response) => {
    const options = []
    options.push({ name: t('motor-admin.clients.all'), value: null })
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    clients.value = options
  })

  const userStore = useUserStore()

  const afterSubmit = async () => {
    // FIXME: only update user if the currently logged in user was updated
    const response: AxiosResponse<any> = await axios.get('/api/me')
    localStorage.setItem('user', JSON.stringify(response.data.data))
    userStore.setUser(response.data.data)
  }

  const { getData, onSubmit } = baseForm(
    'motor-admin.users',
    'admin.motor-admin.users',
    modelRepository(axios),
    model,
    schema,
    sanitizer,
    afterSubmit
  )

  return {
    getData,
    onSubmit,
    model,
    clients,
    roles,
  }
}
