import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/language'
import { languages } from 'countries-list'

export default function languageForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    native_name: yup.string().required(),
    english_name: yup.string().required(),
    iso_639_1: yup.string().required(),
  })

  // Record
  const model = ref({
    id: 0,
    native_name: '',
    english_name: '',
    iso_639_1: '',
  })

  // Sanitize dates
  const sanitizer = () => {}

  const languageOptions = []
  for (const [key, value] of Object.entries(languages)) {
    languageOptions.push({ label: value.name, value: key })
  }

  const { getData, onSubmit } = baseForm(
    'motor-admin.languages',
    'admin.motor-admin.languages',
    modelRepository(axios),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    languageOptions,
  }
}
