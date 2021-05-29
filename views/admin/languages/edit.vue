<template>
  <AdminCommonForm
    back-route="admin.motor-backend.languages"
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
          :label="$t('motor-backend.languages.native_name')"
          :value="model.native_name"
        ></FormsInputField>
      </div>
      <div class="col-md-6">
        <FormsInputField
          type="text"
          name="english_name"
          id="english_name"
          :label="$t('motor-backend.languages.english_name')"
          :value="model.english_name"
        ></FormsInputField>
      </div>
      <div class="col-md-12">
        <FormsSelect2Field
          type="text"
          name="iso_639_1"
          id="iso_639_1"
          :label="$t('motor-backend.languages.iso_639_1')"
          :value="model.iso_639_1"
          :options="languageOptions"
        ></FormsSelect2Field>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-core/components/forms/InputField.vue'
import FormsSelect2Field from 'motor-core/components/forms/Select2Field.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from 'motor-backend/forms/languageForm'

export default defineComponent({
  name: 'admin-motor-backend-languages-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    FormsSelect2Field,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit, languageOptions } = form()

    // Set default action title
    const title = ref(t('motor-backend.languages.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('motor-backend.languages.edit')
      getData(id)
    }

    return {
      model,
      title,
      onSubmit,
      languageOptions,
    }
  },
})
</script>
