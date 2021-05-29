<template>
  <AdminCommonGrid
    :name="$t('motor-backend.users.users')"
    create-route="admin.motor-backend.users.create"
    :create-label="$t('motor-backend.users.new')"
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
import AdminCommonGrid from 'motor-core/components/admin/common/Grid.vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditButton from 'motor-core/components/admin/cell/EditButton.vue'
import DeleteButton from 'motor-core/components/admin/cell/DeleteButton.vue'
import grid from 'motor-backend/grids/userGrid'

export default defineComponent({
  name: 'admin-motor-backend.users',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('motor-backend.users.name'),
        prop: 'name',
      },
      {
        name: t('motor-backend.clients.client'),
        prop: 'client.name',
      },
      {
        name: t('motor-backend.roles.roles'),
        prop: 'roles',
        renderer: { type: 'list', property: 'name' },
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
              route: 'admin.motor-backend.users.edit',
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
