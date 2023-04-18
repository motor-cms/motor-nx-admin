<template>
  <AdminCommonGrid
    :name="$t('motor-admin.roles.roles')"
    create-route="admin.motor-admin.roles.create"
    :create-label="$t('motor-admin.roles.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="roles"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import grid from '@zrm/motor-nx-admin/grids/roleGrid'

// Load i18n module
const {t} = useI18n()

// Define columns for grid
const columns = ref([
  {
    name: t('motor-admin.roles.name'),
    prop: 'name',
  },
  {
    name: t('motor-admin.roles.guard_name'),
    prop: 'guard_name',
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
          route: 'admin.motor-admin.roles.edit',
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
