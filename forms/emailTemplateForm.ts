import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/emailTemplate'

import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {boolean, InferType, number, string, addMethod, transform} from "yup";
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
    client_id: null,
    language_id: null,
    name: '',
    slug: '',
    subject: '',
    body_text: '',
    body_html: '',
    has_body_html: false,
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
    client_id: number().required().label(t('motor-admin.clients.client')),
    language_id: number().required().label(t('motor-admin.languages.language')),
    name: string().min(3).required().label(t('motor-admin.email_templates.name')),
    slug: string().nullable().label(t('motor-admin.email_templates.name')),
    subject: string().min(3).required().label(t('motor-admin.email_templates.subject')),
    body_text: string().min(3).nullable().label(t('motor-admin.email_templates.body_text')),
    has_body_html: boolean().label(t('motor-admin.email_templates.has_body_html')),
    body_html: string().when("has_body_html", {is: true, then: (s) => s.required()}).label(t('motor-admin.email_templates.body_html')),
    default_sender_name: string().min(3).label(t('motor-admin.email_templates.default_sender_name')),
    default_sender_email: string().email().label(t('motor-admin.email_templates.default_sender_email')),
    default_recipient_name: string().nullable().label(t('motor-admin.email_templates.default_recipient_name')),
    default_recipient_email: string().email().nullable().label(t('motor-admin.email_templates.default_recipient_email')),
    default_cc_email: string().nullable().label(t('motor-admin.email_templates.default_cc_email')),
    default_bcc_email: string().nullable().label(t('motor-admin.email_templates.default_bcc_email')),
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
