import axios from 'axios'
import baseForm from 'motor-core/forms/baseForm'
import * as yup from 'yup'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '../api/category'
import categoryTreeRepository from '../api/categoryTree'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default function categoryForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  const store = useStore()

  const toast = useToast()

  const router = useRouter()

  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
  })

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
    console.log('found the thing', foundYou)
  }

  const categoryTree: string = router.currentRoute.value.params
    .category_tree as string

  const { onSubmit, getData } = baseForm(
    'motor-admin.categories',
    'admin.motor-admin.categories',
    modelRepository(axios),
    model,
    schema,
    sanitizer,
    null,
    { category_tree: categoryTree }
  )

  const replaceCategoryName = (newName: any) => {
    if (typeof newName !== 'object') {
      const element = search({}, treeData.value, model.value.id, {}, 0, false)
      element.name = newName
    }
  }

  const treeData = ref({})

  const id: string = router.currentRoute.value.params.id as string

  categoryTreeRepository(axios)
    .get(categoryTree)
    .then((response: any) => {
      if (id === undefined) {
        response.data.data.children.push({
          id: 0,
          name: 'New category',
          children: [],
        })
      }
      treeData.value = response.data.data
    })

  return {
    getData,
    onSubmit,
    model,
    treeData,
    replaceCategoryName,
  }
}
