<template>
  <AdminCommonForm
    :back-route=backRoute
    :title=title
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
import categoryForm from '@zrm/motor-nx-admin/forms/categoryForm'
import DraggableContent from '~/packages/motor-nx-core/types/draggable-content';

// Load i18n module
const {t: $t} = useI18n()

// Load router
const router = useRouter()

// Load form
const {model, treeData, onSubmit, replaceCategoryName, form, getCategoryTreeData, getData} = categoryForm()

const categoryTreeID: string = router.currentRoute.value.params.categorytreeid as string;

model.value.id = 0;
model.value.parent_id = parseInt(categoryTreeID);

// Set default action title
const title = ref($t('motor-admin.categories.create'))

const changed = (value: any) => {
  if (typeof value !== 'object') {
    replaceCategoryName(value);
    model.value.name = value;
  }
}

const categoryTreeId = router.currentRoute.value.params.categorytreeid;

const backRoute: string = "admin.motor-admin.category-trees." + categoryTreeId + ".categories" as string;

await getCategoryTreeData();

function addNewNodeToTree(treeRef: Ref<DraggableContent | null>){

  const tree = treeRef.value;

  if (!tree || !tree.children){
    return;
  }

  tree.children?.push({
    id: 0,
    name: 'New Category',
    children: [],
  })

  treeRef.value = tree;
}

addNewNodeToTree(treeData);

</script>
