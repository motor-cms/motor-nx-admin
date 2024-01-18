import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/emailTemplate'

import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {InferType, number, object, string} from "yup";
import {useForm} from "vee-validate";
import {storeToRefs} from "pinia";
export default function emailTemplateForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  type EmailTemplateForm = InferType<typeof schema>;

  // Record
  const initialModelData = {
    id: null,
  }

  const initialFormData = {
    client_id: 0,
    language_id: 0,
    name: '',
    slug: '',
    subject: '',
    body_text: '',
    body_html: '',
    default_sender_name: '',
    default_sender_email: '',
    default_recipient_name: '',
    default_recipient_email: '',
    default_cc_email: '',
    default_bcc_email: '',
    default_replyto_name: '',
    default_replyto_email: ''
  }

  const formStore = useFormStore();
  const {model, formSchema} = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);
  formSchema.value = {
    client_id: number().label(t('motor-admin.clients.client')),
    language_id: number().min(1).required().label(t('motor-admin.languages.language')),
    name: string().min(3).required().label(t('motor-admin.email_templates.name')),
    slug: string().nullable().label(t('motor-admin.email_templates.name')),
    subject: string().min(3).required().label(t('motor-admin.email_templates.subject')),
    body_text: string().min(3).nullable().label(t('motor-admin.email_templates.body_text')),
    body_html: string().min(3).nullable().label(t('motor-admin.email_templates.body_html')),
    default_sender_name: string().min(3).label(t('motor-admin.email_templates.default_sender_name')),
    default_sender_email: string().email().label(t('motor-admin.email_templates.default_sender_email')),
    default_recipient_name: string().min(3).label(t('motor-admin.email_templates.default_recipient_name')),
    default_recipient_email: string().email().label(t('motor-admin.email_templates.default_recipient_email')),
    default_cc_email: string().email().nullable().label(t('motor-admin.email_templates.default_cc_email')),
    default_bcc_email: string().email().nullable().label(t('motor-admin.email_templates.default_bcc_email')),
    default_replyto_name: string().nullable().label(t('motor-admin.email_templates.default_replyto_name')),
    default_replyto_email: string().email().nullable().label(t('motor-admin.email_templates.default_replyto_email')),
  }

  // Sanitize dates
  const sanitizer = () => {}

  const { getData, onSubmit, form } = baseForm(
    'motor-admin.email_templates',
    'admin.motor-admin.email-templates',
    modelRepository(),
    sanitizer
  )

  return {
    getData,
    onSubmit,
    model,
    form,
    ...useFormData()
  }
}
