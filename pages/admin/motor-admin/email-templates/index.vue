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
    @submit="refreshGridData"
    @submit-cell="handleCellEvent"
  ></AdminCommonGrid>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import grid from '@zrm/motor-nx-admin/grids/emailTemplateGrid'
const route = useRoute();

// Load i18n module
const {t} = useI18n()

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
      {name: 'DeleteButton', options: {name: t('global.delete')}},
    ],
  },
])

// Define filters for grid
const filters = ref([{name: 'SearchFilter', options: {}}])

const loadComponents = <any>[]

// WE START THE OUTSOURCED CODE HERE
const {rows, meta, refreshRecords, handleCellEvent} = grid()


const refreshGridData = async (params = {}) => {
  const appStore = useAppStore();
  appStore.updateInBackground(true);
  await refreshRecords(params)
  appStore.updateInBackground(false);
}

await refreshRecords(route.query);


</script>
