import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/configVariable'

export default function configVariableForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    package: yup.string().required(),
    group: yup.string().required(),
    name: yup.string().required(),
  })

  // Record
  const model = ref({
    id: 0,
    package: '',
    group: '',
    name: '',
    value: '',
  })

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit } = baseForm(
    'motor-backend.config_variables',
    'admin.motor-backend.config-variables',
    modelRepository(axios),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
  }
}
