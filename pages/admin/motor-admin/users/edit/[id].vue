<template>
    <AdminCommonForm
      back-route="admin.motor-admin.users"
      :title="title"
      @submit="onSubmit"
    >
      <h6 class="text-uppercase text-body text-xs font-weight-bolder">
        Basic information
      </h6>
      <div class="row">
        <div class="col-md-12">
          <FormsSelectField
            name="client_id"
            id="client_id"
            :label="$t('motor-admin.clients.client')"
            :options="clients"
            v-model="model.client_id"
          ></FormsSelectField>
          <FormsInputField
            type="text"
            name="name"
            id="name"
            :label="$t('motor-admin.users.name')"
            v-model="model.name"
          ></FormsInputField>
          <FormsFileUploadField
            name="avatar"
            id="avatar"
            :label="$t('motor-admin.users.avatar')"
            v-model="model.avatar"
          ></FormsFileUploadField>
          <FormsCheckboxArrayField
            name="roles"
            id="roles"
            :label="$t('motor-admin.roles.roles')"
            v-model="model.roles"
            :options="roles"
          ></FormsCheckboxArrayField>
        </div>
      </div>
    </AdminCommonForm>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import form from '@zrm/motor-nx-admin/forms/userForm'
// Load i18n module
const { t } = useI18n()

// Load form
const { model, onSubmit, clients, roles } = form()

// Set default action title
const title = ref(t('motor-admin.users.edit'))

// Sanitize roles
watch(model, () => {
  const checkAgainst = Object.entries(model.value.roles)

  const options = []
  for (const object of checkAgainst) {
    const checkObject: any = object
    if (checkObject[1]) {
      options.push(checkObject[1]['id'])
    }
  }

  model.value.roles = options
})
</script>
