<template>
  <AdminCommonGrid
    :name="$t('motor-admin.domains.domains')"
    create-route="admin.motor-admin.domains.create"
    :create-label="$t('motor-admin.domains.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="domains"
    :loadComponents="loadComponents"
    @submit="refreshGridData"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import grid from '@zrm/motor-nx-admin/grids/domainsGrid'
const route = useRoute();

// Load i18n module
const { t } = useI18n()

// Define columns for grid
const columns = ref([
  {
    name: t('motor-admin.domains.client'),
    prop: 'client.name',
  },
  {
    name: t('motor-admin.domains.name'),
    prop: 'name',
  },
  {
    name: t('motor-admin.domains.host'),
    prop: 'host',
  },
  {
    name: t('motor-admin.domains.is_active'),
    prop: 'is_active',
    renderer: {type: 'boolean'}
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
          route: 'admin.motor-admin.domains.edit',
          name: t('global.edit'),
        },
      },
      { name: 'DeleteButton', options: { name: t('global.delete') } },
    ],
  },
])

// Define filters for grid
const filters = ref([{ name: 'SearchFilter', options: {} }])

const loadComponents = <any>[]

// WE START THE OUTSOURCED CODE HERE
const { rows, meta, refreshRecords, handleCellEvent } = grid()


const refreshGridData = async (params = {}) => {
  const appStore = useAppStore();
  appStore.updateInBackground(true);
  await refreshRecords(params)
  appStore.updateInBackground(false);
}

await refreshRecords(route.query);

</script>
