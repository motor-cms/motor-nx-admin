<template>
  <AdminCommonGrid
    :name="$t('motor-admin.categories.categories')"
    create-route="admin.motor-admin.categories.create"
    :create-label="$t('motor-admin.categories.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="categories"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script lang="ts">
import AdminCommonGrid from 'motor-nx-core/components/admin/common/Grid.vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditButton from 'motor-nx-core/components/admin/cell/EditButton.vue'
import DeleteButton from 'motor-nx-core/components/admin/cell/DeleteButton.vue'
import grid from 'motor-nx-admin/grids/categoryGrid'
import CellTree from 'motor-nx-core/components/admin/cell/Tree.vue'

export default defineComponent({
  name: 'admin-motor-admin.categories',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('motor-admin.categories.name'),
        prop: 'name',
        components: [{ name: 'CellTree' }],
      },
      {
        name: '',
        prop: 'actions',
        columnStyle: 'width: 200px',
        rowWrapperClass: 'justify-content-end',
        components: [
          {
            name: 'EditButton',
            options: {
              route: 'admin.motor-admin.categories.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('global.delete') } },
        ],
      },
    ])

    // Define filters for grid
    const filters = ref([{ name: 'SearchFilter', options: {} }])

    const loadComponents = <any>[
      {
        name: 'CellTree',
        object: CellTree,
      },
    ]

    // WE START THE OUTSOURCED CODE HERE
    const { rows, meta, refreshRecords, handleCellEvent } = grid()
    return {
      columns,
      filters,
      rows,
      meta,
      refreshRecords,
      loadComponents,
      handleCellEvent,
    }
  },
})
</script>
