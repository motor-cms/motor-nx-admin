<template>
  <AdminCommonForm
    :back-route="'admin.motor-admin.permission-groups.' + route.params.permissiongroupid + '.permissions'"
    :title="title"
    @submit="onSubmit"
  >
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          id="name"
          v-model="model.name"
          type="text"
          name="name"
          :label="$t('motor-admin.permissions.name')">
        </FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsSelectField
          id="guard_name"
          v-model="model.guard_name"
          type="text"
          name="guard_name"
          :label="$t('motor-admin.permissions.guard_name')"
          :options="['api', 'web']"
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

const props = defineProps({
  edit: Boolean,
});

const title = props.edit ? t('motor-admin.permissions.edit') : t('motor-admin.permissions.create');
if (props.edit) {
  await getData();
} else {
  model.value.permission_group_id = +route.params.permissiongroupid
}
</script>
