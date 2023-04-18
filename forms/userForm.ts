import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {ref, watch, onMounted} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/user'
import { useUserStore } from '@zrm/motor-nx-core/store/user'
import useApi from "@zrm/motor-nx-core/composables/http/api";
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {array, InferType, number, object, string} from "yup";

export default function userForm() {
  // Load i18n module
  const {t, tm} = useI18n()

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    client_id: number().min(1).nullable(),
    name: string().min(3).required(),
    email: string().email().min(3).required(),
    //password: string().nullable(),
    roles: array().nullable(),
    //permissions: array().nullable(),
    avatar: array().nullable(),
  })

  type UserForm = InferType<typeof schema>;

  // Record
  const model = ref<UserForm>({
    id: null,
    client_id: 0,
    name: '',
    email: '',
    //password: '',
    roles: [],
    //permissions: [],
    avatar: []
  })

  // Sanitize data url
  const sanitizer = async (formData: any) => {
    formData.avatar = formData.avatar[0];
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
