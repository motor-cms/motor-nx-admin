<template>
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
          v-model="model.name">
<!--          v-model="itemName"-->
        </FormsInputField>
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
      <FormsHiddenInputField
        name="permission_group_id"
        id="permission_group_id"
        v-model="model.permission_group_id"
      ></FormsHiddenInputField>
      <FormsHiddenInputField
        name="name"
        id="name"
        v-model="model.name"
      ></FormsHiddenInputField>
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
model.value.permission_group_id = +route.params.permissiongroupid
</script>
