import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import modelRepository from '../api/category'
import { useRouter } from 'vue-router'
import { useFormData } from "@zrm/motor-nx-admin/composables/formData";
import { string } from "yup";
import { useI18n } from "vue-i18n";
import type DraggableContent from "@zrm/motor-nx-core/types/draggable-content";
import { storeToRefs } from "pinia";
import { useFormStore } from '@zrm/motor-nx-core/stores/form';

export default function categoryForm() {
  const router = useRouter()
  const id: string = router.currentRoute.value.params.categoryid as string
  const categoryTreeId = router.currentRoute.value.params.categorytreeid;
  const routeCategoryTree = 'admin.motor-admin.category-trees.' + categoryTreeId + '.categories';
  const categoryTree: string = categoryTreeId as string;
  const { t, tm } = useI18n()
  const formData = useFormData();
  const { treeData } = formData;

  // Record
  const initialModelData = {
    id: null,
    previous_sibling_id: null,
    next_sibling_id: null,
    parent_id: 0,
  }

  const initialFormData = {
    name: '',
  }

  const formStore = useFormStore();
  const { model, formSchema } = storeToRefs(formStore);
  formStore.init(initialModelData, initialFormData);

  formSchema.value = {
    name: string().min(3).required().label(t('motor-admin.categories.name')),
  }

  const search = (
    formData: any,
    tree: DraggableContent | null,
    id: number | null | undefined,
    parent: any,
    index: number,
    replace: boolean = false
  ): any => {

    if (!tree) {
      return;
    }

    if (tree.id === id) {
      if (replace) {
        // Get parent
        formData.parent_id = parent.id
        // Get previous sibling
        if (index > 0) {
          formData.previous_sibling_id = parent.children[index - 1].id
          // console.log('found previous_sibling', parent.children[index - 1])
        }
        // Get next sibling
        if (index < parent.children.length - 1) {
          formData.next_sibling_id = parent.children[index + 1].id
        }
      }
      return tree
    }

    if (!tree.children) {
      return tree;
    }

    for (const { index, child } of tree.children.map(
      (child: any, index: number) => ({ index, child })
    )) {
      const res = search(formData, child, id, tree, index, replace)

      if (res) {
        return res
      }
    }
  }

  // Sanitize dates
  const sanitizer = (formData: any) => {
    const foundYou = search(
      formData,
      treeData.value,
      model.value.id,
      {},
      0,
      true
    )
    console.log('found the thing CatForm', foundYou)
  }

  const { onSubmit, getData, form, fillModel } = baseForm(
    'motor-admin.categories',
    routeCategoryTree,
    modelRepository(),
    sanitizer,
    () => { },
    { category_tree: categoryTree }
  )

  const replaceCategoryName = (newName: any) => {
    if (typeof newName !== 'object') {
      const element = search({}, treeData.value, model.value.id, {}, 0, false)

      if (element) {
        element.name = newName
      }
    }
  }

  return {
    form,
    getData,
    onSubmit,
    model,
    replaceCategoryName,
    search,
    ...formData
  }
}
