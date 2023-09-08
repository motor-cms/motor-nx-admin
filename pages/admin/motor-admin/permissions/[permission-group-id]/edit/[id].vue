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
import usePermissionGroupAPI from "~/packages/motor-nx-admin/api/permissionGroup";
import permissionGroupAPI from "~/packages/motor-nx-admin/api/permissionGroup";

// Load i18n module
const {t} = useI18n()

const itemName = ref("")

// Load router
const router = useRouter()
const route = useRoute()

// Load form
const {model, onSubmit, getData} = form()

const prefix = ref('')


// TODO: Loic was passiert hier?
// watch(itemName, (itemNameValue) => {
//   if(model.value.name.indexOf('.') > -1 && !itemName.value){
//     itemName.value = model.value.name.slice(model.value.name.indexOf('.') + 1, model.value.name.length)
//   }
//   model.value.name = prefix.value + itemName.value
// })

// Set default action title
const title = ref(t('motor-admin.permissions.edit'))
await getData()
model.value.permission_group_id = +route.params.permissiongroupid
// const {data: permission} = await usePermissionGroupAPI().get(model.value.permission_group_id)
// prefix.value = permission.value.data.name + '.';


</script>
