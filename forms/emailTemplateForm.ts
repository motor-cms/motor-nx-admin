import axios from 'axios'
import baseForm from 'motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/emailTemplate'
import Repository from 'motor-nx-core/types/repository'
import languageRepository from '../api/language'
import clientRepository from '../api/client'
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';

export default function emailTemplateForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = toFormValidator(
      zod.object({
        name: zod.string().min(3),
        client_id: zod.number().min(1),
        language_id: zod.number().min(1),
      })
  )

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
    'motor-admin.email_templates',
    'admin.motor-admin.email-templates',
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
