<template>
  <AdminCommonGrid
    :name="$t('motor-admin.permissions.permissions')"
    :create-route="createRoute"
    :has-back-button="true"
    :back-route="backRoute"
    :create-label="$t('motor-admin.permissions.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="permissions"
    :loadComponents="loadComponents"
    @submit="refreshGridData"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import grid from '@zrm/motor-nx-admin/grids/permissionGrid'

// Load i18n module
const {t} = useI18n();

const route = useRoute();

// WE START THE OUTSOURCED CODE HERE
const {rows, meta, refreshRecords, handleCellEvent} = grid()

// Define columns for grid
const columns = ref([
  {
    name: t('motor-admin.permissions.name'),
    prop: 'name',
    sortable: true,
  },
  {
    name: t('motor-admin.permissions.guard'),
    prop: 'guard_name',
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
          route: 'admin.motor-admin.permission-groups.' + route.params.permissiongroupid + '.permissions.edit',
          name: t('global.edit'),
        },
      },
      {name: 'DeleteButton', options: {name: t('motor-admin.global.delete')}},
    ],
  },
])

const loadComponents = <any>[]

// Define filters for grid
const filters = ref([{name: 'SearchFilter', options: {}}])

const createRoute = computed(() => 'admin.motor-admin.permission-groups.' + route.params.permissiongroupid + '.permissions.create');
const backRoute = 'admin.motor-admin.permission-groups';

const refreshGridData = async (params = {}) => {
  const appStore = useAppStore();
  appStore.updateInBackground(true);
  await refreshRecords(params)
  appStore.updateInBackground(false);
}

await refreshRecords(route.query);

</script>
