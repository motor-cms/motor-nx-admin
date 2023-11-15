import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import modelRepository from '../api/domains'
import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {boolean, InferType, number, object, string} from "yup";
import {storeToRefs} from "pinia";
export default function languageForm() {
  // Load i18n module
  const {t, tm} = useI18n()

  // Record
  const initialModelData = {
    id: null,
  }
  const initialFormData = {
    client_id: 0,
    is_active: true,
    name: '',
    protocol: 'https',
    host: '',
    port: 443,
    path: '',
    target: '',
    parameters: '',
  }

  const formStore = useFormStore();
  const {model, formSchema} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);
  formSchema.value = {
    client_id: number().required().label(t('motor-admin.clients.client')),
    is_active: boolean().label(t('motor-admin.domains.is_active')),
    name: string().min(3).required().label(t('motor-admin.domains.name')),
    protocol: string().min(3).required().label(t('motor-admin.domains.protocol')),
    host: string().min(3).required().label(t('motor-admin.domains.host')),
    port: number().required().label(t('motor-admin.domains.port')),
    path: string().min(1).required().label(t('motor-admin.domains.path')),
    target: string().nullable().label(t('motor-admin.domains.target')),
    parameters: string().nullable().label(t('motor-admin.domains.parameters')),
  }

  // Sanitize dates
  const sanitizer = () => {
  }

  const {getData, onSubmit} = baseForm(
    'motor-admin.domains',
    'admin.motor-admin.domains',
    modelRepository(),
    sanitizer,
  )


  return {
    getData,
    onSubmit,
    model,
    ...useFormData()
  }
}
