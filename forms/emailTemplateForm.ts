import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/emailTemplate'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {InferType, number, object, string} from "yup";

export default function emailTemplateForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    client_id: number().label(t('motor-admin.clients.client')),
    language_id: number().min(1).required().label(t('motor-admin.languages.language')),
    name: string().min(3).required().label(t('motor-admin.email_templates.name')),
    subject: string().min(3).required().label(t('motor-admin.email_templates.subject')),
    body_text: string().min(3).nullable(),
    body_html: string().min(3).nullable(),
    default_sender_name: string().min(3).nullable(),
    default_sender_email: string().min(3).nullable(),
    default_recipient_name: string().min(3).nullable(),
    default_recipient_email: string().min(3).nullable(),
    default_cc_email: string().min(3).nullable(),
    default_bcc_email: string().min(3).nullable(),
  })

  type EmailTemplateForm = InferType<typeof schema>;

  // Record
  const model = ref<EmailTemplateForm>({
    id: null,
    client_id: 0,
    language_id: 0,
    name: '',
    subject: '',
    body_text: '',
    body_html: '',
    default_sender_name: '',
    default_sender_email: '',
    default_recipient_name: '',
    default_recipient_email: '',
    default_cc_email: '',
    default_bcc_email: '',
  })

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit, form } = baseForm(
    'motor-admin.email_templates',
    'admin.motor-admin.email-templates',
    modelRepository(),
    model,
    schema,
    sanitizer
  )

  const { getRelevantFormData } = useCoreFormData();
  const { clients, languages, loadLanguages, loadClients } = useFormData()

  onMounted(async () => {
    await getRelevantFormData(getData,[
      loadClients, loadLanguages
    ],[
      loadClients, loadLanguages
    ]);
  })


  return {
    getData,
    onSubmit,
    model,
    clients,
    languages,
    form
  }
}
