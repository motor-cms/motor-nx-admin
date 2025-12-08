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
          id="name"
          v-model="model.name"
          type="text"
          name="name"
          :label="$t('motor-admin.categories.name')"
        ></FormsInputField>
        <FormsInputField
          id="scope"
          v-model="model.scope"
          type="text"
          name="scope"
          :label="$t('motor-admin.category_trees.scope')"
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

const props = defineProps({
  edit: Boolean,
});

// Load form
const { model, onSubmit, getData } = form()

// Set default action title
const title = props.edit? t('motor-admin.category_trees.edit') : t('motor-admin.category_trees.create');

if (props.edit) {
  await getData();
}
</script>
