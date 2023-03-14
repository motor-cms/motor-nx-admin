<template>
  <AdminCommonForm
    back-route="admin.motor-admin.category-trees"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-12">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-admin.categories.name')"
          v-model="model.name"
        ></FormsInputField>
        <FormsInputField
          type="text"
          name="scope"
          id="scope"
          :label="$t('motor-admin.category_trees.scope')"
          v-model="model.scope"
        ></FormsInputField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import form from 'motor-nx-admin/forms/categoryTreeForm'

export default defineComponent({
  name: 'admin-motor-admin-category-trees-create',
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load form
    const { model, onSubmit } = form()

    // Set default action title
    const title = ref(t('motor-admin.category_trees.edit'))

    return {
      model,
      title,
      onSubmit,
    }
  },
})
</script>
