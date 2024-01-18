<template>
  <AdminCommonForm
    back-route="admin.motor-admin.email-templates"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      {{ $t("motor-admin.global.basic_information") }}
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsSelectField
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
      <div class="col-md-6">
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
          name="slug"
          id="slug"
          :label="$t('motor-admin.email_templates.slug')"
          v-model="model.slug"
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
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="default_replyto_name"
          id="default_replyto_name"
          :label="$t('motor-admin.email_templates.default_replyto_name')"
          v-model="model.default_replyto_name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="default_replyto_email"
          id="default_replyto_email"
          :label="$t('motor-admin.email_templates.default_replyto_email')"
          v-model="model.default_replyto_email"
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsInputField
          type="text"
          name="subject"
          id="subject"
          :label="$t('motor-admin.email_templates.subject')"
          v-model="model.subject"
        ></FormsInputField>
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
          :description="$t('motor-admin.email_templates.body_html_hint')"
          :label="$t('motor-admin.email_templates.body_html')"
          v-model="model.body_html"
        ></FormsTextAreaField>
      </div>
    </div>
  </AdminCommonForm>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import emailTemplateForm from "@zrm/motor-nx-admin/forms/emailTemplateForm";

// Load i18n module
const { t } = useI18n();
const { userHasClient } = storeToRefs(useUserStore());

// Load form
const {
  model,
  onSubmit,
  languages,
  clients,
  form,
  loadLanguages,
  loadClients,
  getData,
} = emailTemplateForm();

// Set default action title
const title = ref(t("motor-admin.email_templates.edit"));

await getData();
await loadClients();
await loadLanguages();
</script>
