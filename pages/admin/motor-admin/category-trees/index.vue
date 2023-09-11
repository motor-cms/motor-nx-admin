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
    @submit="refreshGridData"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import grid from '@zrm/motor-nx-admin/grids/categoryTreeGrid'
import Button from '@zrm/motor-nx-core/components/admin/cell/Button.vue'

// Load i18n module
const {t} = useI18n()

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
      {name: 'DeleteButton', options: {name: t('motor-admin.global.delete')}},
    ],
  },
])

// Define filters for grid
const filters = ref([{name: 'SearchFilter', options: {}}])

const loadComponents = <any>[
  {
    name: 'Button',
    object: Button,
  },
]

// WE START THE OUTSOURCED CODE HERE
const {rows, meta, refreshRecords, handleCellEvent} = grid()

const refreshGridData = async () => {
  const appStore = useAppStore();
  appStore.updateInBackground(true);
  await refreshRecords()
  appStore.updateInBackground(false);
}

await refreshRecords();

</script>
