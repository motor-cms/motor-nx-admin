import axios from 'axios'
import modelRepository from '../api/category'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

export default function categoryGrid() {
  const repository = modelRepository(axios)

  const router = useRouter()

  const toast = useToast()

  const { t } = useI18n()

  const rows = ref([])
  const meta = ref({ current_page: 1, from: 1, to: 1 })

  const refreshRecords = async (params: {}) => {
    const category_tree: string = router.currentRoute.value.params
      .category_tree as string
    if (category_tree) {
      // Show spinner
      // store.commit('motor/setSpinner', true)
      await repository.index(params, category_tree).then((result) => {
        rows.value = result.data.data
        meta.value = result.data.meta
      })
      // Show spinner
      // store.commit('motor/setSpinner', false)
    }
  }

  refreshRecords({})

  const handleCellEvent = async (params: {
    filterValues: any
    componentParams: any
  }) => {
    switch (params.componentParams.component) {
      case 'DeleteButton':
        // Delete the record
        await repository.delete(params.componentParams.record)

        toast.success(t('motor-admin.category_trees.deleted'))

        await refreshRecords(params.filterValues)
        break
      default:
        console.log('UNHANDLED EVENT', params.componentParams)
    }
  }
  return { rows, meta, refreshRecords, handleCellEvent }
}
