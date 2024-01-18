
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/client'
import * as countrylist from 'countries-list'
const {countries} = countrylist;
import {boolean, string} from "yup";
import { storeToRefs } from "pinia";
export default function clientForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Record
  const initialModelData = {
    id: null,
  }
  const initialFormData = {
    name: '',
    slug: '',
    address: '',
    zip: '',
    city: '',
    country_iso_3166_1: 'DE',
    website: '',
    description: '',
    is_active: false,
    contact_name: '',
    contact_email: '',
    contact_phone: '',
  }

  const formStore = useFormStore();
  const {model, formSchema} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);
  formSchema.value = {
    name: string().min(3).required().label(t('motor-admin.clients.name')),
    slug: string().nullable(),
    address: string().min(3).nullable().label(t('motor-admin.clients.address')),
    zip: string().min(5).nullable().label(t('motor-admin.clients.zip')),
    city: string().min(3).nullable().label(t('motor-admin.clients.city')),
    country_iso_3166_1: string().min(2).max(2).nullable().label(t('motor-admin.clients.country_iso_3116_1')),
    website: string().url().nullable().label(t('motor-admin.clients.city')),
    description: string().nullable().label(t('motor-admin.clients.description')),
    is_active: boolean().nullable().label(t('motor-admin.clients.is_active')),
    contact_name: string().nullable().label(t('motor-admin.clients.contact_name')),
    contact_email: string().email().label(t('motor-admin.clients.contact_email')),
    contact_phone: string().nullable().label(t('motor-admin.clients.contact_phone')),
  }

  const countryOptions = []
  for (const [key, value] of Object.entries(countries)) {
    countryOptions.push({ label: value.emoji + ' ' + value.native + ' ('+value.name+')', value: key })
  }

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.clients',
    'admin.motor-admin.clients',
    modelRepository(),
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    countryOptions,
  }
}
