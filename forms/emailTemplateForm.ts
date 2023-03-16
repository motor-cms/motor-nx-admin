import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/emailTemplate'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {useAdminFormData} from "@zrm/motor-nx-admin/composables/formData";
import {number, object, string} from "yup";

export default function emailTemplateForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  // Validation schema
  const schema = object({
    name: string().min(3),
    client_id: number().min(1),
    language_id: number().min(1),
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

  const { getData, onSubmit } = baseForm(
    'motor-admin.email_templates',
    'admin.motor-admin.email-templates',
    modelRepository(),
    model,
    schema,
    sanitizer
  )

  const { getRelevantFormData } = useCoreFormData();
  const { clients, languages, loadLanguages, loadClients } = useAdminFormData()

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
  }
}
