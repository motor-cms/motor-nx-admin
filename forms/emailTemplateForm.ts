import baseForm from 'motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/emailTemplate'
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import {useCoreFormData} from "~/packages/motor-nx-core/composables/form/formData";
import {useFormData} from "~/packages/motor-nx-admin/composables/formData";

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

  const { getData, onSubmit } = baseForm(
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
  }
}
