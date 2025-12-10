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
          id="client_id"
          v-model="model.client_id"
          name="client_id"
          :label="$t('motor-admin.clients.client')"
          :options="clients"
        ></FormsSelectField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          id="language_id"
          v-model="model.language_id"
          name="language_id"
          :label="$t('motor-admin.languages.language')"
          :options="languages"
        ></FormsSelectField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="name"
          v-model="model.name"
          type="text"
          name="name"
          :label="$t('motor-admin.global.name')"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="slug"
          v-model="model.slug"
          type="text"
          name="slug"
          :label="$t('motor-admin.email_templates.slug')"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="default_sender_name"
          v-model="model.default_sender_name"
          type="text"
          name="default_sender_name"
          :label="$t('motor-admin.email_templates.default_sender_name')"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="default_sender_email"
          v-model="model.default_sender_email"
          type="text"
          name="default_sender_email"
          :label="$t('motor-admin.email_templates.default_sender_email')"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="default_recipient_name"
          v-model="model.default_recipient_name"
          type="text"
          name="default_recipient_name"
          :label="$t('motor-admin.email_templates.default_recipient_name')"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="default_recipient_email"
          v-model="model.default_recipient_email"
          type="text"
          name="default_recipient_email"
          :label="$t('motor-admin.email_templates.default_recipient_email')"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="default_cc_email"
          v-model="model.default_cc_email"
          type="text"
          name="default_cc_email"
          :label="$t('motor-admin.email_templates.default_cc_email')"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="default_bcc_email"
          v-model="model.default_bcc_email"
          type="text"
          name="default_bcc_email"
          :label="$t('motor-admin.email_templates.default_bcc_email')"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="default_replyto_name"
          v-model="model.default_replyto_name"
          type="text"
          name="default_replyto_name"
          :label="$t('motor-admin.email_templates.default_replyto_name')"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          id="default_replyto_email"
          v-model="model.default_replyto_email"
          type="text"
          name="default_replyto_email"
          :label="$t('motor-admin.email_templates.default_replyto_email')"
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsInputField
          id="subject"
          v-model="model.subject"
          type="text"
          name="subject"
          :label="$t('motor-admin.email_templates.subject')"
          description="Geben Sie {ALLE_FORMULARFELDER} im Textfeld ein, um alle Variablen eines Formulars auszugeben, die dem Template übermittelt werden."
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsTextAreaField
          id="body_text"
          v-model="model.body_text"
          name="body_text"
          :label="$t('motor-admin.email_templates.body_text')"
          description="Geben Sie {ALLE_FORMULARFELDER} im Textfeld ein, um alle Variablen eines Formulars auszugeben, die dem Template übermittelt werden."
          :min-rows="3"
          :max-rows="15"
          :auto-resize="true"
        ></FormsTextAreaField>
      </div>
      <div class="col-md-12">
        <FormsCheckboxField
          id="has_body_html"
          v-model="model.has_body_html"
          name="has_body_html"
          :label="$t('motor-admin.email_templates.has_body_html')"
        ></FormsCheckboxField>
      </div>
      <div class="col-md-12">
        <FormsTextAreaField
          v-if="model.has_body_html"
          id="body_html"
          v-model="model.body_html"
          name="body_html"
          :label="$t('motor-admin.email_templates.body_html')"
          description="Geben Sie {ALLE_FORMULARFELDER} im Textfeld ein, um alle Variablen eines Formulars auszugeben, die dem Template übermittelt werden."
          :min-rows="3"
          :max-rows="15"
          :auto-resize="true"
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

const props = defineProps({
  edit: Boolean,
});
// Set default action title
const title = props.edit ? t("motor-admin.email_templates.edit"): t("motor-admin.email_templates.create");

if (props.edit) {
  await getData();
}
await loadClients();
await loadLanguages();
</script>
