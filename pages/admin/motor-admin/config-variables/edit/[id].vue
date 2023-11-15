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
          type="text"
          name="package"
          id="package"
          :label="$t('motor-admin.config_variables.config_package')"
          v-model="model.package"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <FormsInputField
          type="text"
          name="group"
          id="group"
          :label="$t('motor-admin.config_variables.group')"
          v-model="model.group"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-admin.config_variables.name')"
          v-model="model.name"
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsTextAreaField
          type="text"
          name="value"
          id="value"
          :label="$t('motor-admin.config_variables.value')"
          v-model="model.value"
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

// Load form
const {model, onSubmit, getData} = form()

// Set default action title
const title = ref(t('motor-admin.config_variables.edit'))

await getData();
</script>
