<template>
  <AdminCommonGrid
    :name="$t('motor-admin.category_trees.category_trees')"
    create-route="admin.motor-admin.category-trees.create"
    :create-label="$t('motor-admin.category_trees.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="categoryTrees"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import grid from 'motor-nx-admin/grids/categoryTreeGrid'
import EditButton from 'motor-nx-core/components/admin/cell/EditButton.vue'
import DeleteButton from 'motor-nx-core/components/admin/cell/DeleteButton.vue'
import Button from 'motor-nx-core/components/admin/cell/Button.vue'

export default defineComponent({
  name: 'admin-motor-admin.category-trees',
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('motor-admin.categories.name'),
        prop: 'name',
      },
      {
        name: '',
        prop: 'actions',
        columnStyle: 'width: 300px',
        rowWrapperClass: 'justify-content-end',
        components: [
          {
            name: 'Button',
            options: {
              route: 'admin.motor-admin.category-trees',
              name: t('motor-admin.category_trees.show_nodes'),
              property: 'categories'
            },
          },
          {
            name: 'EditButton',
            options: {
              route: 'admin.motor-admin.category-trees.edit',
              name: t('global.edit'),
            },
          },
          { name: 'DeleteButton', options: { name: t('motor-admin.global.delete') } },
        ],
      },
    ])

    // Define filters for grid
    const filters = ref([{ name: 'SearchFilter', options: {} }])

    const loadComponents = <any>[
      {
        name: 'Button',
        object: Button,
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
