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
    :load-components="loadComponents"
    :grid-actions="gridActions"
    @submit="refreshGridData"
    @submit-cell="handleCellEvent"
    @grid-action-processed="refreshGridData"
  ></AdminCommonGrid>
  <FormsModal ref="formsModalRef" />
</template>

<script setup lang="ts">
import clientRepository from "@zrm/motor-nx-admin/api/client";
import emailTemplateRepository from "@zrm/motor-nx-admin/api/emailTemplate";
import {useI18n} from 'vue-i18n';
import grid from '@zrm/motor-nx-admin/grids/emailTemplateGrid';
import FormsModal from "@zrm/motor-nx-admin/components/modals/FormsModal.vue";
const route = useRoute();

// Load i18n module
const {t} = useI18n()

const { $toast } = useNuxtApp();
const formsModalRef = ref<InstanceType<typeof FormsModal> | null>(null);

const findUsages = async (props: {record: object}) => {
  try {
    if (!props?.record?.id) {
      console.error('No record ID provided');
      return;
    }
    
    const response = await emailTemplateRepository().getUsage(props.record.id);
    const usage = response.data?.value?.data || response.data?.data || [];
    
    // Sort by builder page name if available
    if (Array.isArray(usage)) {
      usage.sort((a, b) => {
        const nameA = a.builder_page?.name || '';
        const nameB = b.builder_page?.name || '';
        return nameA.localeCompare(nameB);
      });
    }
    
    if (formsModalRef.value) {
      formsModalRef.value.setData(usage);
      // Catch any modal errors silently (e.g., when user closes the modal)
      try {
        await formsModalRef.value.open();
      } catch (modalError) {
        // Modal was closed by user, ignore this error
        console.log('Modal closed');
      }
    }
  } catch (error: any) {
    console.error('Error loading usages:', error);
    // Only show error if it's a real error (not undefined)
    if (error && (error.message || error.response)) {
      $toast.error('Fehler beim Laden der Verwendungen: ' + (error?.response?.data?.message || error?.message || 'Unbekannter Fehler'));
    }
  }
};

// Define columns for grid
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
    name: t('motor-admin.languages.language'),
    prop: 'language.english_name',
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
        name: 'CustomActionButton',
        options: {
          name: 'FindUsages',
          icon: 'file-alt',
          onClick: findUsages
        }
      },
      {
        name: 'EditButton',
        options: {
          route: 'admin.motor-admin.email-templates.edit',
          name: t('global.edit'),
        },
      },
      {name: 'DeleteButton', options: {name: 'global.do_delete'}},
    ],
  },
])

// Define filters for grid
const filters = ref([
  {name: 'SearchFilter', options: {}},
  {
    name: 'SelectFilter',
    options: {
      parameter: 'client_id',
      emptyOption:
        t('global.filter') + ': ' + t('motor-admin.clients.client'),
      options: <any>[],
    },
  }
]);

const {duplicateEmailTemplates: duplicate} = useAdminGridActions();

const gridActions = computed(() => {
  return [
    duplicate
  ]
})


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
clientRepository().index({}).then((response) => {
  for (const client of response.data.value.data) {
    filters.value[1].options.options.push({
      value: client.id,
      name: client.name,
    });
  }
});

</script>
