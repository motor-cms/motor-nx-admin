import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/emailTemplate'
import Repository from 'motor-core/types/repository'
import languageRepository from '../api/language'
import clientRepository from '../api/client'

export default function emailTemplateForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
    client_id: yup.number().required(),
    language_id: yup.number().required(),
  })

  // Record
  const model = ref({
    id: 0,
    client_id: null,
    language_id: null,
    name: '',
    subject: '',
    default_sender_name: '',
    default_sender_email: '',
    default_recipient_name: '',
    default_recipient_email: '',
    default_cc_email: '',
    default_bcc_email: '',
    body_text: '',
    body_html: '',
  })

  // Sanitize dates
  const sanitizer = () => {}

  // Get schedules from api
  const languages = ref([])
  const languageRepo: Repository = languageRepository(axios)
  languageRepo.index({}).then((response) => {
    const options = []
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].english_name,
        value: response.data.data[i].id,
      })
    }
    languages.value = options
  })

  // Get schedules from api
  const clients = ref([])
  const clientRepo: Repository = clientRepository(axios)
  clientRepo.index({}).then((response) => {
    const options = []
    for (let i = 0; i < response.data.data.length; i++) {
      options.push({
        name: response.data.data[i].name,
        value: response.data.data[i].id,
      })
    }
    clients.value = options
  })

  const { getData, onSubmit } = baseForm(
    'motor-backend.email_templates',
    'admin.motor-backend.email-templates',
    modelRepository(axios),
    model,
    schema,
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    clients,
    languages,
  }
}
