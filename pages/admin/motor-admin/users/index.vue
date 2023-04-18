<template>
  <AdminCommonGrid
    :name="$t('motor-admin.users.users')"
    :create-route="'admin.motor-admin.users.create'"
    :create-label="$t('motor-admin.users.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="users"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script lang="ts">
import {useAppStore} from "~/packages/motor-nx-core/store/app";
import AdminCommonGrid from '@zrm/motor-nx-core/components/admin/common/Grid.vue'
import {defineComponent, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import grid from '@zrm/motor-nx-admin/grids/userGrid'
import useRouteParser from "@zrm/motor-nx-core/composables/route/parse";

export default defineComponent({
  name: 'admin-motor-admin.users',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const {t} = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('motor-admin.users.name'),
        prop: 'name',
      },
      {
        name: t('motor-admin.clients.client'),
        prop: 'client.name',
      },
      {
        name: t('motor-admin.roles.roles'),
        prop: 'roles',
        renderer: {type: 'list', property: 'name'},
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
              route: 'admin.motor-admin.users.edit',
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

    const routeParser = useRouteParser();

    onMounted(async () => {
      await refreshRecords();
    })

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
