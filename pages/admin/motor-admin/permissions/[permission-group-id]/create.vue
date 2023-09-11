<template>
  {{model}}
  <AdminCommonForm
    :back-route="'admin.motor-admin.permissions.' + route.params.permissiongroupid"
    :title="title"
    @submit="onSubmit"
  >
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="itemName"
          id="itemName"
          :label="$t('motor-admin.permissions.name')"
          v-model="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="guard_name"
          id="guard_name"
          :label="$t('motor-admin.permissions.guard_name')"
          v-model="model.guard_name"
        ></FormsInputField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">

import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import permissionForm from '@zrm/motor-nx-admin/forms/permissionForm'


import usePermissionGroupAPI from "@zrm/motor-nx-admin/api/permissionGroup";

const appStore = useAppStore();

// Load i18n module
const { t } = useI18n()

// Load router
const router = useRouter()
const route = useRoute()

const name = ref(null)

// Load form
const { model, onSubmit, form, getData } = permissionForm()

const prefix = ref('')

// Set default action title
const title = ref(t('motor-admin.permissions.create'))

await getData();
model.value.permission_group_id = route.params.permissiongroupid

</script>
