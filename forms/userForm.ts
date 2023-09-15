import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {ref, watch, onMounted, Ref} from 'vue'
import {useI18n} from 'vue-i18n'
import modelRepository from '../api/user'
import useApi from "@zrm/motor-nx-core/composables/http/api";

import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {array, InferType, number, object, string} from "yup";
import { storeToRefs } from "pinia";

export default function userForm() {
  // Load i18n module
  const {t, tm} = useI18n()

  // Validation schema post
  const postSchema = {
    client_id: number().label(t('motor-admin.clients.client')),
    name: string().min(3).required().label(t('motor-admin.users.name')),
    email: string().email().min(3).required().label(t('motor-admin.users.email')),
    password: string().min(8).required().label(t('motor-admin.users.password')),
    roles: array().nullable(),
    //permissions: array().nullable(),
    avatar: object().nullable(),
  }

  // Validation schema patch
  const patchSchema = {
    client_id: number().nullable().label(t('motor-admin.clients.client')),
    name: string().min(3).required().label(t('motor-admin.users.name')),
    email: string().email().min(3).required().label(t('motor-admin.users.email')),
    password: string().min(8).required().label(t('motor-admin.users.password')),
    roles: array().nullable(),
    //permissions: array().nullable(),
    avatar: object().nullable(),
  }

  const route = useRoute();

  const initialModelData ={
    id: null,
  }

  const initialFormData ={
    client_id: 0,
    name: 'Test',
    email: '',
    password: '',
    roles: [],
    avatar: {}
  }

  const formStore = useFormStore();
  const {model, formSchema} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);

  if (route.params.id) {
    formSchema.value = patchSchema;
  } else {
    formSchema.value = postSchema;
  }

  // Sanitize data url
  const sanitizer = async (formData: any) => {
    // Only sanitize base64 if a file was picked, otherwise it has the uuid from backend response and
    // doesn't need to be sanitized.
    if (formData.avatar && Object.keys(formData.avatar).length) {
      if (!formData.avatar.uuid) {
        const startBase64 = formData.avatar.url.indexOf(',') + 1
        formData.avatar = {
          name: formData.avatar.name,
          dataUrl: formData.avatar.url.substring(startBase64)
        }
      }
    } else {
      formData.avatar = false;
    }
  }

  const userStore = useUserStore()

  const afterSubmit = async (oldModel: Ref<Record<string, any>>, newModel: Ref<Record<string, any>>) => {
    if (userStore.user?.id === newModel.value.id) {
      const {data: response} = await useApi().get('me')
      userStore.setUser(response.value.data)
    }
  }

  const {getData, onSubmit, form} = baseForm(
    'motor-admin.users',
    'admin.motor-admin.users',
    modelRepository(),
    sanitizer,
    afterSubmit
  )

  return {
    getData,
    onSubmit,
    model,
    form,
    ...useFormData()
  }
}
