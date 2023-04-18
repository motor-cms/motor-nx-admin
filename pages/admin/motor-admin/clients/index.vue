<template>
  <AdminCommonGrid
    :name="$t('motor-admin.clients.clients')"
    create-route="admin.motor-admin.clients.create"
    :create-label="$t('motor-admin.clients.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="clients"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import grid from '@zrm/motor-nx-admin/grids/clientGrid'

// Load i18n module
const {t} = useI18n()

// Define columns for grid
const columns = ref([
  {
    name: t('motor-admin.clients.name'),
    prop: 'name',
  },
  {
    name: t('motor-admin.clients.contact'),
    prop: 'contact_name',
  },
  {
    name: t('motor-admin.clients.slug'),
    prop: 'slug',
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
          route: 'admin.motor-admin.clients.edit',
          name: t('global.edit'),
        },
      },
      {name: 'DeleteButton', options: {name: t('global.delete')}},
    ],
  },
])

// Define filters for grid
const filters = ref([{name: 'SearchFilter', options: {}}])

const loadComponents = <any>[]

// WE START THE OUTSOURCED CODE HERE
const {rows, meta, refreshRecords, handleCellEvent} = grid()

onMounted(async () => {
  await refreshRecords();
})

</script>
