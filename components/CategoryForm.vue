<template>
  <AdminCommonForm
    :back-route=backRoute
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      {{ $t('motor-admin.global.basic_information')}}
    </h6>
    <div class="row">
      <div class="col-md-8">
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-admin.categories.name')"
          v-model="model.name"
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
const {model, onSubmit, treeData, replaceCategoryName, getData, getCategoryTreeData, search} = form()

const props = defineProps({
  edit: Boolean,
});

// Set default action title
const title = props.etid ? t('motor-admin.categories.edit') : t('motor-admin.categories.create');

const categoryTreeId = route.currentRoute.value.params.categorytreeid;

const backRoute: string = "admin.motor-admin.category-trees." + categoryTreeId + ".categories" as string;

const changed = (value: any) => {
  if (typeof value !== 'object') {
    replaceCategoryName(value);
    model.value.name = value;
  }
}
function addNewNodeToTree(treeRef: Ref<DraggableContent | null>){

  const tree = treeRef.value;

  if (!tree || !tree.children){
    return;
  }

  tree.children?.push({
    id: 0,
    name: t('motor-admin.categories.new_category'),
    children: [],
  })

  treeRef.value = tree;
}
await getCategoryTreeData();
if (props.edit) {
  await getData();
} else {
  model.value.parent_id = parseInt(categoryTreeId);
  addNewNodeToTree(treeData);
}


</script>
