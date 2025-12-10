<template>
  <AdminCommonForm
    back-route="admin.motor-admin.domains"
    :title="title"
    @submit="onSubmit"
  >    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
    {{ $t('motor-admin.global.basic_information')}}
  </h6>
    <div class="row">
      <div class="col-12">
        <FormsSelectField
            id="client_id"
            v-model="model.client_id"
            name="client_id"
            :label="$t('motor-admin.clients.client')"
            :options="clients"
        ></FormsSelectField>
        <FormsInputField
            id="name"
            v-model="model.name"
            type="text"
            name="name"
            :label="$t('motor-admin.domains.name')"
        ></FormsInputField>
      </div>
      <div class="col-12">
        <FormsSelectField
            id="protocol"
            v-model="model.protocol"
            name="protocol"
            :is_nullable="false"
            :searchable="false"
            :label="$t('motor-admin.domains.protocol')"
            :options="protocolOptions"
        ></FormsSelectField>
      </div>
      <div class="col-12">
        <FormsInputField
            id="host"
            v-model="model.host"
            type="text"
            name="host"
            :label="$t('motor-admin.domains.host')"
        ></FormsInputField>
      </div>
      <div class="col-12">
        <FormsInputField
            id="port"
            v-model="model.port"
            type="text"
            name="port"
            :label="$t('motor-admin.domains.port')"
        ></FormsInputField>
      </div>
      <div class="col-12">
        <FormsInputField
            id="path"
            v-model="model.path"
            type="text"
            name="path"
            :label="$t('motor-admin.domains.path')"
        ></FormsInputField>
      </div>
      <div class="col-12">
        <FormsCheckboxField
            id="is_active"
            v-model="model.is_active"
            name="is_active"
            :label="$t('motor-admin.domains.is_active')"
        ></FormsCheckboxField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import form from '@zrm/motor-nx-admin/forms/domainsForm'
import {storeToRefs} from "pinia";
// Load i18n module
const { t } = useI18n()
const { userHasClient } = storeToRefs(useUserStore());

// Load form
const { model, onSubmit, clients, getData, loadClients} = form()

const {user} = storeToRefs(useUserStore());

const props = defineProps({
  edit: Boolean,
});
const title = props.edit? t('motor-admin.domains.edit') : t('motor-admin.domains.create');
// watchEffect(() => {
//   if (user.value && user.value.client_id) {
//     model.value.client_id = user.value.client_id;
//   }
// })

const protocolOptions = ref([
  {value: 'http', label: 'http'},
  {value: 'https', label: 'https'},
]);

if (props.edit) {
  await getData();
}
await loadClients();
</script>
