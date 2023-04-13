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

<script lang="ts">
import AdminCommonGrid from '@zrm/motor-nx-core/components/admin/common/Grid.vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditButton from '@zrm/motor-nx-core/components/admin/cell/EditButton.vue'
import DeleteButton from '@zrm/motor-nx-core/components/admin/cell/DeleteButton.vue'
import grid from '@zrm/motor-nx-admin/grids/roleGrid'

export default defineComponent({
  name: 'admin-motor-admin.roles',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

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
