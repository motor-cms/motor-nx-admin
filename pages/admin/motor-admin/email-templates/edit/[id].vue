<template>
  <AdminCommonForm
    back-route="admin.motor-admin.email-templates"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsSelectField
          v-show="!userHasClient"
          name="client_id"
          id="client_id"
          :label="$t('motor-admin.clients.client')"
          :options="clients"
          v-model="model.client_id"
        ></FormsSelectField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          name="language_id"
          id="language_id"
          :label="$t('motor-admin.languages.language')"
          :options="languages"
          v-model="model.language_id"
        ></FormsSelectField>
      </div>
      <div class="col-md-12">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-admin.global.name')"
          v-model="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="default_sender_name"
          id="default_sender_name"
          :label="$t('motor-admin.email_templates.default_sender_name')"
          v-model="model.default_sender_name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="default_sender_email"
          id="default_sender_email"
          :label="$t('motor-admin.email_templates.default_sender_email')"
          v-model="model.default_sender_email"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="default_recipient_name"
          id="default_recipient_name"
          :label="$t('motor-admin.email_templates.default_recipient_name')"
          v-model="model.default_recipient_name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="default_recipient_email"
          id="default_recipient_email"
          :label="$t('motor-admin.email_templates.default_recipient_email')"
          v-model="model.default_recipient_email"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="default_cc_email"
          id="default_cc_email"
          :label="$t('motor-admin.email_templates.default_cc_email')"
          v-model="model.default_cc_email"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="default_bcc_email"
          id="default_bcc_email"
          :label="$t('motor-admin.email_templates.default_bcc_email')"
          v-model="model.default_bcc_email"
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsTextAreaField
          name="subject"
          id="subject"
          :label="$t('motor-admin.email_templates.subject')"
          v-model="model.subject"
        ></FormsTextAreaField>
      </div>
      <div class="col-md-12">
        <FormsTextAreaField
          name="body_text"
          id="body_text"
          :label="$t('motor-admin.email_templates.body_text')"
          v-model="model.body_text"
        ></FormsTextAreaField>
      </div>
      <div class="col-md-12">
        <FormsTextAreaField
          name="body_html"
          id="body_html"
          :label="$t('motor-admin.email_templates.body_html')"
          v-model="model.body_html"
        ></FormsTextAreaField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import form from '@zrm/motor-nx-admin/forms/emailTemplateForm'
import {storeToRefs} from "pinia";


// Load i18n module
const { t } = useI18n()
const { userHasClient } = storeToRefs(useUserStore());

// Load form
const { model, onSubmit, languages, clients } = form()

// Set default action title
const title = ref(t('motor-admin.email_templates.edit'))

</script>
