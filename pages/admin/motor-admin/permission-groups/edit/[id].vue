<template>
  <AdminCommonForm
    back-route="admin.motor-admin.permission-groups"
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
          name="sort_position"
          id="sort_position"
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
const { model, onSubmit, getData } = form()

// Set default action title
const title = ref(t('motor-admin.permission_groups.edit'))

await getData();
</script>
