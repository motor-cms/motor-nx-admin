import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import modelRepository from '../api/category'
import { useRouter } from 'vue-router'
import { useCoreFormData } from "@zrm/motor-nx-core/composables/form/formData";
import { useFormData } from "@zrm/motor-nx-admin/composables/formData";
import { InferType, number, object, string } from "yup";
import { useI18n } from "vue-i18n";
import DraggableContent from 'packages/motor-nx-core/types/draggable-content';

export default function categoryForm() {
  const router = useRouter()
  const id: string = router.currentRoute.value.params.categoryid as string
  const categoryTreeId = router.currentRoute.value.params.categorytreeid;
  const routeCategoryTree = 'admin.motor-admin.category-trees.' + categoryTreeId + '.categories';
  const categoryTree: string = categoryTreeId as string
  const { getRelevantFormData } = useCoreFormData()
  const { treeData, getCategoryData } = useFormData();
  const { t, tm } = useI18n()

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    name: string().min(3).required().label(t('motor-admin.categories.name')),
    previous_sibling_id: number().min(1).nullable(),
    next_sibling_id: number().min(1).nullable(),
    // parent_id: number().min(1).required(),
    parent_id: number().required(),
  })

  type CategoryForm = InferType<typeof schema>;

  // Record
  const model = ref<CategoryForm>({
    id: null,
    name: '',
    previous_sibling_id: null,
    next_sibling_id: null,
    parent_id: 0,
  })

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
    console.log("formdata CatForm", JSON.parse(JSON.stringify(formData)));
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
    'motor-admin.category_trees',
    routeCategoryTree,
    modelRepository(),
    model,
    schema,
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

  onMounted(async () => {
    await getRelevantFormData(getData, [
      getCategoryData
    ], [
      getCategoryData
    ]);
  })

  return {
    form,
    getData,
    onSubmit,
    model,
    treeData,
    replaceCategoryName
  }
}
