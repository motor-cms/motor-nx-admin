<template>
  <AdminCommonGrid
    :name="$t('motor-admin.languages.languages')"
    create-route="admin.motor-admin.languages.create"
    :create-label="$t('motor-admin.languages.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="languages"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import grid from '@zrm/motor-nx-admin/grids/languageGrid'

// Load i18n module
const { t } = useI18n()

// Define columns for grid
const columns = ref([
  {
    name: t('motor-admin.languages.native_name'),
    prop: 'native_name',
  },
  {
    name: t('motor-admin.languages.english_name'),
    prop: 'english_name',
  },
  {
    name: t('motor-admin.languages.iso_639_1'),
    prop: 'iso_639_1',
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
          route: 'admin.motor-admin.languages.edit',
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
onMounted(async () => {
  await refreshRecords();
})
</script>
