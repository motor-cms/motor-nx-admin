<template>
  <AdminCommonGrid
    :name="$t('motor-admin.email_templates.email_templates')"
    create-route="admin.motor-admin.email-templates.create"
    :create-label="$t('motor-admin.email_templates.create')"
    :rows="rows"
    :columns="columns"
    :meta="meta"
    :filters="filters"
    resource="emailTemplates"
    :loadComponents="loadComponents"
    @submit="refreshRecords"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script lang="ts">
import {useAppStore} from "~/packages/motor-nx-core/store/app";
import AdminCommonGrid from '@zrm/motor-nx-core/components/admin/common/Grid.vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditButton from '@zrm/motor-nx-core/components/admin/cell/EditButton.vue'
import DeleteButton from '@zrm/motor-nx-core/components/admin/cell/DeleteButton.vue'
import grid from '@zrm/motor-nx-admin/grids/emailTemplateGrid'

export default defineComponent({
  name: 'admin-motor-admin.email-templates',
  components: {
    AdminCommonGrid,
  },
  setup() {
    // Load i18n module
    const { t } = useI18n()

    // Define columns for grid
    const columns = ref([
      {
        name: t('motor-admin.clients.client'),
        prop: 'client.name',
      },
      {
        name: t('motor-admin.languages.language'),
        prop: 'language.english_name',
      },
      {
        name: t('motor-admin.global.name'),
        prop: 'name',
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
              route: 'admin.motor-admin.email-templates.edit',
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
