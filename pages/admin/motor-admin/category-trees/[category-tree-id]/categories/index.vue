<template>
  <AdminCommonGrid
    :name="$t('motor-admin.categories.categories')"
    :create-route="createRoute"
    :create-label="$t('motor-admin.categories.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="categories"
    :loadComponents="loadComponents"
    @submit="refreshGridData"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import grid from '@zrm/motor-nx-admin/grids/categoryGrid'
import CellTree from '@zrm/motor-nx-core/components/admin/cell/Tree.vue'

// Load i18n module
const {t} = useI18n();

const route = useRoute();

// WE START THE OUTSOURCED CODE HERE
const {rows, meta, refreshRecords, handleCellEvent} = grid()

// Define columns for grid
const columns = ref([
  {
    name: t('motor-admin.categories.name'),
    prop: 'name',
    components: [{name: 'CellTree'}],
    sortable: true,
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
          route: 'admin.motor-admin.category-trees.' + route.params.categorytreeid + '.categories.edit',
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
    name: 'CellTree',
    object: CellTree,
  },
]

const createRoute = computed(() => 'admin.motor-admin.category-trees.' + route.params.categorytreeid + '.categories.create');

const refreshGridData = async (params = {}) => {
  const appStore = useAppStore();
  appStore.updateInBackground(true);
  await refreshRecords(params)
  appStore.updateInBackground(false);
}

await refreshRecords(route.query);

</script>
