<template>
  <AdminCommonForm
    back-route="admin.motor-admin.config-variables"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      {{ $t('motor-admin.global.basic_information')}}
    </h6>
    <div class="row">
      <div class="col-md-4">
        <FormsInputField
          id="package"
          v-model="model.package"
          type="text"
          name="package"
          :label="$t('motor-admin.config_variables.config_package')"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <FormsInputField
          id="group"
          v-model="model.group"
          type="text"
          name="group"
          :label="$t('motor-admin.config_variables.group')"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <FormsInputField
          id="name"
          v-model="model.name"
          type="text"
          name="name"
          :label="$t('motor-admin.config_variables.name')"
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsTextAreaField
          id="value"
          v-model="model.value"
          type="text"
          name="value"
          :label="$t('motor-admin.config_variables.value')"
        ></FormsTextAreaField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import form from '@zrm/motor-nx-admin/forms/configVariableForm'

// Load i18n module
const {t} = useI18n()

const props = defineProps({
  edit: Boolean,
});

// Load form
const {model, onSubmit, getData} = form()

// Set default action title
const title = props.edit ? t('motor-admin.config_variables.edit') : t('motor-admin.config_variables.create');

if (props.edit) {
  await getData();
}
</script>
