<template>
  <AdminCommonForm
    back-route="admin.motor-admin.config-variables"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-4">
        <FormsInputField
          type="text"
          name="package"
          id="package"
          :label="$t('motor-admin.config_variables.package')"
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
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-nx-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-nx-core/components/forms/InputField.vue'
import FormsTextAreaField from 'motor-nx-core/components/forms/TextAreaField.vue'
import { useI18n } from 'vue-i18n'
import form from 'motor-nx-admin/forms/configVariableForm'

export default defineComponent({
  name: 'admin-motor-admin-config-variables-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsTextAreaField,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load form
    const { model, onSubmit } = form()

    // Set default action title
    const title = ref(t('motor-admin.config_variables.create'))

    return {
      model,
      title,
      onSubmit,
    }
  },
})
</script>
