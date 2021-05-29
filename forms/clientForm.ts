import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/client'
import { countries } from 'countries-list'

export default function clientForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
    website: yup.string().url(),
    is_active: yup.boolean().nullable(),
    contact_email: yup.string().email(),
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
    'motor-backend.clients',
    'admin.motor-backend.clients',
    modelRepository(axios),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    countryOptions,
  }
}
