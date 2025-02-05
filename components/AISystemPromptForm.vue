<template>
  <AdminCommonForm
    back-route="admin.motor-admin.ai-system-prompts"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      {{ $t('motor-admin.global.basic_information') }}
    </h6>
    <div class="row">
      <div class="col-12">
        <FormsInputField
          id="name"
          v-model="model.name"
          type="text"
          name="name"
          :label="$t('motor-admin.global.name')"
        />
        <FormsSelectField
          id="client_id"
          v-model="model.client_id"
          name="client_id"
          :label="$t('motor-admin.clients.client')"
          :options="clients"
        />
      </div>
      <FormsTextAreaField
        id="prompt"
        v-model="model.prompt"
        name="prompt"
        :label="$t('motor-admin.ai_system_prompts.prompt')"
        description="Geben Sie die Systemprompt im Textfeld ein."
      />
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import form from '@zrm/motor-nx-admin/forms/aiSystemPromptForm'
// Load i18n module
const { t } = useI18n()

// Load form
const { model, onSubmit, clients, getData, loadClients} = form()

const props = defineProps({
  edit: Boolean,
});
const title = props.edit? t('motor-admin.ai_system_prompts.edit') : t('motor-admin.ai_system_prompts.create');

if (props.edit) {
  await getData();
}
await loadClients();
</script>
