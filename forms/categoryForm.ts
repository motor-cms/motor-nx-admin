import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { ref } from 'vue'
import modelRepository from '../api/category'
import { useRouter } from 'vue-router'
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {useFormData} from "@zrm/motor-nx-admin/composables/formData";
import {InferType, number, object, string} from "yup";

export default function categoryForm() {
  const router = useRouter()
  const id: string = router.currentRoute.value.params.categoryid as string
  const categoryTreeId = router.currentRoute.value.params.categorytreeid;
  const routeCategoryTree = 'admin.motor-admin.category-trees.' + categoryTreeId  + '.categories';
  const categoryTree: string = router.currentRoute.value.params.categorytreeid as string
  const { getRelevantFormData } = useCoreFormData()
  const { treeData, getCategoryData } = useFormData();

  // Validation schema
  const schema = object({
    id: number().min(1).nullable(),
    name: string().min(3).required(),
    previous_sibling_id: number().min(1).nullable(),
    next_sibling_id: number().min(1).nullable(),
    parent_id: number().min(1).required(),
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
    tree: any,
    id: number,
    parent: any,
    index: number,
    replace: boolean = false
  ): any => {
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
  }

  const { onSubmit, getData } = baseForm(
    'motor-admin.category_trees',
    routeCategoryTree,
    modelRepository(),
    model,
    schema,
    sanitizer,
    () => {},
    { category_tree: categoryTree }
  )

  const replaceCategoryName = (newName: any) => {
    if (typeof newName !== 'object') {
      const element = search({}, treeData.value, model.value.id, {}, 0, false)
      element.name = newName
    }
  }

  onMounted(async () => {
    await getRelevantFormData(getData,[
    ],[
      getCategoryData
    ]);
  })

  return {
    getData,
    onSubmit,
    model,
    treeData,
    replaceCategoryName,
  }
}
