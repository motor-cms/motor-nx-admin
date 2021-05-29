import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/user'
import { useStore } from 'vuex'
import Repository from 'motor-core/types/repository'
import clientRepository from '../api/client'
import roleRepository from '../api/role'

export default function userForm() {
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
    options.push({ name: t('motor-backend.clients.all'), value: null })
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    clients.value = options
  })

  const store = useStore()

  const afterSubmit = async () => {
    // FIXME: only update user if the currently logged in user was updated
    await axios.get('/api/me').then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.data))
      store.commit('motor/setUser', response.data.data)
    })
  }

  const { getData, onSubmit } = baseForm(
    'motor-backend.users',
    'admin.motor-backend.users',
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
