<template>
  <AdminCommonForm
    back-route="admin.motor-admin.languages"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="native_name"
          id="native_name"
          :label="$t('motor-admin.languages.native_name')"
          v-model="model.native_name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="english_name"
          id="english_name"
          :label="$t('motor-admin.languages.english_name')"
          v-model="model.english_name"
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsSelect2Field
          name="iso_639_1"
          id="iso_639_1"
          :label="$t('motor-admin.languages.iso_639_1')"
          v-model="model.iso_639_1"
          :options="languageOptions"
        ></FormsSelect2Field>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-nx-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-nx-core/components/forms/InputField.vue'
import FormsSelect2Field from 'motor-nx-core/components/forms/Select2Field.vue'
import { useI18n } from 'vue-i18n'
import form from 'motor-nx-admin/forms/languageForm'

export default defineComponent({
  name: 'admin-motor-admin-languages-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsSelect2Field,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load form
    const { model, onSubmit, languageOptions } = form()

    // Set default action title
    const title = ref(t('motor-admin.languages.edit'))

    return {
      model,
      title,
      languageOptions,
      onSubmit
    }
  },
})
</script>
