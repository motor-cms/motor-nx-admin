<template>
  <AdminCommonForm
    back-route="admin.motor-admin.permissions"
    :title="title"
    @submit="onSubmit"
  >
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-admin.permissions.name')"
          v-model="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="guard_name"
          id="guard_name"
          :label="$t('motor-admin.permissions.sort_position')"
          v-model="model.sort_position"
        ></FormsInputField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from '@zrm/motor-nx-admin/forms/permissionGroupForm'

// Load i18n module
const { t } = useI18n()

// Load router
const router = useRouter()

// Load form
const { model, getData, onSubmit } = form()

// Set default action title
const title = ref(t('motor-admin.permissions.create'))

</script>
