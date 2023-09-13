<template>
  <AdminCommonForm
    :back-route=backRoute
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      Basic information
    </h6>
    <div class="row">
      <div class="col-md-8">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-admin.categories.name')"
          :value="model.name"
          @change="changed"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <AdminCommonNestedTree :tree="treeData?.children" :record="model.id"/>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import form from '@zrm/motor-nx-admin/forms/categoryForm'

// Load i18n module
const {t} = useI18n()
// Load router
const route = useRouter()
// Load form
const {model, onSubmit, treeData, replaceCategoryName, getData, getCategoryTreeData, getCategoryTreeRootData} = form()

// Set default action title
const title = ref(t('motor-admin.categories.edit'))

const categoryTreeId = route.currentRoute.value.params.categorytreeid;

const backRoute: string = "admin.motor-admin.category-trees." + categoryTreeId + ".categories" as string;

const changed = (value: any) => {
  replaceCategoryName(value)
}

await getCategoryTreeData();
await getCategoryTreeRootData();
await getData();

</script>
