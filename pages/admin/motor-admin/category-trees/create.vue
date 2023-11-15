<template>
  <AdminCommonForm
    back-route="admin.motor-admin.category-trees"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      {{ $t('motor-admin.global.basic_information')}}
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
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import form from '@zrm/motor-nx-admin/forms/categoryTreeForm'

// Load i18n module
const { t } = useI18n()

// Load form
const { model, onSubmit } = form()

// Set default action title
const title = ref(t('motor-admin.category_trees.create'))

</script>
