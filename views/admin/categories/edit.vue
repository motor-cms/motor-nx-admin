<template>
  <AdminCommonForm
    back-route="admin.motor-backend.categories"
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
          :label="$t('motor-backend.categories.name')"
          :value="model.name"
          @change="changed"
        ></FormsInputField>
      </div>
      <div class="col-md-4">
        <NestedTree :tree="treeData.children" :record="model.id" />
      </div>
    </div>
  </AdminCommonForm>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminCommonForm from 'motor-core/components/admin/common/Form.vue'
import FormsInputField from 'motor-core/components/forms/InputField.vue'
// import Tree from '@/components/admin/common/Tree.vue'
import NestedTree from 'motor-core/components/admin/common/NestedTree.vue'

import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import form from 'motor-backend/forms/categoryForm'

export default defineComponent({
  name: 'admin-motor-backend-categories-create',
  components: {
    AdminCommonForm,
    FormsInputField,
    // Tree,
    NestedTree,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Load router
    const router = useRouter()

    // Load form
    const { model, getData, onSubmit, treeData, replaceCategoryName } = form()

    // Set default action title
    const title = ref(t('motor-backend.categories.new'))

    // Get id from route and load record
    const id: string = router.currentRoute.value.params.id as string
    if (id) {
      title.value = t('motor-backend.categories.edit')
      getData(id)
    }

    const changed = (value: any) => {
      replaceCategoryName(value)
    }

    return {
      model,
      title,
      onSubmit,
      treeData,
      changed,
    }
  },
})
</script>
