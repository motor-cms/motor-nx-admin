import baseForm from 'motor-nx-core/forms/baseForm'
import {ref, watch, onMounted} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/user'
import Repository from 'motor-nx-core/types/repository'
import clientRepository from '../api/client'
import roleRepository from '../api/role'
import { useUserStore } from 'motor-nx-core/store/user'
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import useApi from "motor-nx-core/composables/http/api";
import {useAppStore} from "motor-nx-core/store/app";
import {useCoreFormData} from "~/packages/motor-nx-core/composables/form/formData";
import {useFormData} from "~/packages/motor-nx-admin/composables/formData";

export default function userForm() {
  // Load i18n module
  const {t, tm} = useI18n()

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

  const userStore = useUserStore()

  const afterSubmit = async () => {
    // FIXME: only update user if the currently logged in user was updated
    const response = await useApi().get('me')
    localStorage.setItem('user', JSON.stringify(response.data.data))
    userStore.setUser(response.data.data)
  }

  const {getData, onSubmit} = baseForm(
    'motor-admin.users',
    'admin.motor-admin.users',
    modelRepository(),
    model,
    schema,
    sanitizer,
    afterSubmit
  )

  const { getRelevantFormData } = useCoreFormData();
  const { clients, roles, loadRoles, loadClients } = useFormData()

  onMounted(async () => {
    await getRelevantFormData(getData,[
      loadClients, loadRoles
    ],[
      loadClients, loadRoles
    ]);
  })

  return {
    getData,
    onSubmit,
    model,
    clients,
    roles,
  }
}
