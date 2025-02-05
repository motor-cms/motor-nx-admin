<template>
  <AdminCommonGrid
    :name="$t('motor-admin.ai_system_prompts.ai_system_prompts')"
    create-route="admin.motor-admin.ai-system-prompts.create"
    :create-label="$t('motor-admin.ai_system_prompts.create')"
    :rows="rows"
    :columns="columns"
    :filters="filters"
    :meta="meta"
    resource="aiSystemPrompts"
    @submit="refreshGridData"
    @submit-cell="handleCellEvent"
  />
</template>
<script setup lang="ts">
import grid from "@zrm/motor-nx-admin/grids/aiSystemPromptGrid";
const { t } = useI18n();
const route = useRoute();

const columns = ref([
  {
    name: t('motor-admin.clients.client'),
    prop: 'client.name',
    label: 'client.name',
    id: 'client_id',
    renderer: {type: 'linkLabelId', route: '/admin/motor-admin/clients/edit/{id}'},
    sortable: true,
  },
  {
    name: t('motor-admin.global.name'),
    prop: 'name',
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
          route: 'admin.motor-admin.ai-system-prompts.edit',
          name: t('global.edit')
        }
      },
      {
        name: 'DeleteButton', options: { name: t('global.delete') }
      }
    ]
  }
]);
const { clients, loadClients } = useFormData();
await loadClients();
const filters = ref([
  {
    name: 'SearchFilter',
    options: {}
  },
  {
    name: 'SelectFilter',
    options: {
      parameter: 'client_id',
      emptyOption:
        t('global.filter') + ": " + t('motor-admin.clients.client'),
      options: clients,
    }
  }
]);

const { rows, meta, refreshRecords, handleCellEvent } = grid();

const refreshGridData = async (params = {}) => {
  const appStore = useAppStore();
  appStore.updateInBackground(true);
  await refreshRecords(params);
  appStore.updateInBackground(false);
};
await refreshRecords(route.query);
</script>
