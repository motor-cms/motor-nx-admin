<template>
  <AdminCommonForm
    back-route="admin.motor-admin.domains"
    :title="title"
    @submit="onSubmit"
  >
    <h6 class="text-uppercase text-body text-xs font-weight-bolder">
      {{ $t('motor-admin.global.basic_information')}}
    </h6>
    <div class="row">
      <div class="col-12">
        <FormsSelectField
            name="client_id"
            id="client_id"
            :label="$t('motor-admin.clients.client')"
            :options="clients"
            v-model="model.client_id"
        ></FormsSelectField>
        <FormsInputField
          type="text"
          name="name"
          id="name"
          :label="$t('motor-admin.domains.name')"
          v-model="model.name"
        ></FormsInputField>
      </div>
      <div class="col-12">
        <FormsSelectField
          name="protocol"
          id="protocol"
          :is_nullable="false"
          :searchable="false"
          :label="$t('motor-admin.domains.protocol')"
          v-model="model.protocol"
          :options="protocolOptions"
        ></FormsSelectField>
      </div>
      <div class="col-12">
        <FormsInputField
          type="text"
          name="host"
          id="host"
          :label="$t('motor-admin.domains.host')"
          v-model="model.host"
        ></FormsInputField>
      </div>
      <div class="col-12">
        <FormsInputField
          type="text"
          name="port"
          id="port"
          :label="$t('motor-admin.domains.port')"
          v-model="model.port"
        ></FormsInputField>
      </div>
      <div class="col-12">
        <FormsInputField
            type="text"
            name="path"
            id="path"
            :label="$t('motor-admin.domains.path')"
            v-model="model.path"
        ></FormsInputField>
      </div>
      <div class="col-12">
        <FormsCheckboxField
          name="is_active"
          id="is_active"
          :label="$t('motor-admin.domains.is_active')"
          v-model="model.is_active"
        ></FormsCheckboxField>
      </div>
    </div>
  </AdminCommonForm>
</template>
<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import form from '@zrm/motor-nx-admin/forms/domainsForm'
import {storeToRefs} from "pinia";
// Load i18n module
const {t} = useI18n()
const { userHasClient } = storeToRefs(useUserStore());

// Load form
const {model, onSubmit, clients, getData, loadClients} = form()

const {user} = storeToRefs(useUserStore());

watchEffect(() => {
  if (user.value && user.value.client_id) {
    model.value.client_id = user.value.client_id;
  }
})

const protocolOptions = ref([
  {value: 'http', label: 'http'},
  {value: 'https', label: 'https'},
]);

// Set default action title
const title = ref(t('motor-admin.domains.create'))

await getData();
await loadClients();
</script>
