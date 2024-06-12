<template>
  <AdminCommonForm
    :back-route="'admin.motor-admin.permission-groups.' + route.params.permissiongroupid + '.permissions'"
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
          v-model="model.name">
        </FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          type="text"
          name="guard_name"
          id="guard_name"
          :label="$t('motor-admin.permissions.guard_name')"
          :options="['api', 'web']"
          v-model="model.guard_name"
        ></FormsSelectField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import form from '@zrm/motor-nx-admin/forms/permissionForm'

// Load i18n module
const {t} = useI18n()

// Load router
const router = useRouter()
const route = useRoute()

// Load form
const {model, onSubmit, getData} = form()

const title = ref(t('motor-admin.permissions.edit'))
await getData()
//model.value.permission_group_id = +route.params.permissiongroupid
</script>
