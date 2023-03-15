import baseForm from '@zrm/motor-nx-core/forms/baseForm'
import { ref, watch } from 'vue'
import modelRepository from '../api/category'
import categoryTreeRepository from '../api/categoryTree'
import { useRouter } from 'vue-router'
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import {useCoreFormData} from "@zrm/motor-nx-core/composables/form/formData";
import {useMediaFormData} from "@zrm/motor-nx-media/composables/formData";

export default function categoryForm() {
  const router = useRouter()
  const id: string = router.currentRoute.value.params.categoryid as string
  const categoryTreeId = router.currentRoute.value.params.categorytreeid;
  const routeCategoryTree = 'admin.motor-admin.category-trees.' + categoryTreeId  + '.categories';
  const categoryTree: string = router.currentRoute.value.params.categorytreeid as string
  const { getRelevantFormData } = useCoreFormData()
  const { treeData, getCategoryData } = useMediaFormData();

  // Validation schema
  const schema = toFormValidator(
    zod.object({
      name: zod.string().min(3),
    })
  )

  // Record
  const model = ref({
    id: 0,
    name: '',
    previous_sibling_id: null,
    next_sibling_id: null,
    parent_id: null,
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
