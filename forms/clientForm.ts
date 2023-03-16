
import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/client'
import { countries } from 'countries-list'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {boolean, object, string} from "yup";

export default function clientForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = object({
    name: string().min(3),
    website: string().url(),
    is_active: boolean().nullable(),
    contact_email: string().email()
  })

  // Record
  const model = ref({
    id: 0,
    name: '',
    is_active: false,
    description: '',
    address: '',
    zip: '',
    city: '',
    country_iso_3116_1: 'DE',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    website: '',
  })

  const countryOptions = []
  for (const [key, value] of Object.entries(countries)) {
    countryOptions.push({ label: value.emoji + ' ' + value.name, value: key })
  }

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-admin.clients',
    'admin.motor-admin.clients',
    modelRepository(),
    model,
    schema,
    sanitizer
  )

  const { getRelevantFormData } = useCoreFormData();

  onMounted(async () => {
    await getRelevantFormData(getData,[
    ],[
    ]);
  })


  return {
    getData,
    onSubmit,
    model,
    countryOptions,
  }
}
